import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/appContext";
import NFTCard from "./components/NFTCard";
import useMintToken from "./hooks/useMintToken";
import { useState } from "react";

function App() {
  const { nextTokenId, tokenMetaData, mintPrice } = useAppContext();
  const tokenMetaDataArray = Array.from(tokenMetaData.values());
  const mintToken = useMintToken();
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative">
        {/* Hero Section with Gradient Overlay */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
              RARE VERSE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center">
              Discover, collect, and trade exclusive digital collectibles
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                Explore Collection
              </button>
              <button className="px-8 py-3 rounded-full bg-transparent border border-white hover:bg-white hover:text-black transition-all duration-300">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-900 border-t border-b border-gray-800">
          <div className="container mx-auto py-4 px-4 flex flex-wrap justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-purple-400">Floor:</span>
              <span className="font-bold">0.001 ETH</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-purple-400">Volume:</span>
              <span className="font-bold">10.456 ETH</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-purple-400">Items:</span>
              <span className="font-bold">{tokenMetaDataArray.length}</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-purple-400">Owners:</span>
              <span className="font-bold">{nextTokenId || 0}</span>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-12">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-900 rounded-lg p-1 shadow-xl">
              {["marketplace", "mint", "owned"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  } transition-all duration-200`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Blocks - Only show on marketplace tab */}
          {activeTab === "marketplace" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-purple-500 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Mint NFT</h3>
                <p className="text-gray-400">
                  Create and mint your own unique digital collectibles with ease
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Manage NFTs</h3>
                <p className="text-gray-400">
                  View and manage your collection with advanced tools and
                  analytics
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-pink-500 transition-all duration-300">
                <div className="w-12 h-12 bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Marketplace</h3>
                <p className="text-gray-400">
                  Buy and sell NFTs in our secure and user-friendly marketplace
                </p>
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-between items-center mb-8 bg-gray-900 p-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <span>Sort by:</span>
              <select className="bg-gray-800 text-white border-none rounded-lg p-2">
                <option>Recently Added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>Filter</span>
              </button>
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button className="bg-gray-800 hover:bg-gray-700 p-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 p-2">
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

          {/* NFT Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tokenMetaDataArray.map((token, i) => (
              <NFTCard
                key={token.name.split(" ").join("")}
                metadata={token}
                mintPrice={mintPrice}
                tokenId={i}
                nextTokenId={nextTokenId}
                mintNFT={mintToken}
              />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
