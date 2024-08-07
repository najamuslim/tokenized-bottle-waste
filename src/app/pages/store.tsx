import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, Button } from "flowbite-react";

const storeItems = [
  {
    id: 1,
    name: "Merchandise A",
    price: 10,
    image: "/images/marchandise-a.jpg",
  },
  {
    id: 2,
    name: "Merchandise B",
    price: 20,
    image: "/images/marchandise-a.jpg",
  },
  {
    id: 3,
    name: "Merchandise C",
    price: 30,
    image: "/images/marchandise-a.jpg",
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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <Card key={item.id} className="p-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="mb-4 w-full h-32 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="mb-4">Price: {item.price} Xottle</p>
            <Button className="w-full" onClick={() => handlePurchase(item)}>
              Buy
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Store;
