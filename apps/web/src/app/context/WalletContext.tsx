import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  defaultAccount: string;
  userBalance: string;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const Ethereum = (window as any).ethereum;
      const provider = new ethers.providers.Web3Provider(Ethereum);
      await provider.send("eth_requestAccounts", []);
      const account = await provider.getSigner().getAddress();
      setDefaultAccount(account);
      const balance = await provider.getSigner().getBalance();
      setUserBalance(ethers.utils.formatEther(balance));
    } else {
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  return (
    <WalletContext.Provider
      value={{ defaultAccount, userBalance, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
