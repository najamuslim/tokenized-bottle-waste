"use client";

import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window{
    ethereum : any;
  }
}

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
    if (window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethProvider.send("eth_requestAccounts", []);
      const signer = ethProvider.getSigner();
      const account = await signer.getAddress();
      setDefaultAccount(account);
      //const balance = await provider.getSigner().getBalance();
      //setUserBalance(ethers.utils.formatEther(balance));
      try{
        // Feature Auto Change Network
        window.ethereum.request({
         method: 'wallet_switchEthereumChain',
          //Chain ID  Lisk Sepolia Tesnet
          params: [{ chainId: '0x106a' }],
        });
        } catch(error){
         console.error(error);
        }
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
