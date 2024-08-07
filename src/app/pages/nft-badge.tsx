import React, { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";
import axios from "axios";
import { ethers } from "ethers";

const nftTargets = [
  { id: 1, name: "10 Bottle Badge", target: 10, image: "/images/nft-10.jpg" },
  { id: 2, name: "100 Bottle Badge", target: 100, image: "/images/nft-10.jpg" },
];

const NftBadge = () => {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [totalBottles, setTotalBottles] = useState(0);

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
        }
      }
    };
    fetchUserAddress();
  }, []);

  useEffect(() => {
    const fetchTotalBottles = async () => {
      if (userAddress) {
        try {
          const response = await axios.get(
            `/api/get-total-bottles/${userAddress}`
          );
          setTotalBottles(response.data.totalBottles);
        } catch (error) {
          console.error("Error fetching total bottles:", error);
        }
      }
    };
    fetchTotalBottles();
  }, [userAddress]);

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
      const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
      const abi: ethers.ContractInterface = [
        // ABI for your contract's mint function
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tokenURI = `https://example.com/nft/${nft.id}`; // Replace with actual token URI
      const tx = await contract.mintNFT(userAddress, tokenURI);
      await tx.wait();

      alert("NFT claimed successfully!");
    } catch (error) {
      console.error("Error claiming NFT:", error);
      alert("NFT claim failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        NFT Badges
      </h1>
      <p className="text-2xl text-center text-white mb-6">
        Total Bottles Submitted:{" "}
        <span className="font-bold">{totalBottles}</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {nftTargets.map((nft) => (
          <Card key={nft.id} className="p-4 mb-4">
            <img
              src={nft.image}
              alt={nft.name}
              className="mb-4 w-full h-32 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
            <p className="mb-4">Target: {nft.target} bottles</p>
            <Button
              className="w-full"
              onClick={() => handleClaimNft(nft)}
              disabled={totalBottles < nft.target}
            >
              {totalBottles >= nft.target
                ? "Claim NFT"
                : `Need ${nft.target - totalBottles} more bottles`}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NftBadge;
