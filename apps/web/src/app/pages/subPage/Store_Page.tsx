"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Footers from "../../pages/footer";
import Image from "next/image";

const storeItems_1 = [
  {
    id: 1,
    name: "Hoodie",
    price: 100,
    image: "/images/store/hoodies.png",
  },
  {
    id: 2,
    name: "T-shirt",
    price: 50,
    image: "/images/store/shirt.png",
  },
  {
    id: 3,
    name: "Tote Bag",
    price: 35,
    image: "/images/store/totbag.png",
  },
  {
    id: 4,
    name: "Notebook",
    price: 15,
    image: "/images/store/notebook.png",
  },
];
  const storeItems_2 = [
  {
    id: 5,
    name: "Flashdisk",
    price: 32,
    image: "/images/store/flashdisk-xotl.png",
  },
  {
    id: 6,
    name: "Slipbags",
    price: 45,
    image: "/images/store/slip-bags.png",
  },
  {
    id: 7,
    name: "Rancel",
    price: 250,
    image: "/images/store/rancel-xotl.png",
  },
  {
    id: 8,
    name: "Bags",
    price: 186,
    image: "/images/store/bags-xotl.png",
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
        // ABI
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
    <div id="h-s-p">
    <div className="p-store">
    <div className="content-store">
      <div className="content-card">
        {storeItems_1.map((item) => (
          <div key={item.id} id="card" >
            <Image className="p-card"
              src={item.image}
              alt={item.name}
              width={210}
              height={210}
            />
            <div className="b-card">
                {item.price.toLocaleString()} XOTL
            </div>
          </div>
        ))}
      </div>
      <div className="content-card">
        {storeItems_2.map((item) => (
          <div key={item.id} id="card" >
            <Image className="p-card"
              src={item.image}
              alt={item.name}
              width={210}
              height={210}
            />
            <div className="b-card">
                {item.price.toLocaleString()} XOTL
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
      <Footers />
    </div>
  );
};

export default Store;
