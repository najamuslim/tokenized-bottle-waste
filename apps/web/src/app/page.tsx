"use client";

import React from "react";
import Top_Bar from "./pages/topbar";
import Content_top from "./pages/topbarContent";
import Content_Area from "./pages/contents";
import Footers from "./pages/footer";
import { WalletProvider } from "./context/WalletContext";

const dApp = () => {
  return (
    <WalletProvider>
      <>
        <Top_Bar />
        <Content_top />
        <Content_Area />
        <Footers />
      </>
    </WalletProvider>
  );
};

export default dApp;
