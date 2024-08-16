
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./assets/css/globals.css";
import "./assets/css/topcontent.css";
import "./assets/css/QR.css";
import "./assets/css/Store.css";
import "./assets/css/NFT.css";
import "./assets/css/Challenges.css";
import "./assets/css/Leaderboard.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xottle",
  description: "dApp",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode}>) {
  return (
    <html>
    <head>
      <link rel="icon" type="image/x-icon" href="/icon.ico" sizes="any" />
    </head>
        <body className={inter.className}>{children}</body>
    </html>
  );
}
