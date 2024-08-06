"user client"

import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import connect_icon from "../assets/svg/connect_.svg";
import Q1_icon from "../assets/svg/Q_1.svg";
import Metamask_icon from "../assets/svg/metamask.svg";
import Coinbase_icon from "../assets/svg/CoinbaseWallet.svg";
import ConnectWallet_icon from "../assets/svg/Wallet_Connect.svg";
import BraveWallet_icon from "../assets/svg/Brave_Wallet.svg";

//Properties
const Ethereum = (window as any).ethereum;
const provider = new ethers.providers.Web3Provider(Ethereum);

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
          provider.send("eth_requestAccounts", []).then( async () => {
            await accountChangeHandler();
          })
        } else {
          setErrorMessage("Please Install Metamask!");
        }
    }

    const accountChangeHandler = async () => {
      const Account_ = await provider.getSigner(); 
      const address = await Account_.getAddress();
      setDefaultAccount(address);
      const balance = await Account_.getBalance("latest");
      setUserbalance(ethers.utils.formatEther(balance));
      //Close Modal
      setOpenModal(false);
    }

  return (
    <>
      <div id="topBar">
          <button id="btnConnect"
            onClick={() => setOpenModal(true)}
            type="button"
            data-modal-target="crypto-modal"
          >
            <Image src={connect_icon} alt="Connect Wallet icon" />
            <span className="mx-1">
                    {defaultAccount? "Connected" : "Connect"}
            </span>
          </button>
          <div className="flex justify-center">
            <div className="grid items-center text-white">
              <div> Address: {defaultAccount}</div>
              <div> Wallet Amount: {userBalance}</div>
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
                  <span id="metamask_w" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    onClick={connectWalletHandler}>
                   
                      <Image src={Metamask_icon} alt="Metamask icon" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        MetaMask
                      </span>
                      <span className="popular">
                        Popular
                      </span>
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
                      <Image src={ConnectWallet_icon} alt="Wallet Connect icon" />
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
                <Image src={Q1_icon} alt="Q-1 icon"/>
                <span className="ml-2">
                  Why do I need to connect with my wallet?
                </span>
                </a>
              </div>
            </Modal.Footer>

          </Modal>
      </div>
    </>
  );
};

export default Top_Bar;
