"use client";

import React from "react";
import { WalletProvider } from '../../context/WalletContext';
import Challenges from "@/app/pages/subPage/Challenges_page";
import Top_Bar from "../../pages/topbar";


const ChallengePage = () => {
  return (
      <WalletProvider>
      <div>
          <Top_Bar />
          <Challenges />
      </div>
      </WalletProvider>
  );
};

export default ChallengePage;