"use client";

import React, { useEffect } from "react";
import { WalletProvider } from '../../context/WalletContext';
import Store from "@/app/pages/subPage/Store_Page";
import Top_Bar from "../../pages/topbar";
import { ethers } from "ethers";


const store_page = () => {
    
  return (
      <WalletProvider>
      <div>
          <Top_Bar />
          <Store />
      </div>
      </WalletProvider>
  );
};

export default store_page;