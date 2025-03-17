import { useAppContext } from "../../contexts/appContext";
import { useAccount } from "wagmi";
import NFTCard from "../NFTCard/index";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Account = () => {
  const { userNFTs, tokenMetaData, mintPrice, nextTokenId, transferNFT } =
    useAppContext();
  const { address: userAddress, isConnected } = useAccount();
  const [recipientAddresses, setRecipientAddresses] = useState({});
  const [activeTab, setActiveTab] = useState("collected");
  const [showTransferModal, setShowTransferModal] = useState(null);

  const handleInputChange = (tokenId, value) => {
    setRecipientAddresses((prev) => ({ ...prev, [tokenId]: value }));
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    // Toast notification would be added here in a real app
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="relative">
        {/* Banner Image */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"></div>

        {/* Profile Info */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 sm:-mt-24 mb-8 flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Image */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-1 shadow-lg">
              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                <Icon
                  icon="ri:user-3-fill"
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400"
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-3 mb-1">
                    <h1 className="text-xl sm:text-3xl font-bold">Collector</h1>
                    <span className="bg-purple-600/30 text-purple-400 px-3 py-1 text-xs rounded-full font-medium">
                      Pro Member
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-gray-800 rounded-lg px-3 py-1 flex items-center space-x-2">
                      <span className="text-gray-300">
                        {truncateAddress(userAddress)}
                      </span>
                      <button
                        onClick={copyAddress}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <Icon icon="ri:file-copy-line" className="w-4 h-4" />
                      </button>
                    </span>
                    <span className="bg-green-900/30 text-green-400 px-3 py-1 text-xs rounded-lg font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Connected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-gray-400">Collection Value</span>
                      <p className="font-bold text-lg">3.45 ETH</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Items</span>
                      <p className="font-bold text-lg">{userNFTs.length}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Joined</span>
                      <p className="font-bold text-lg">Feb 2025</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-900 p-6 rounded-xl text-center">
                  <Icon
                    icon="ri:wallet-3-line"
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                  />
                  <h2 className="text-xl font-bold mb-2">
                    Connect Your Wallet
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Connect your wallet to view your profile and NFT collection
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isConnected && (
        <div className="container mx-auto px-4 pb-16">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-800 mb-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("collected")}
                className={`pb-4 px-2 font-medium relative ${
                  activeTab === "collected"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Collected
                <span className="ml-2 bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                  {userNFTs.length}
                </span>
                {activeTab === "collected" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`pb-4 px-2 font-medium relative ${
                  activeTab === "activity"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Activity
                {activeTab === "activity" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("favorited")}
                className={`pb-4 px-2 font-medium relative ${
                  activeTab === "favorited"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Favorited
                {activeTab === "favorited" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></span>
                )}
              </button>
            </div>
          </div>

          {/* Collection Tools */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="bg-gray-900 rounded-lg p-2">
                <Icon icon="ri:search-line" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your collection"
                className="bg-gray-900 rounded-lg px-4 py-2 border border-gray-800 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select className="bg-gray-900 text-white border border-gray-800 rounded-lg px-4 py-2">
                <option>Recently Added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="flex border border-gray-800 rounded-lg overflow-hidden">
                <button className="bg-purple-600 hover:bg-purple-700 p-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="bg-gray-900 hover:bg-gray-800 p-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          {activeTab === "collected" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userNFTs.length > 0 ? (
                userNFTs.map((tokenId) => {
                  const metadata = tokenMetaData.get(tokenId);
                  if (!metadata) return null;

                  return (
                    <div key={tokenId} className="relative group">
                      <NFTCard
                        metadata={metadata}
                        mintPrice={mintPrice}
                        tokenId={tokenId}
                        nextTokenId={nextTokenId}
                        mintNFT={() => {}}
                      />

                      {/* Action Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setShowTransferModal(tokenId)}
                          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium flex items-center justify-center space-x-2 transition-all duration-300"
                        >
                          <Icon icon="ri:send-plane-fill" className="w-4 h-4" />
                          <span>Transfer NFT</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full bg-gray-900 rounded-xl p-10 text-center">
                  <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Icon
                      icon="ri:image-line"
                      className="w-10 h-10 text-gray-600"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No NFTs Found</h3>
                  <p className="text-gray-400 mb-6">
                    You don't have any NFTs in your collection yet.
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Browse Marketplace
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Icon
                  icon="ri:history-line"
                  className="w-6 h-6 text-purple-400"
                />
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>

              {userNFTs.length > 0 ? (
                <div className="space-y-4">
                  {userNFTs.map((tokenId) => {
                    const metadata = tokenMetaData.get(tokenId);
                    if (!metadata) return null;

                    return (
                      <div
                        key={`activity-${tokenId}`}
                        className="flex items-center space-x-4 p-4 border border-gray-800 rounded-lg"
                      >
                        <img
                          src={metadata.image}
                          alt={metadata.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{metadata.name}</span>
                            <span className="text-xs text-gray-400">
                              #{tokenId}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Minted on Mar 15, 2025
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Icon
                              icon="ri:eth-line"
                              className="w-4 h-4 text-blue-400"
                            />
                            <span className="font-medium">0.25 ETH</span>
                          </div>
                          <span className="text-xs text-green-400">Minted</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Icon
                      icon="ri:history-line"
                      className="w-10 h-10 text-gray-600"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Activity Found</h3>
                  <p className="text-gray-400 mb-6">
                    You don't have any recent activity to display.
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Browse Marketplace
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "favorited" && (
            <div className="bg-gray-900 rounded-xl p-10 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Icon
                  icon="ri:heart-line"
                  className="w-10 h-10 text-gray-600"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">No Favorites Yet</h3>
              <p className="text-gray-400 mb-6">
                You haven't favorited any NFTs yet.
              </p>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Explore Featured Collections
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full border border-gray-800 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Transfer NFT</h3>
              <button
                onClick={() => setShowTransferModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <Icon icon="ri:close-line" className="w-6 h-6" />
              </button>
            </div>

            {(() => {
              const metadata = tokenMetaData.get(showTransferModal);
              if (!metadata) return null;

              return (
                <>
                  <div className="flex space-x-4 mb-6">
                    <img
                      src={metadata.image}
                      alt={metadata.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold">{metadata.name}</h4>
                        <span className="text-xs text-gray-400">
                          #{showTransferModal}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {metadata.description?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-1">
                        <Icon
                          icon="ri:eth-line"
                          className="w-4 h-4 text-blue-400"
                        />
                        <span className="font-medium">0.25 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={recipientAddresses[showTransferModal] || ""}
                      onChange={(e) =>
                        handleInputChange(showTransferModal, e.target.value)
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Gas Fee (estimated)</span>
                      <span className="font-medium">0.002 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Network</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span>Ethereum Mainnet</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowTransferModal(null)}
                      className="flex-1 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const recipient = recipientAddresses[showTransferModal];
                        if (recipient) {
                          transferNFT(showTransferModal, recipient);
                          setShowTransferModal(null);
                        }
                      }}
                      disabled={!recipientAddresses[showTransferModal]}
                      className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                        !recipientAddresses[showTransferModal]
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:from-purple-700 hover:to-blue-700"
                      }`}
                    >
                      <Icon icon="ri:send-plane-fill" className="w-4 h-4" />
                      <span>Confirm Transfer</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
