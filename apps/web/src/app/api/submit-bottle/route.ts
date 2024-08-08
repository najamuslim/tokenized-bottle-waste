import { NextResponse } from "next/server";
import { ethers } from "ethers";
import tokenJson from "../../../../../../out/BottleToken.sol/XottleToken.json";

const provider = new ethers.providers.JsonRpcProvider(
  `https://lisk-sepolia.drpc.org/`
);
const wallet = new ethers.Wallet(
  process.env.LISK_TESTNET_PRIVATE_KEY as string,
  provider
);

console.log(process.env.LISK_TESTNET_PRIVATE_KEY);
if (!provider || !process.env.LISK_TESTNET_PRIVATE_KEY) {
  throw new Error(
    "Environment variables LISK_TESTNET_RPC_URL and LISK_TESTNET_PRIVATE_KEY must be set"
  );
}

const tokenAddress = "0xCB7220aFd984F6377104F731676bB67Fb170a9Dd";
const tokenContract = new ethers.Contract(tokenAddress, tokenJson.abi, wallet);

export const userBottleCounts: Record<string, number> = {};

export async function POST(req: Request): Promise<Response> {
  const { userAddress, amount, spenderAddress } = await req.json();
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

    return NextResponse.json({
      message: "Token minted and allowance set successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error processing request: " + error.message },
      { status: 500 }
    );
  }
}
