import { NextResponse } from "next/server";
import { ethers } from "ethers";
import tokenJson from "../../../../../../out/BottleToken.sol/XottleToken.json";

const provider = new ethers.providers.JsonRpcProvider(
  `https://lisk-testnet.gateway.tatum.io`
);
const wallet = new ethers.Wallet(
  process.env.LISK_TESTNET_PRIVATE_KEY as string,
  provider
);

const tokenAddress = "0xCa4972A5EE99d35e8D3E827Dce8C8B9870BaEBc4";
const tokenContract = new ethers.Contract(tokenAddress, tokenJson.abi, wallet);

export async function POST(req: Request): Promise<Response> {
  const { userAddress, amount } = await req.json();
  try {
    const tx = await tokenContract.transferFrom(
      userAddress,
      wallet.address,
      ethers.utils.parseUnits(amount, 18),
      {
        gasLimit: 1000000,
      }
    );
    await tx.wait();
    return NextResponse.json({ message: "Purchase successful!" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error purchasing merchandise: " + error.message },
      { status: 500 }
    );
  }
}
