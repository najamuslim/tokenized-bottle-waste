"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/svg/qr-frame.svg";
import CircularProgress from "./progressBar";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";

declare global {
  interface Window {
    ethereum: any;
  }
}

const QRscan = () => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const { defaultAccount } = useWallet();
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [isBottleSubmit, setBottleSubmit] = useState<boolean>(false);
  const [tokenAdded, setTokenAdded] = useState("");
  const [isSuccessSubmit, setSuccessSubmit] = useState("");
  const [BottleSubmitSussess, setBottleSubmitSuccess] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const hitSubmitBottle = useCallback(async () => {
    if (defaultAccount) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tokenAddress = "0xeD7aB71C0020b7989BeBeACb50B2C4B26076fDAE";
        const tokenAbi: ethers.ContractInterface = [
          {
            inputs: [],
            name: "IS_SCRIPT",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "run",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "setUp",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "xottleToken",
            outputs: [
              {
                internalType: "contract XottleToken",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          signer
        );
        setBottleSubmit(true);

        const amountPerBottle = ethers.utils.parseUnits("10", 18);

        const mintTx = await tokenContract.mint(
          defaultAccount,
          amountPerBottle
        );
        await mintTx.wait();

        setSuccessSubmit("Bottle submitted and allowance set success");
        addTokenToWallet();
      } catch (error: any) {
        console.error("Error processing transaction:", error);
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage("Please connect your wallet.");
    }
  }, [defaultAccount]);

  const onScanSuccess = useCallback(
    async (result: QrScanner.ScanResult) => {
      setScannedResult(result?.data);
      if (result) {
        scanner.current?.stop();
        setQrOn(false);
        console.log("Success Scanned");
        await hitSubmitBottle();
        setOpenModal(false);
      }
    },
    [hitSubmitBottle]
  );

  const onScanFail = useCallback((err: string | Error) => {
    console.error("QR Scan failed: ", err);
  }, []);

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }
    return () => {
      if (!scanner?.current) {
        scanner?.current?.stop();
      }
    };
  }, [onScanSuccess, onScanFail]);

  useEffect(() => {
    console.log("Checking camera permissions...");
    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((result) => {
        if (result.state !== "granted") {
          console.warn("Camera access denied by user.");
          setQrOn(false);
        }
      });
  }, []);

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        const tokenAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0xeD7aB71C0020b7989BeBeACb50B2C4B26076fDAE",
              symbol: "XOTL",
              decimals: 18,
            },
          },
        });

        if (tokenAdded) {
          setTokenAdded("XOTL added to Wallet");
        } else {
          console.log("Token not added to wallet.");
        }
      } catch (error) {
        console.error("Error adding token to wallet:", error);
      }
      setBottleSubmitSuccess(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="header">Scan Bottle</div>
      <div id="contentScan">
        <div className={BottleSubmitSussess ? "waiting" : "success"}></div>
        {BottleSubmitSussess ? (
          <div className="qr-reader">
            {/* QR Scanner */}
            <video
              ref={videoEl}
              className={isBottleSubmit ? "bottle-submit" : "wait-submit"}
            ></video>
            {isBottleSubmit ? (
              <span id="p-bars">
                <CircularProgress
                  percentage={progress}
                  size={120}
                  color="#F5CC00"
                />
                <div className="submit_success">
                  <p>{isSuccessSubmit}</p>
                </div>
              </span>
            ) : (
              <div ref={qrBoxEl} className="qr-box">
                <Image
                  src={QrFrame}
                  alt="QR Frame"
                  width={300}
                  height={300}
                  className="qr-frame"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="qr-reader">
            <div className="notifyAdd">{tokenAdded}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default QRscan;
