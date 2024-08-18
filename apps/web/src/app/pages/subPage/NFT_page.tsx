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
    image: "https://xottle.asia/images/Warrior-Badge.svg",
    uri: "https://xottle.asia/nft/warrior-badge.json",
  },
  {
    id: 2,
    name: "Xottle-Champion Badge",
    target: 100,
    image: "https://xottle.asia/images/Champion-Badge.svg",
    uri: "https://xottle.asia/nft/champion-badge.json",
  },
];

const NftBadge = () => {
  const { defaultAccount } = useWallet();
  const [totalBottles, setTotalBottles] = useState(0);
  const [ownedBadges, setOwnedBadges] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [addedToWallet, setAddedToWallet] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchTotalBottles = async () => {
      if (defaultAccount) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contractAddress = "0xeD7aB71C0020b7989BeBeACb50B2C4B26076fDAE"; // Replace with your ERC20 contract address
          const abi = [
            "event Transfer(address indexed from, address indexed to, uint256 value)",
          ];

          const contract = new ethers.Contract(contractAddress, abi, provider);

          // Fetch mint events for the user to count total bottles submitted
          const transferEvents = await contract.queryFilter(
            contract.filters.Transfer(
              ethers.constants.AddressZero,
              defaultAccount
            ),
            0,
            "latest"
          );

          setTotalBottles(transferEvents.length);
        } catch (error) {
          console.error("Error fetching total bottles:", error);
        }
      }
    };
    fetchTotalBottles();
  }, [defaultAccount]);

  useEffect(() => {
    const checkOwnedBadges = async () => {
      if (defaultAccount) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contractAddress = "0xcb8CEE4ab2025B75CFa53797C21AE46E9E17cBeD"; // Replace with your ERC721 contract address
          const abi = [
            "function has10BottlesBadge(address owner) public view returns (bool)",
            "function has50BottlesBadge(address owner) public view returns (bool)",
            "function has100BottlesBadge(address owner) public view returns (bool)",
            "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
          ];

          const contract = new ethers.Contract(contractAddress, abi, provider);

          const ownedBadgesTemp: { [key: number]: boolean } = {};
          ownedBadgesTemp[1] = await contract.has10BottlesBadge(defaultAccount);
          ownedBadgesTemp[2] = await contract.has100BottlesBadge(
            defaultAccount
          );
          setOwnedBadges(ownedBadgesTemp);
        } catch (error) {
          console.error("Error checking owned badges:", error);
        }
      }
    };
    checkOwnedBadges();
  }, [defaultAccount]);

  const getTokenIdFromEvents = async (
    contract: ethers.Contract,
    userAddress: string
  ) => {
    const filter = contract.filters.Transfer(null, userAddress);
    const events = await contract.queryFilter(filter, 0, "latest");
    if (events.length > 0) {
      const tokenId = events[events.length - 1].args?.tokenId.toString();
      return tokenId;
    }
    return null;
  };

  const handleClaimNft = async (nft: {
    id: number;
    name: string;
    target: number;
    uri: string;
    image: string;
  }) => {
    if (totalBottles < nft.target) {
      alert(
        `You need to submit at least ${nft.target} bottles to claim this NFT.`
      );
      return;
    }

    if (ownedBadges[nft.id]) {
      alert("You already own this badge.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xcb8CEE4ab2025B75CFa53797C21AE46E9E17cBeD"; // ERC721 contract address
      const abi: ethers.ContractInterface = [
        "function mint10BottlesBadge(string memory uri) public",
        "function mint50BottlesBadge(string memory uri) public",
        "function mint100BottlesBadge(string memory uri) public",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      let tx;

      // Call the specific minting function based on the NFT target
      if (nft.target === 10) {
        tx = await contract.mint10BottlesBadge(nft.uri);
      } else if (nft.target === 50) {
        tx = await contract.mint50BottlesBadge(nft.uri);
      } else if (nft.target === 100) {
        tx = await contract.mint100BottlesBadge(nft.uri);
      }

      await tx.wait();

      alert("NFT claimed successfully!");
      setOwnedBadges({ ...ownedBadges, [nft.id]: true });
      setAddedToWallet({ ...addedToWallet, [nft.id]: false });
    } catch (error) {
      console.error("Error claiming NFT:", error);
      alert("NFT claim failed");
    }
  };

  const handleAddToWallet = async (nft: {
    id: number;
    name: string;
    image: string;
  }) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xcb8CEE4ab2025B75CFa53797C21AE46E9E17cBeD"; // ERC721 contract address
      const abi = [
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tokenId = await getTokenIdFromEvents(contract, defaultAccount);

      if (!tokenId) {
        alert("Token ID is missing.");
        return;
      }

      const wasAdded = await (window as any).ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC721",
          options: {
            address: contractAddress,
            symbol: "XOFT",
            tokenId: tokenId, // Include the tokenId here
            decimals: 0,
            image: nft.image,
          },
        },
      });

      if (wasAdded) {
        alert("NFT has been added to your wallet!");
        setAddedToWallet({ ...addedToWallet, [nft.id]: true });
      } else {
        console.log("Failed to add NFT to wallet.");
      }
    } catch (error) {
      console.error("Error adding NFT to wallet:", error);
    }
  };

  return (
    <div id="h-s-p">
      <div className="nft-p">
        <div className="nft-content">
          <div className="s-content">
            <div className="nft-card">
              {nftTargets.map((nft) => (
                <div key={nft.id} className="nft-c-h">
                  <div className="nft-c-h-i">
                    <Image
                      className="p-c-nft"
                      src={nft.image}
                      alt={nft.name}
                      width={0}
                      height={0}
                    />
                    <h2>{nft.name}</h2>
                    <p>Target: {nft.target} bottles</p>
                  </div>
                  {ownedBadges[nft.id] ? (
                    addedToWallet[nft.id] ? (
                      <button disabled>You already own this NFT</button>
                    ) : (
                      <button onClick={() => handleAddToWallet(nft)}>
                        Add to Wallet
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleClaimNft(nft)}
                      disabled={totalBottles < nft.target}
                    >
                      {totalBottles >= nft.target
                        ? "Claim NFT"
                        : `Need ${nft.target - totalBottles} more bottles`}
                    </button>
                  )}
                </div>
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
