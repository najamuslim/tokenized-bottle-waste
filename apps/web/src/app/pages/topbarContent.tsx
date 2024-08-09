"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ContentTop = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { defaultAccount } = useWallet();
  const [message, setMessage] = useState("");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleScan = async (result: any) => {
    if (result) {
      console.log("result", result);
      setScanResult(result.text);
      await hitSubmitBottle();
    }
  };

  const hitSubmitBottle = async () => {
    if (defaultAccount) {
      try {
        // Set up ethers.js provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Contract details
        const tokenAddress = "0xa2B31B994cCE1B26a32392dC6d6e417965e18651";
        const tokenAbi = [
          "function mint(address to, uint256 amount) public",
          "function approve(address spender, uint256 amount) public returns (bool)",
        ];

        // Create contract instance
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          signer
        );

        // Perform the mint and approve transactions
        const amount = ethers.utils.parseUnits("1", 18);
        const mintTx = await tokenContract.mint(defaultAccount, amount);
        await mintTx.wait();

        const approveTx = await tokenContract.approve(defaultAccount, amount);
        await approveTx.wait();

        setMessage("Bottle submitted and allowance set successfully!");
        console.log("Bottle submitted and allowance set successfully!");
        addTokenToWallet();
      } catch (error: any) {
        console.error("Error processing transaction:", error);
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage("Please connect your wallet.");
    }
  };

  const handleClick = () => {
    setIsButtonClicked(true);
  };

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        const tokenAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0xa2B31B994cCE1B26a32392dC6d6e417965e18651",
              symbol: "XOTL",
              decimals: 18,
            },
          },
        });

        if (tokenAdded) {
          console.log("Token added to wallet!");
        } else {
          console.log("Token not added to wallet.");
        }
      } catch (error) {
        console.error("Error adding token to wallet:", error);
      }
    }
  };

  return (
    <div id="container">
      <h1 className="mb-6">
        Exchange Your <b>Bottle</b> Into
      </h1>
      <div className="text-lg mb-4">$XOT</div>
      {defaultAccount && !isButtonClicked ? (
        <button onClick={handleClick}>Scan Now</button>
      ) : (
        isButtonClicked && (
          <div id="CamScan">
            <Scanner onScan={handleScan} />
          </div>
        )
      )}
    </div>
  );
};

export default ContentTop;
