"use client";

import { useState } from "react";

export default function Home() {
  const [userAddress, setUserAddress] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");

  const mintToken = async () => {
    const response = await fetch(`/api/mint-token?userAddress=${userAddress}`);
    const data = await response.text();
    alert(data);
  };

  const mintNFT = async () => {
    const response = await fetch(
      `/api/mint-nft?userAddress=${userAddress}&tokenURI=${tokenURI}`
    );
    const data = await response.text();
    alert(data);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center mt-10">Bottle Waste Platform</h1>
      <div className="mt-10">
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="User Address"
          className="border p-2 w-full"
        />
        <button
          onClick={mintToken}
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Mint Token
        </button>
      </div>
      <div className="mt-10">
        <input
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          placeholder="Token URI"
          className="border p-2 w-full"
        />
        <button
          onClick={mintNFT}
          className="bg-green-500 text-white p-2 mt-2 w-full"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}
