"use client";

import React, { ReactNode } from "react";
import { WalletProvider } from './context/WalletContext';
import Top_Bar from "./pages/topbar";
import Footers from "./pages/footer";

interface _Props {
  children: ReactNode;
}

const pageLayout: React.FC<_Props> = ({ children }) => {
  return (
      <WalletProvider>
      <div>
          <Top_Bar />
          <main>{children}</main>
          <Footers />
      </div>
      </WalletProvider>
  );
};

export default pageLayout;

