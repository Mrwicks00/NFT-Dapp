import { Contract, Interface } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { getReadOnlyProvider } from "../utils";
import NFT_ABI from "../ABI/nft.json";
import MULTCALL_ABI from "../ABI/multicall2.json";
import { useAccount, useConfig, WagmiConfig } from "wagmi";
import { getEthersSigner } from "../config/wallet-connection/adapter";

const appContext = createContext();

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export const AppProvider = ({ children }) => {
    const { address: userAddress, isConnected } = useAccount();
    const wagmiConfig = useConfig();
    const [nextTokenId, setNextTokenId] = useState(null);
    const [maxSupply, setMaxSupply] = useState(null);
    const [baseTokenURI, setBaseTokenURI] = useState("");
    const [tokenMetaData, setTokenMetaData] = useState(new Map());
    const [mintPrice, setMintPrice] = useState(null);
    const [userNFTs, setUserNFTs] = useState([]);

    useEffect(() => {
        const fetchContractData = async () => {
            try {
                const contractInterface = new Interface(NFT_ABI);
                const multicall = new Contract(
                    import.meta.env.VITE_MULTICALL_CONTRACT_ADDRESS,
                    MULTCALL_ABI,
                    getReadOnlyProvider()
                );

                const calls = [
                    {
                        target: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                        callData: contractInterface.encodeFunctionData(
                            "nextTokenId",
                            []
                        ),
                    },
                    {
                        target: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                        callData: contractInterface.encodeFunctionData(
                            "baseTokenURI",
                            []
                        ),
                    },
                    {
                        target: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                        callData: contractInterface.encodeFunctionData(
                            "maxSupply",
                            []
                        ),
                    },
                    {
                        target: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                        callData: contractInterface.encodeFunctionData(
                            "mintPrice",
                            []
                        ),
                    },
                ];
                console.log("calls", calls);

                const results = await multicall.aggregate.staticCall(calls);

                const resultsArray = JSON.parse(JSON.stringify(results))[1];

                const nextTokenId = contractInterface.decodeFunctionResult(
                    "nextTokenId",
                    resultsArray[0]
                );
                const baseTokenURI = contractInterface.decodeFunctionResult(
                    "baseTokenURI",
                    resultsArray[1]
                );
                const maxSupply = contractInterface.decodeFunctionResult(
                    "maxSupply",
                    resultsArray[2]
                );
                const mintPrice = contractInterface.decodeFunctionResult(
                    "mintPrice",
                    resultsArray[3]
                );

                setNextTokenId(nextTokenId[0]);
                setBaseTokenURI(baseTokenURI[0]);
                setMaxSupply(maxSupply[0]);
                setMintPrice(mintPrice[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchContractData();
    }, []);

    useEffect(() => {
        if (!maxSupply || !baseTokenURI) return;
        // const tokenIds = Array.from({ length: Number(maxSupply) }, (_, i) => i);

        const tokenIds = [];
        for (let i = 0; i < maxSupply; i++) {
            tokenIds.push(i);
        }

        const promises = tokenIds.map((id) => {
            return fetch(`${baseTokenURI}${id}.json`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
        });

        Promise.all(promises)
            .then((responses) => {
                const tokenMetaData = new Map();
                responses.forEach((response, index) => {
                    tokenMetaData.set(index, response);
                });
                setTokenMetaData(tokenMetaData);
            })
            .catch((error) => console.error("error: ", error));
    }, [baseTokenURI, maxSupply]);

    //UseEffect to handle Minted event

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            getReadOnlyProvider()
        );

        const handleMintedNFT = (reciever, nftTokenId) => {
            console.log(`NFT ${nftTokenId} has been minted to ${reciever}`);

            contract
                .nextTokenId()
                .then((id) => setNextTokenId(id))
                .catch((error) => {
                    console.log(error);
                });
        };

        contract.on("Minted", handleMintedNFT);

        return () => {
            contract.off("Minted", handleMintedNFT);
        };
    }, []);

    useEffect(() => {
        if (!userAddress || !isConnected || nextTokenId === null) return;
        fetchUserNFTs();
    }, [userAddress, isConnected, nextTokenId]);

    const fetchUserNFTs = async () => {
        try {
            const multicall = new Contract(
                import.meta.env.VITE_MULTICALL_CONTRACT_ADDRESS,
                MULTCALL_ABI,
                getReadOnlyProvider()
            );

            const contractInterface = new Interface(NFT_ABI);

            const tokenIds = Array.from(
                { length: Number(nextTokenId) },
                (_, i) => i
            );

            const calls = tokenIds.map((id) => ({
                target: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                callData: contractInterface.encodeFunctionData("ownerOf", [id]),
            }));

            const results = await multicall.aggregate.staticCall(calls);

            const encodedResults = JSON.parse(JSON.stringify(results))[1];

            const decodedResult = encodedResults.map(
                (res) =>
                    contractInterface.decodeFunctionResult("ownerOf", res)[0]
            );

            const isOwnedArray = decodedResult
                .map((addr, i) =>
                    addr.toLowerCase() === userAddress.toLowerCase() ? i : null
                )
                .filter((x) => x !== null);

            setUserNFTs(isOwnedArray);
        } catch (error) {
            console.error("Error fetching user NFTs: ", error);
        }
    };

    const transferNFT = async (tokenId, recipient) => {
        try {
            const signer = await getEthersSigner(wagmiConfig); // Get connected wallet signer
            if (!signer) throw new Error("Wallet not connected");

            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );

            const tx = await contract.transferFrom(
                await signer.getAddress(),
                recipient,
                tokenId
            );
            await tx.wait(); // Wait for transaction confirmation

            console.log(`NFT ${tokenId} transferred to ${recipient}`);
            setUserNFTs((prev) => prev.filter((id) => id !== tokenId)); // Remove transferred NFT from list
        } catch (error) {
            console.error("Transfer failed:", error);
        }
    };

    return (
        <appContext.Provider
            value={{
                nextTokenId,
                maxSupply,
                baseTokenURI,
                tokenMetaData,
                mintPrice,
                userNFTs,
                transferNFT,
            }}
        >
            {children}
        </appContext.Provider>
    );
};
