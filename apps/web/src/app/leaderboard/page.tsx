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
    <div className="bg-blue-800 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div
          style={{
            padding: 20,
          }}
          className="bg-yellow-400 p-8 rounded-lg shadow-lg"
        >
          <table className="w-full text-center text-blue-900">
            <thead>
              <tr>
                <th className="text-2xl font-bold py-4">Rank</th>
                <th className="text-2xl font-bold py-4">Name</th>
                <th className="text-2xl font-bold py-4">Bottles Collected</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.rank} className="border-t border-blue-900">
                  <td className="py-4 text-xl">{entry.rank}</td>
                  <td className="py-4 text-xl">{entry.name}</td>
                  <td className="py-4 text-xl">{entry.bottles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
