"use client";

import React from "react";
import Footers from "../../pages/footer";

const Challenges = () => {
  return (
    <div id="h-s-p">
      <div className="h-chl-c">
        <div className="chl-content">
          <div
            className="bg-blue-800 min-h-screen py-16"
          >
            <div className="content-bottom">
              <div
                style={{
                  gap: 20,
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div
                  style={{
                    padding: 20,
                  }}
                  className="bg-yellow-400 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-4xl text-blue-900 font-bold mb-6">
                    Weekly Bottle Challenge
                  </h2>
                  <p className="text-blue-900 mb-6">
                    Participate in the weekly challenge and earn extra $XOTL
                    tokens by recycling more bottles!
                  </p>
                  <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Join Challenge
                  </button>
                </div>

                <div
                  style={{
                    padding: 20,
                  }}
                  className="bg-yellow-400 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-4xl text-blue-900 font-bold mb-6">
                    Monthly Recycling Marathon
                  </h2>
                  <p className=" text-blue-900 mb-6">
                    Collect and submit as many bottles as you can this month to
                    win big rewards!
                  </p>
                  <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footers />
    </div>
  );
};

export default Challenges;
