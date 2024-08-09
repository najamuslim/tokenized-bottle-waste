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
    <div>
      <div id="container" className="text-center py-16 bg-blue-800 relative">
        <h1 className="text-white text-5xl font-bold mb-6">
          Exchange Your <b>Bottle</b> Into
        </h1>
        <div className="text-5xl text-yellow-400 font-bold mb-8">$XOTL</div>
        {!isButtonClicked ? (
          <button
            disabled={!defaultAccount}
            onClick={handleClick}
            className={`px-8 py-3 text-xl font-bold text-blue-900 bg-yellow-500 rounded-full ${
              !defaultAccount
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-600"
            }`}
          >
            Scan Now
          </button>
        ) : (
          isButtonClicked && (
            <div id="CamScan" className="mt-6">
              <Scanner onScan={handleScan} />
            </div>
          )
        )}
      </div>

      <div className="bg-blue-800 py-16 relative mb-10">
        <hr
          style={{ width: "80%" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 border-t-2 border-yellow-400"
        />
        <h2
          style={{ fontSize: 50, padding: 40 }}
          className="text-center text-white text-5xl md:text-7xl font-bold mb-12"
        >
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <img
              src="/images/scan.png"
              alt="Scan"
              className="mx-auto mb-4 h-40 w-40 object-contain"
            />
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <img
              src="/images/throw.png"
              alt="Deposit"
              className="mx-auto mb-4 h-40 w-40 object-contain"
            />
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <img
              src="/images/earn.png"
              alt="Earn"
              className="mx-auto mb-4 h-40 w-40 object-contain"
            />
          </div>
        </div>
        <div
          style={{ padding: 20 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Scan</h3>
            <p className="text-base md:text-lg">
              Use your smartphone to scan the QR code on the bottle
            </p>
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Deposit</h3>
            <p className="text-base md:text-lg">
              Deposit the bottle into a Xottle vending machine
            </p>
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Earn</h3>
            <p className="text-base md:text-lg">
              Earn $XOTL rewards for exclusive benefits, trade, vouchers, or
              products
            </p>
          </div>
        </div>
      </div>

      <div
        className="bg-yellow-400 py-16 mt-10 pb-16 mx-10"
        style={{ margin: "50px auto", padding: "40px" }}
      >
        <h2
          className="text-center text-black text-6xl md:text-7xl mb-12 px-10"
          style={{ padding: "20px", fontSize: 40 }}
        >
          Do More <span style={{ fontWeight: "bold" }}>Get More</span>
        </h2>
        <p
          className="text-center text-lg md:text-xl leading-relaxed mb-12 mx-auto max-w-4xl px-10"
          style={{ paddingBottom: "20px" }}
        >
          Earn $XOTL to trade for other cryptocurrencies, vouchers, or products.
          Unlock exclusive perks by staking more $XOTL and enjoy benefits like
          VIP airport lounge access, special discounts, free tickets, insurance,
          and more as you reach higher levels of $XOTL holdings.
          <br />
          <br />
          <strong>The more you hold, the more you gain!</strong>
        </p>
        <div className="flex justify-center px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/images/domore.png"
              alt="do more"
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
