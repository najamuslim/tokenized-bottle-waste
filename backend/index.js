const express = require("express");
const { ethers } = require("ethers");
const app = express();
const port = 3000;

// Replace with your contract addresses and ABI
const tokenAddress = "YOUR_BOTTLE_TOKEN_CONTRACT_ADDRESS";
const nftAddress = "YOUR_BOTTLE_NFT_CONTRACT_ADDRESS";
const abi = []; // Add your ABI here

// Initialize ethers provider and signer
const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const tokenContract = new ethers.Contract(tokenAddress, abi, wallet);
const nftContract = new ethers.Contract(nftAddress, abi, wallet);

app.get("/mint-token", async (req, res) => {
  const { userAddress } = req.query;
  try {
    const tx = await tokenContract.mint(
      userAddress,
      ethers.utils.parseUnits("10", 18)
    );
    await tx.wait();
    res.send("Token minted successfully!");
  } catch (error) {
    res.status(500).send("Error minting token: " + error.message);
  }
});

app.get("/mint-nft", async (req, res) => {
  const { userAddress, tokenURI } = req.query;
  try {
    const tx = await nftContract.mintNFT(userAddress, tokenURI);
    await tx.wait();
    res.send("NFT minted successfully!");
  } catch (error) {
    res.status(500).send("Error minting NFT: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
