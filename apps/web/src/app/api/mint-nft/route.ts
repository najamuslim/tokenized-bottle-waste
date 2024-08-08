import { NextResponse } from "next/server";
import { ethers } from "ethers";
import nftJson from "../../../../../../out/BottleToken.sol/XottleNFT.json";

const provider = new ethers.providers.JsonRpcProvider(
  `https://lisk-testnet.gateway.tatum.io`
);
const wallet = new ethers.Wallet(
  process.env.LISK_TESTNET_PRIVATE_KEY as string,
  provider
);

const nftAddress = "0x528c65289e793eD3fc089B20159574B5bf990bFD";
const nftContract = new ethers.Contract(nftAddress, nftJson.abi, wallet);

export async function POST(req: Request): Promise<Response> {
  const { userAddress, tokenURI } = await req.json();
  try {
    const tx = await nftContract.safeMint(userAddress, tokenURI, {
      gasLimit: 1000000,
    });
    const receipt = await tx.wait();

    const event = receipt.events.find(
      (event: any) => event.event === "Transfer"
    );
    const tokenId = event.args.tokenId;

    return NextResponse.json({
      message: "NFT minted successfully!",
      tokenId: tokenId.toString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error minting NFT: " + error.message },
      { status: 500 }
    );
  }
}
