import { NextResponse } from "next/server";
import { userBottleCounts } from "../mint-token/route";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("userAddress");
  const totalBottles = userAddress ? userBottleCounts[userAddress] || 0 : 0;
  return NextResponse.json({ totalBottles });
}
