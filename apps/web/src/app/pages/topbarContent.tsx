"use client"

import { Scanner } from '@yudiel/react-qr-scanner';
import React, { useState } from 'react';






const Content_top = () => {

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const handleScan = async (result: any) => {
    if (result) {
      setScanResult(result.text);
  
      const amount = "1"; // Example bottle amount
  
      if (userAddress) {
        try {
          const response = await fetch("/api/submit-bottle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userAddress,
              amount,
              spenderAddress: userAddress,
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            setMessage("Bottle submitted successfully!");
          } else {
            const errorData = await response.json();
            //setMessage(Error: ${errorData.error});
            console.log("error")
          }
        } catch (error: any) {
          //setMessage(Error: ${error.message});
        }
      } else {
        setMessage("Please connect your wallet.");
      }
    }
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = () => {
    setIsButtonClicked(true);
    handleScan(scanResult);
  };

  return (
    <div id="container">
      <h1 className="mb-6">
        Exchange Your <b>Bottle</b> Into
      </h1>
      <div className="text-lg mb-4">$XOT</div>
      {!isButtonClicked ? (
        <button onClick={handleClick}>Scan Now</button>
      ) : (
        <div id='CamScan'>
          <Scanner onScan={(result) => console.log(result)} />
        </div>
      )}
    </div>
  );
}

export default Content_top;