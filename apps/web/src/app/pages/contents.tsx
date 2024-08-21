"use client";

import Image from "next/legacy/image";

const Content_Area = () => {

  return (
    <>
      <div className="h-t-contents bg-blue-800 py-16 relative mb-10">
        <hr
          className="line-top-br"
        />
        <h2 id="txt-3-s"
          style={{ fontSize: 50, padding: 40 }}
          className="text-center text-white text-5xl font-bold mb-12"
        >
          How It Works
        </h2>
        <div className="b-t-contents">
        <div className="icon-bt-3">
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <Image
              src="https://xottle.asia/images/scan.png"
              alt="Scan"
              className="mx-auto mb-4"
              width={260}
              height={260}
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <Image
              src="/images/throw.png"
              alt="Deposit"
              className="mx-auto mb-4"
              width={260}
              height={260}
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <Image
              src="https://xottle.asia/images/earn.png"
              alt="Earn"
              className="mx-auto mb-4"
              width={260}
              height={260}
              objectFit="contain"
            />
          </div>
        </div>
        <div
          className="p-bt-3"
        >
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Scan</h3>
            <p className="text-base md:text-lg">
              Use your smartphone to scan the QR code on the bottle
            </p>
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Deposit</h3>
            <p className="text-base md:text-lg">
              Deposit the bottle into a Xottle vending machine
            </p>
          </div>
          <div className="flex flex-col items-center text-center text-white flex-1 px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Earn</h3>
            <p className="text-base md:text-lg">
              Earn $XOTL rewards for exclusive benefits, trade, vouchers, or
              products
            </p>
          </div>
        </div>
        </div>
      </div>

      <div
        className="c-bottom py-16 mt-10 mx-10"
        style={{ padding: "40px" }}
      >
        <h2
          className="text-center text-black text-6xl md:text-7xl mb-12 px-10"
          style={{ padding: "20px", fontSize: 40 }}
        >
          Do More <span style={{ fontWeight: "bold" }}>Get More</span>
        </h2>
        <p
          className="text-center text-lg md:text-xl leading-relaxed mb-12 mx-auto max-w-4xl px-10"
          style={{ paddingBottom: "20px" }}
        >
          Earn $XOTL to trade for other cryptocurrencies, vouchers, or products.
          Unlock exclusive perks by staking more $XOTL and enjoy benefits like
          VIP airport lounge access, special discounts, free tickets, insurance,
          and more as you reach higher levels of $XOTL holdings.
          <br />
          <br />
          <strong>The more you hold, the more you gain!</strong>
        </p>
        <div className="f-tr-img">
            <Image
              src="https://xottle.asia/images/domore.png"
              alt="do more"
              width={850}
              height={370}
            />
        </div>
      </div>
    </>
  );
};

export default Content_Area;
