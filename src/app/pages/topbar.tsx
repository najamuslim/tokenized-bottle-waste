"use client"

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Modal, Navbar, Button } from "flowbite-react";
import Image from "next/image";
import connect_icon from "../assets/svg/connect_.svg";
import Q1_icon from "../assets/svg/Q_1.svg";
import Logo_brand from "../assets/svg/Xottle_Logo.svg";
import Metamask_icon from "../assets/svg/metamask.svg";
import Coinbase_icon from "../assets/svg/CoinbaseWallet.svg";
import ConnectWallet_icon from "../assets/svg/Wallet_Connect.svg";
import BraveWallet_icon from "../assets/svg/Brave_Wallet.svg";
import { motion } from "framer-motion";
import Toggle_On from "../assets/svg/toggle-on.svg";
import Toggle_Off from "../assets/svg/toggle-off.svg";

//Properties
const Ethereum = (window as any).ethereum;
const provider = new ethers.providers.Web3Provider(Ethereum);


//Analyze Toggle
interface SwitchProps {
    isOn: boolean;
    [key: string]: any; // for any additional props
}

const Switch: React.FC<SwitchProps> = ({ isOn, ...rest }) => {
  const customClassName = `toggleSwitch ${isOn ? "on" : "off"}`;
  const src = isOn ?  Toggle_On : Toggle_Off;

  return (
      <motion.div
          animate
          className={customClassName}
          {...rest}
      >
          <motion.div animate>
              <Image src={src} alt="Toggle" />
          </motion.div>
      </motion.div>
  );
};

//FUNCTION TOP BAR 
const Top_Bar = () => {
  //Modal
  const [openModal, setOpenModal] = useState(false);

  //Properties
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserbalance] = useState("");

  //Connect Wallet Handler  ( METAMASK WALLET)
  const connectWalletHandler = async () => {
    if (Ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangeHandler();
      });
    } else {
      setErrorMessage("Please Install Metamask!");
    }
  };

  const accountChangeHandler = async () => {
    const Account_ = await provider.getSigner();
    const address = await Account_.getAddress();
    setDefaultAccount(address);
    const balance = await Account_.getBalance("latest");
    setUserbalance(ethers.utils.formatEther(balance));
    //Close Modal
    setOpenModal(false);
  };
//CUSTOM THEME
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      base: "px-2 py-2.5 sm:px-4",
      rounded: {
        on: "rounded",
        off: "",
      },
    }
    //END CUSTOM THEME
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSwitchOn, setSwitchOn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
  };

  //
  const [isOn, setIsOn] = useState(false);
                
    return (
      <>
        <nav className="Navbar">
          {/* Mobile menu button */}
          <button className="md:hidden w-14 h-auto" onClick={toggleMobileMenu}>
            <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} />
          </button>
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-white">
            <Image className="logo-brand" src={Logo_brand} alt="logo brand" />
          </a>
          {/* Desktop navigation links */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Store
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Account
            </a>
          </div>
          <div className="flex md:order-2">
            <button
              id="btnConnect"
              onClick={() => setOpenModal(true)}
              type="button"
              data-modal-target="crypto-modal"
            >
              <Image
                className="connect-icon"
                src={connect_icon}
                alt="Connect Wallet icon"
              ></Image>
              <span>{defaultAccount ? "Connected" : "Connect Wallet"}</span>
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } bg-transparent`}>
            <div className="flex flex-col items-center py-4">
              <a href="#" className="text-gray-300 hover:text-white py-2">
                Store
              </a>
              <a href="#" className="text-gray-300 hover:text-white py-2">
                Account
              </a>
            </div>
          </div>
        </nav>
      </>
    );
}

export default Top_Bar;
