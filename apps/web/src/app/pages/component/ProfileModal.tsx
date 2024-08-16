import React, { useState } from "react";
import Image from "next/image";
import copyText from "../../assets/svg/copy-text.svg";
import disConnect_icon from "../../assets/svg/diconnect-wallet.svg";
import { useWallet } from "@/app/context/WalletContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  account: string;
  avatarSrc: string;
  balance: string;
};

const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose, account, avatarSrc, balance }) => {
  const [copyAddress, setCopied] = useState("Copy Address");
  const {disconnectWallet} = useWallet();

  const copyTextToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied("Copied");
        setTimeout(() => setCopied("Copy Address"), 300);
      },
      (err) => console.error(err)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
        <div className="flex justify-end items-center">
        </div>

        <div className="flex flex-col items-center mt-4">
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={60}
            height={60}
            className="rounded-full"
          />
          <p className="mt-2 text-lg font-semibold">
            {account ? account.slice(0, 6) + "..." + account.slice(-4) : ""}
          </p>
          <p className="text-gray-500">{balance} ETH</p>
        </div>

        <div id="footer-btn">
          <button
            id="copy-btn"
            className="copy-txt"
            onClick={() => copyTextToClipboard(account)}
          >
            <Image
              src={copyText}
              alt="Copy Icon"
              width={20}
              height={20}
            />
            <span>{copyAddress}</span>
          </button>
          <button className="dis-btn" onClick={onClose}>
            <Image
              src={disConnect_icon}
              alt="Disconnect Icon"
              width={20}
              height={20}
            />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
