"use client";

import React, { useState } from "react";
import Footers from "../../pages/footer";

const Modal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-blue-900 text-xl font-bold mb-4">You have joined!</p>
        <button
          className="px-4 py-2 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={onClose}>
          Close
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

const Challenges = () => {
  const [showModal, setShowModal] = useState(false);
  const [isJoined1, setIsJoined_1] = useState(false);
  const [isJoined2, setIsJoined_2] = useState(false);

  const handleJoinChallenge1 = () => {
    setShowModal(true);
    setIsJoined_1(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleJoinChallenge2 = () => {
    setShowModal(true);
    setIsJoined_2(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000); 
  };

  return (
    <div id="h-s-p">
      <div className="h-chl-c">
        <div className="chl-content">
          <div className="bg-blue-800 min-h-screen py-16">
            <div className="content-bottom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="t-contents">
                  <div className="ct-1">
                    <h2 className="text-4xl text-blue-900 font-bold mb-6">
                      Weekly Bottle Challenge
                    </h2>
                    <p className="text-blue-900 mb-6">
                      Participate in the weekly challenge and earn extra $XOTL
                      tokens by recycling more bottles!
                    </p>
                    <button
                      className={`px-6 py-3 text-blue-900 font-bold bg-white w-32 rounded-lg transition-colors duration-300 ${
                        isJoined1 ? "joined cursor-not-allowed" : "bg-blue-900 hover:bg-blue-700"
                      }`}
                      onClick={handleJoinChallenge1}
                      disabled={isJoined1}
                    >
                      {isJoined1? "Joined" : "Join Challenge"}
                    </button>
                  </div>

                  <div className="ct-2">
                    <h2 className="text-4xl text-blue-900 font-bold mb-6">
                      Monthly Recycling Marathon
                    </h2>
                    <p className="text-blue-900 mb-6">
                      Collect and submit as many bottles as you can this month to
                      win big rewards!
                    </p>
                    <button
                      className={`px-6 py-3 text-blue-900 font-bold bg-white rounded-lg transition-colors duration-300 ${
                        isJoined2 ? "joined cursor-not-allowed" : "bg-blue-900 hover:bg-blue-700"
                      }`}
                      onClick={handleJoinChallenge2}
                      disabled={isJoined2}
                    >
                      {isJoined2? "Joined" : "Join Challenge"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
      <Footers />
    </div>
  );
};

export default Challenges;
