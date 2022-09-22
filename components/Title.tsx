import Link from "next/link";
import { FC } from "react";
import Image from "next/image";

const Title: FC = () => {
  return (
    <>
      <h1 className="mb-2 mt-4 flex items-center justify-center p-4 text-4xl">
        <Image src={"/btc-icon.svg"} height="40px" alt="btcicon" width="40px" />
        <span className="ml-2">ManySats</span>
      </h1>
      <h6 className="mb-8 p-8 text-center text-2xl italic text-blue-500">Your simple Fiat to Satoshi Converter</h6>
    </>
  );
};

export default Title;
