"use client";

import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import QRscan from "./component/QRscan";
import { Modal } from "flowbite-react";

const ContentTop = () => {
  const { defaultAccount } = useWallet();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div id="container">
      <h1 className="mb-6">
        Exchange Your <b>Bottle</b> Into
      </h1>
      <div className="text-lg mb-4">$XOTL</div>
      <button
        onClick={() => setOpenModal(true)}
        disabled={!defaultAccount || isButtonClicked}
        className={`${!defaultAccount ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Scan Now
      </button>
      {isButtonClicked && <div>Processing...</div>}
      <div id="CamSan">
        <Modal
          dismissible
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <QRscan />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ContentTop;
