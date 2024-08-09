"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, Button } from "flowbite-react";

const storeItems = [
  {
    id: 1,
    name: "Hoodie",
    price: 100,
    image: "/images/hoodies.png",
  },
  {
    id: 2,
    name: "T-shirt",
    price: 50,
    image: "/images/shirt.png",
  },
  {
    id: 3,
    name: "Tote Bag",
    price: 25,
    image: "/images/totbag.png",
  },
  {
    id: 4,
    name: "Notebook",
    price: 500,
    image: "/images/notebook.png",
  },
];

const Store = () => {
  const [userAddress, setUserAddress] = useState<string | null>(null);

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

  const handlePurchase = async (item: {
    id?: number;
    name?: string;
    price: any;
  }) => {
    if (!userAddress) {
      alert("Please connect your wallet");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contractAddress = "YOUR_CONTRACT_ADDRESS";
      const abi: ethers.ContractInterface = [
        // ABI for your contract's purchase function
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.purchaseMerchandise(
        userAddress,
        ethers.utils.parseUnits(item.price.toString(), 18)
      );
      await tx.wait();

      alert("Purchase successful!");
    } catch (error) {
      console.error(error);
      alert("Purchase failed");
    }
  };

  return (
    <div
      className="container mx-auto p-4"
      style={{
        marginBottom: 100,
      }}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-24">
        {storeItems.map((item) => (
          <Card key={item.id} className="p-4 shadow-lg w-1/4 bg-gray-100">
            <img
              src={item.image}
              alt={item.name}
              className="mb-4 w-full h-48 object-cover rounded-t-lg"
            />
            <div className="text-center p-4 bg-yellow-400 rounded-b-lg">
              <p className="text-xl font-semibold">
                {item.price.toLocaleString()} XOTL
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Store;
