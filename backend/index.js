const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

app.use(express.json());

dotenv.config();

const tokenAddress = "0xCa4972A5EE99d35e8D3E827Dce8C8B9870BaEBc4";
const nftAddress = "0x528c65289e793eD3fc089B20159574B5bf990bFD";
const tokenJson = require("../out/BottleToken.sol/XottleToken.json");
const nftJson = require("../out/BottleToken.sol/XottleNFT.json");

const tokenAbi = tokenJson.abi;
const nftAbi = nftJson.abi;

const provider = new ethers.providers.JsonRpcProvider(
  `https://lisk-testnet.gateway.tatum.io`
);
const wallet = new ethers.Wallet(
  process.env.LISK_TESTNET_PRIVATE_KEY,
  provider
);

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);
const nftContract = new ethers.Contract(nftAddress, nftAbi, wallet);

const userBottleCounts = {};

app.post("/submit-bottle", async (req, res) => {
  const { userAddress, amount, spenderAddress } = req.body;
  try {
    const mintTx = await tokenContract.mint(
      userAddress,
      ethers.utils.parseUnits(amount, 18),
      {
        gasLimit: 1000000,
      }
    );
    await mintTx.wait();

    const approveTx = await tokenContract.approve(
      spenderAddress,
      ethers.utils.parseUnits(amount, 18),
      {
        gasLimit: 1000000,
      }
    );
    await approveTx.wait();

    if (!userBottleCounts[userAddress]) {
      userBottleCounts[userAddress] = 0;
    }
    userBottleCounts[userAddress] += parseInt(amount);

    res.send("Token minted and allowance set successfully!");
  } catch (error) {
    res.status(500).send("Error processing request: " + error.message);
  }
});

app.post("/purchase-merchandise", async (req, res) => {
  const { userAddress, amount } = req.body;
  try {
    const tx = await tokenContract.transferFrom(
      userAddress,
      wallet.address,
      ethers.utils.parseUnits(amount, 18)
    );
    await tx.wait();
    res.send("Purchase successful!");
  } catch (error) {
    res.status(500).send("Error purchasing merchandise: " + error.message);
  }
});

app.post("/mint-nft", async (req, res) => {
  const { userAddress, tokenURI } = req.body;
  try {
    const tx = await nftContract.safeMint(userAddress, tokenURI, {
      gasLimit: 1000000,
    });
    await tx.wait();
    res.send("NFT minted successfully!");
  } catch (error) {
    res.status(500).send("Error minting NFT: " + error.message);
  }
});

app.get("/get-total-bottles/:userAddress", (req, res) => {
  const userAddress = req.params.userAddress;
  const totalBottles = userBottleCounts[userAddress] || 0;
  res.json({ totalBottles });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
