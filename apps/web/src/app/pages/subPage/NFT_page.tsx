"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { useWallet } from "../../context/WalletContext";
import Footers from "../../pages/footer";


const nftTargets = [
  {
    id: 1,
    name: "Xottle-Warrior Badge",
    target: 10,
    image: "/images/Warrior-Badge.svg",
  },
  {
    id: 2,
    name: "Xottle-Champion Badge",
    target: 100,
    image: "/images/Champion-Badge.svg",
  },
];


const NftBadge = () => {
  const {defaultAccount} = useWallet();
  const [totalBottles, setTotalBottles] = useState(0);

  useEffect(() => {
    const fetchTotalBottles = async () => {
      if (defaultAccount) {
        try {
          // const response = await axios.get(
          //   `/api/get-total-bottles/${defaultAccount}`
          // );
          // setTotalBottles(response.data.totalBottles);
        } catch (error) {
          console.error("Error fetching total bottles:", error);
        }
      }
    };
    fetchTotalBottles();
  }, [defaultAccount]);

  const handleClaimNft = async (nft: {
    id: number;
    name: string;
    target: number;
  }) => {
    if (totalBottles < nft.target) {
      alert(
        `You need to submit at least ${nft.target} bottles to claim this NFT.`
      );
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contractAddress = "0xeF67BA21d39E4E6F9e60bF333dDE64c7e8e66110";
      const abi: ethers.ContractInterface = [
          //Abi
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tokenURI = `https://example.com/nft/${nft.id}`; 
      const tx = await contract.mintNFT(defaultAccount, tokenURI);
      await tx.wait();

      alert("NFT claimed successfully!");
    } catch (error) {
      console.error("Error claiming NFT:", error);
      alert("NFT claim failed");
    }
  };

  return (
    <div id="h-s-p">
    <div className="nft-p">
      <div className="nft-content">
        <div className="s-content">
        <div className="nft-card">
          {nftTargets.map((nft) => (
            <><div key={nft.id} className="nft-c-h">
              <div className="nft-c-h-i">
                <Image className="p-c-nft"
                  src={nft.image}
                  alt={nft.name}
                  width={0}
                  height={0} />
                <h2>{nft.name}</h2>
                <p>Target: {nft.target} bottles</p>
              </div>
              <button
                  onClick={() => handleClaimNft(nft)}
                  disabled={totalBottles < nft.target}>
                  {totalBottles >= nft.target
                    ? "Claim NFT"
                    : `Need ${nft.target - totalBottles} more bottles`}
              </button>
              </div>
              </>
          ))}
          </div>
        </div>
      </div>
      </div>
      <Footers />
      </div>
  );
};

export default NftBadge;
