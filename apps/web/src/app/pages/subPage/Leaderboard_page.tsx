"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<
    { address: string; count: number }[]
  >([]);
  useEffect(() => {
    const fetchTokenHolders = async () => {
      await getTokenHolders();
    };
    fetchTokenHolders();
  }, []);

  async function getTokenHolders() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const abi = [
      "event Transfer(address indexed from, address indexed to, uint256 value)", // Include this
      "function balanceOf(address owner) public view returns (uint256)",
    ];

    const contractAddress = "0xeD7aB71C0020b7989BeBeACb50B2C4B26076fDAE";
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const fromBlock = 0; // Start from the genesis block or the block number when the contract was deployed
    const toBlock = "latest";

    // Query Transfer events with the from address being the zero address (minting)
    const transferEvents = await contract.queryFilter(
      {
        address: contractAddress,
        topics: [
          ethers.utils.id("Transfer(address,address,uint256)"),
          ethers.utils.hexZeroPad(
            "0x0000000000000000000000000000000000000000",
            32
          ),
        ],
      },
      fromBlock,
      toBlock
    );

    // Track mint counts per user
    const mintCounts = new Map<string, number>();

    transferEvents.forEach((event) => {
      const userAddress = event.args?.to;
      if (userAddress) {
        const currentCount = mintCounts.get(userAddress) || 0;
        mintCounts.set(userAddress, currentCount + 1);
      }
    });

    // Convert the map to an array and sort by mint count
    const leaderboard = Array.from(mintCounts.entries()).map(
      ([address, count]) => ({ address, count })
    );
    leaderboard.sort((a, b) => b.count - a.count);

    setLeaderboardData(leaderboard);

    console.log("Leaderboard by bottles submitted:", leaderboard);
  }
  return (
    <div className="p-l-page">
      <div className="l-b-page">
        <div className="l-content">
          <div
            style={{
              padding: 20,
            }}
            className="bg-yellow-400 p-8 rounded-lg shadow-lg"
          >
            <table className="t-content">
              <thead>
                <tr className="t-h">
                  <th className="flex-row py-4">Rank</th>
                  <th className="flex-row py-4">Address</th>
                  <th className="flex-row py-4">
                    Bottles
                    <br />
                    Collected
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr key={index} className="t-b">
                    <td className="flex-row py-4">{index + 1}</td>
                    <td className="flex-row py-4">{entry.address}</td>
                    <td className="flex-row py-4">{entry.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
