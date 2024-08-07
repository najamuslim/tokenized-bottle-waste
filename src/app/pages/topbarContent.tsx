"use client"

import { Scanner } from '@yudiel/react-qr-scanner';
import React, { useState } from 'react';



const Content_top = () => {

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = () => {
    setIsButtonClicked(true);
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