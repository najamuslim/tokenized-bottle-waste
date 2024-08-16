"use client";

import React from "react";
import { WalletProvider } from '../../context/WalletContext';
import Leaderboard from "@/app/pages/subPage/Leaderboard_page";
import Top_Bar from "../../pages/topbar";
import Footers from "../../pages/footer";


const leaderboard_page = () => {
  return (
      <WalletProvider>
      <div>
          <Top_Bar />
          <Leaderboard />
          <Footers />
      </div>
      </WalletProvider>
  );
};

export default leaderboard_page;