import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userAddress = searchParams.get("userAddress");
  const response = await fetch(
    `http://localhost:3000/mint-token?userAddress=${userAddress}`
  );
  const data = await response.text();
  return new Response(data);
}
