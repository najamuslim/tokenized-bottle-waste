"use client"

import { useEffect, useRef, useState } from "react";
import  Image  from "next/image";
import "../../assets/css/QR.css";
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/svg/qr-frame.svg";
import CircularProgress from './progressBar';
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";


declare global {
  interface Window {
    ethereum: any;
  }
  
}

const QRscan = () => {
  
  // States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const { defaultAccount } = useWallet();
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [isBottleSubmit, setBottleSubmit] = useState<boolean>();
  const [tokenAdded, setTokenAdded] = useState("");
  const [isSuccessSubmit, setSuccessSubmit] = useState("");
  const [BottleSubmitSussess, setBottleSubmitSuccess] = useState<boolean>(true);
  
  //Progress Bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1 
      );
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  // QR Scanner
  const onScanSuccess =  async (result: QrScanner.ScanResult) => {
    
    setScannedResult(result?.data);
    if (result){
      scanner.current?.stop();
      setQrOn(false);
      console.log("Success Scanned");
      setOpenModal(false)
      await hitSubmitBottle();
    }

  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

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
  }, []);


  useEffect(() => {
    navigator.permissions.query({ name: 'camera' as PermissionName })
      .then((result) => {
        if (result.state !== 'granted') {
          setQrOn(false);
        }
      });
  }, []);
  // end QR Scanner


  // Handle Scan to Add Token
  const hitSubmitBottle = async () => {
    if (defaultAccount) {
      try {
        // Set up ethers.js provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Contract details
        const tokenAddress = "0xa2B31B994cCE1B26a32392dC6d6e417965e18651";
        const tokenAbi = [
          "function mint(address to, uint256 amount) public",
          "function approve(address spender, uint256 amount) public returns (bool)",
        ];

        // Create contract instance
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          signer
        );

        setBottleSubmit(true)
        // Perform the mint and approve transactions
        const amount = ethers.utils.parseUnits("10", 18);
        const mintTx = await tokenContract.mint(defaultAccount, amount);
        await mintTx.wait();


        const approveTx = await tokenContract.approve(defaultAccount, amount);
        await approveTx.wait();

        setSuccessSubmit("Bottle submitted and allowance set successfully!");
        
        addTokenToWallet();
      } catch (error: any) {
        console.error("Error processing transaction:", error);
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage("Please connect your wallet.");
    }
  };

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        const tokenAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0xa2B31B994cCE1B26a32392dC6d6e417965e18651",
              symbol: "XOTL",
              decimals: 18,
            },
          },
        });

        if (tokenAdded) {
              setTokenAdded("XOTL added to Wallet")
        } else {
          console.log("Token not added to wallet.");
        }
        
      } catch (error) {
        console.error("Error adding token to wallet:", error);
      }
      setBottleSubmitSuccess(false);
    }
  };


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