"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Content_top = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(accounts[0]);
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        alert("Please install MetaMask");
      }
    };
    connectWallet();
  }, []);

  const handleScan = async (result: any) => {
    if (result) {
      console.log("result", result);
      setScanResult(result.text);
      hitSubmitBottle();
    }
  };

  const hitSubmitBottle = async () => {
    if (userAddress) {
      try {
        const amount = "1";
        const response = await fetch("/api/submit-bottle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAddress,
            amount,
            spenderAddress: userAddress,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log("Bottle submmited");
          setMessage("Bottle submitted successfully!");
        } else {
          const errorData = await response.json();
          //setMessage(Error: ${errorData.error});
          console.log("error");
        }
      } catch (error: any) {
        //setMessage(Error: ${error.message});
      }
    } else {
      setMessage("Please connect your wallet.");
    }
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = async () => {
    setIsButtonClicked(true);
    // const Ethereum = (window as any).ethereum;
    // const provider = new ethers.providers.Web3Provider(Ethereum);
    // const Account_ = provider.getSigner();
    // const address = await Account_.getAddress();

    // setUserAddress(address);
  };

  return (
    <div id="container">
      <h1 className="mb-6">
        Exchange Your <b>Bottle</b> Into
      </h1>
      <div className="text-lg mb-4">$XOT</div>
      {!isButtonClicked ? (
        <button onClick={handleClick}>Scan Now</button>
      ) : (
        <div id="CamScan">
          <Scanner onScan={handleScan} />
        </div>
      )}
    </div>
  );
};

export default Content_top;
