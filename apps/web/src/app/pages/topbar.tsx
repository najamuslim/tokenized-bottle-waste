"use client"

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Modal, Sidebar } from "flowbite-react";
import Image from "next/image";

//Import Assets SVG Icon
import connect_icon from "../assets/svg/connect_.svg";
import Q1_icon from "../assets/svg/Q_1.svg";
import Logo_brand from "../assets/svg/Xottle_Logo.svg";
import Metamask_icon from "../assets/svg/metamask.svg";
import Coinbase_icon from "../assets/svg/CoinbaseWallet.svg";
import ConnectWallet_icon from "../assets/svg/Wallet_Connect.svg";
import BraveWallet_icon from "../assets/svg/Brave_Wallet.svg";
import Toggle_On from "../assets/svg/toggle-on.svg";
import Toggle_Off from "../assets/svg/toggle-off.svg";
import Inbox_icon from "../assets/svg/Inbox.svg";

import { motion } from "framer-motion";
import { HiChartPie, HiInbox, HiShoppingBag } from "react-icons/hi";

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
  //const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserbalance] = useState("");

  //Connect Wallet Handler  ( METAMASK WALLET)
  const connectWalletHandler = async () => {
    if ((window as any).ethereum) {
      const Ethereum = (window as any).ethereum
      const provider = new ethers.providers.Web3Provider(Ethereum);
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangeHandler();
      });
      try{
      // Feature Auto Change Network
        Ethereum.request({
        method: 'wallet_switchEthereumChain',
        //Chain ID  Lisk Sepolia Tesnet
        params: [{ chainId: '0x106a' }],
      });
      } catch(error){
        console.error(error);
      }
     }
     else {
      window.open('https://metamask.io/download.html', '_blank');
    }
  };

  const accountChangeHandler = async () => {
    const Ethereum = (window as any).ethereum
    const provider = new ethers.providers.Web3Provider(Ethereum);
    const Account_ = provider.getSigner();
    const address = await Account_.getAddress();
    setDefaultAccount(address);
    const balance = await Account_.getBalance("latest");
    setUserbalance(ethers.utils.formatEther(balance));
    //Close Modal
    setOpenModal(false);
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSwitchOn, setSwitchOn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
  };

  //Toggle SideBar Mobile View
  const [isOn, setIsOn] = useState(false);
                
    return (
      <>
        <nav className="Navbar">
          {/* Inbox Messages */}
          <div id="inbox-msg">
            <label>3</label>
            <span>
              <Image src={Inbox_icon} alt="Inbox" />
            </span>
            Inbox
          </div>
          <div className="h-nav">
            <div className="l-nav">
              {/* Mobile menu button */}
              <button
                className="btn-tg"
                onClick={toggleMobileMenu}
              >
                <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} />
              </button>
              {/* Logo */}
              <a href="/">
                <Image
                  className="logo-brand"
                  src={Logo_brand}
                  alt="logo brand"
                />
              </a>
              {/* Desktop navigation links */}
              <div className="Menu-nav">
                <a href="#">Dashboard</a>
                <a href="#">Store</a>
              </div>
              <div className="con-btn">
                <button
                  id="btnConnect"
                  onClick={() => setOpenModal(true)}
                  type="button"
                  data-modal-target="crypto-modal"
                >
                  <Image src={connect_icon} alt="Connect Wallet icon"></Image>
                  <span>
                    {defaultAccount ? defaultAccount.slice(0, 6) + '...' + defaultAccount.slice(38)
                    : "Connect Wallet"}
                  </span>
                </button>
              </div>
            </div>
            {/* Mobile menu */}
            <div className="ct-sidebar">
              <div
                className={`md:hidden ${
                  isMobileMenuOpen ? "block" : "hidden"
                } bg-transparent`}
              >
                <Sidebar aria-label="Default sidebar example">
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="#" icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item href="#" icon={HiInbox} label="3">
                        Inbox
                      </Sidebar.Item>
                      <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Store
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </Sidebar>
              </div>
            </div>
          </div>

          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
              <div className="flex items-center justify-between p-2 md:p-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Connect wallet
                </h3>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="p-4 md:p-5">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Connect with one of our available wallet providers or create a
                  new one.
                </p>
                <ul className="my-6 space-y-2">
                  <li>
                    <span
                      id="metamask_w"
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      onClick={connectWalletHandler}
                    >
                      <Image src={Metamask_icon} alt="Metamask icon" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        MetaMask
                      </span>
                      <span className="popular">Popular</span>
                    </span>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <Image src={Coinbase_icon} alt="Coinbase icon" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Coinbase Wallet
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <Image
                        src={ConnectWallet_icon}
                        alt="Wallet Connect icon"
                      />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Wallet Connect
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <Image src={BraveWallet_icon} alt="Wallet Connect icon" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Brave Wallet
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div>
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                >
                  <Image src={Q1_icon} alt="Q-1 icon" />
                  <span className="ml-2">
                    Why do I need to connect with my wallet?
                  </span>
                </a>
              </div>
            </Modal.Footer>
          </Modal>
        </nav>
      </>
    );
}

export default Top_Bar;
