import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";

const Converter: FC = () => {
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const formattedInput = input.endsWith(".") ? input : new Intl.NumberFormat("en-US").format(+input);
    setFiatAmount(formattedInput);
    // format output
    const converted = ((+input / price!) * 100_000_000).toFixed(0);
    const formatted = new Intl.NumberFormat("en-US").format(+converted);
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const formattedInput = input.endsWith(".") ? input : new Intl.NumberFormat("en-US").format(+input);
    setSatAmount(formattedInput);
    // format output
    const converted = ((+input * price!) / 100_000_000).toFixed(2);
    const formatted = new Intl.NumberFormat("en-US").format(+converted);
    setFiatAmount(formatted);
  };

  useEffect(() => {
    fetch("/api/price")
      .then((res) => res.json())
      .then((data: number) => {
        setPrice(data);
        setFormattedPrice(
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            currency: "EUR",
          }).format(data)
        );
      });
  }, []);

  return (
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">
        <Image src={"/btc-icon.svg"} height="40px" alt="btcicon" width="40px" /> <span className="ml-2">ManySats</span>
      </h1>
      <h6 className="mb-8 p-8 text-center text-2xl italic text-blue-500">Your simple Fiat to Satoshi Converter</h6>
      <section className="flex w-11/12 flex-col items-center border border-blue-400 bg-white shadow-md md:w-auto">
        {/* price pill */}
        <article className="mx-5 flex w-full justify-start px-2">
          <p className="z-10 -my-5 rounded-full bg-blue-500 p-2 text-sm text-white">{formattedPrice} € / BTC</p>
        </article>
        {/* input 1 */}
        <article className="flex w-full justify-center rounded-t-xl p-10">
          <input
            id="input-fiat"
            className="w-11/12 border-b border-blue-500 p-2 font-mono outline-none focus:shadow-[0_1px_0px_0px_rgba(59,130,246,1)]"
            type="text"
            inputMode="decimal"
            value={fiatAmount}
            onChange={onChangeFiatHandler}
          ></input>
          <label className="w-1/12 p-2" htmlFor="input-fiat">
            €
          </label>
        </article>
        {/* input 2 */}
        <article className="flex w-full justify-center rounded-b-xl p-10">
          <input
            id="input-sat"
            className="w-11/12 border-b border-blue-500 p-2 font-mono outline-none focus:shadow-[0_1px_0px_0px_rgba(59,130,246,1)]"
            type="text"
            inputMode="decimal"
            value={satAmount}
            onChange={onChangeSatHandler}
          ></input>
          <label className="w-1/12 p-2" htmlFor="input-sat">
            SATS
          </label>
        </article>
      </section>
    </main>
  );
};

export default Converter;
