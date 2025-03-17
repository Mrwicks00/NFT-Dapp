import { Icon } from "@iconify/react/dist/iconify.js";
import { formatEther } from "ethers";
import React, { useState } from "react";
import { truncateString } from "../../utils";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOwned = Number(nextTokenId) > tokenId;
  const canMint = Number(nextTokenId) === tokenId;

  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 border border-gray-800 hover:border-purple-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Effect */}
      <div className="relative overflow-hidden">
        <img
          src={metadata.image}
          alt={`${metadata.name} image`}
          className={`w-full h-64 object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Overlay with quick actions */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-medium">#{tokenId}</span>
            </div>
            <div className="flex space-x-2">
              <button className="w-8 h-8 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-purple-600 transition-colors duration-200">
                <Icon icon="ri:heart-line" className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-purple-600 transition-colors duration-200">
                <Icon icon="ri:share-line" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{metadata.name}</h3>
          {isOwned && (
            <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-md font-medium">
              Owned
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm">
          {truncateString(metadata.description, 80)}
        </p>

        <div className="pt-2 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Icon
                icon="ri:file-list-3-line"
                className="w-4 h-4 text-purple-400"
              />
              <span className="text-xs text-gray-400">
                {metadata.attributes.length} Properties
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="ri:eth-line" className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">
                {formatEther(mintPrice)} ETH
              </span>
            </div>
          </div>
        </div>

        <button
          disabled={!canMint}
          onClick={mintNFT}
          className={`w-full py-2 rounded-lg font-bold transition-all duration-300 mt-2 flex items-center justify-center space-x-2 ${
            canMint
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              : isOwned
              ? "bg-green-900/20 text-green-500 cursor-not-allowed"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isOwned ? (
            <>
              <Icon icon="ri:check-line" className="w-5 h-5" />
              <span>Owned</span>
            </>
          ) : canMint ? (
            <>
              <Icon icon="ri:shopping-cart-line" className="w-5 h-5" />
              <span>Mint NFT</span>
            </>
          ) : (
            <>
              <Icon icon="ri:lock-line" className="w-5 h-5" />
              <span>Not Available</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
