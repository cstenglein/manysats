import Image from "next/image";

export default function Title() {
  return (
    <>
      <h1 className="mt-8 mb-2 flex items-center justify-center p-4 text-4xl">
        <Image src="/btc-icon.svg" height={40} alt="Bitcoin Icon" width={40} />
        <span className="ml-2">ManySats</span>
      </h1>
      <h2 className="mb-8 px-8 py-4 text-center text-2xl text-link italic">Your simple Fiat to Satoshi Converter</h2>
    </>
  );
}
