"use client";

import React from "react";
import { WalletProvider } from "./context/WalletContext";
import Top_Bar from "./pages/topbar";
import Footers from "./pages/footer";
import Content_top from "./pages/topbarContent";
import Content_Area from "./pages/contents";

const dAPP = () => {
  return (
    <WalletProvider>
      <Top_Bar />
      <Content_top />
      <Content_Area />
      <Footers />
    </WalletProvider>
  );
};

export default dAPP;
