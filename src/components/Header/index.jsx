import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import WalletConnection from "./WalletConnection";
import { Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <Flex
      gap="4"
      as="header"
      width="100%"
      align="center"
      justify="between"
      className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg h-16 sticky top-0 z-50"
    >
      {/* Logo Section */}
      <Flex align="center" gap="2">
        <Box className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
          <Text className="text-indigo-600 font-extrabold text-lg" as="span">
            R
          </Text>
        </Box>
        <Text
          className="text-white font-bold text-2xl hidden md:block"
          as="span"
          role="img"
          aria-label="logo"
        >
          RareVerse
        </Text>
      </Flex>

      {/* Navigation Links - Desktop */}
      <Flex className="hidden md:flex space-x-6 gap-5" align="center">
        <Text className="text-white font-medium hover:text-purple-200 cursor-pointer">
          Explore
        </Text>
        <Text className="text-white font-medium hover:text-purple-200 cursor-pointer">
          Collections
        </Text>
        <Text className="text-white font-medium hover:text-purple-200 cursor-pointer">
          Create
        </Text>
      </Flex>

      {/* Search */}
      <Flex className="bg-white/10 rounded-full px-4 py-2 items-center max-w-xs flex-grow mx-4 hidden md:flex">
        <Search className="text-white/70 w-4 h-4 mr-2" />
        <input
          className="bg-transparent text-white placeholder-white/70 outline-none w-full"
          placeholder="Search collections..."
        />
      </Flex>

      {/* Wallet and Menu */}
      <Flex gap="3" align="center">
        <WalletConnection />
        <Menu className="text-white md:hidden cursor-pointer" />
      </Flex>
    </Flex>
  );
};

export default Header;
