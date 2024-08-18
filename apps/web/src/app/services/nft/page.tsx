"use client";

import React from "react";
import { WalletProvider } from '../../context/WalletContext';
import NftBadge from "../../pages/subPage/NFT_page";
import Top_Bar from "../../pages/topbar";


const nft_page = () => {
  return (
      <WalletProvider>
      <div>
          <Top_Bar />
          <NftBadge />
      </div>
      </WalletProvider>
  );
};

export default nft_page;