"use client";

import React from "react";

const leaderboardData = [
  { rank: 1, name: "Alice", bottles: 150 },
  { rank: 2, name: "Bob", bottles: 140 },
  { rank: 3, name: "Charlie", bottles: 130 },
  { rank: 4, name: "David", bottles: 120 },
  { rank: 5, name: "Eve", bottles: 110 },
];

const Leaderboard = () => {
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
                    <th className="flex-row py-4">Name</th>
                    <th className="flex-row py-4">
                      Bottles
                      <br />
                      Collected
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry) => (
                    <tr key={entry.rank} className="t-b">
                      <td className="flex-row py-4">{entry.rank}</td>
                      <td className="flex-row py-4">{entry.name}</td>
                      <td className="flex-row py-4">{entry.bottles}</td>
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
