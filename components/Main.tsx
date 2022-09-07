import { ChangeEvent, useEffect, useState } from "react";

const Main = () => {
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const formattedInput = input.endsWith(".") ? input : new Intl.NumberFormat("en-US").format(+input);
    setFiatAmount(formattedInput);
    console.log("CHANGE FIAT", formattedInput);
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
    console.log("CHANGE SAT", formattedInput);
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
      <h1 className="mb-8 p-8 text-4xl">ManySats</h1>
      <section className="flex w-11/12 flex-col items-center text-white shadow-xl md:w-auto">
        <article className="mx-5 flex w-full justify-start px-2">
          <p className="z-10 -my-5 rounded-full bg-blue-500 p-2 text-sm text-white">{formattedPrice} € / BTC</p>
        </article>
        <article className="flex w-full justify-center rounded-t-xl bg-blue-600 p-20">
          <input
            className="border-b border-white bg-blue-600 p-2 outline-none focus:border-white"
            type="text"
            inputMode="decimal"
            value={fiatAmount}
            onChange={onChangeFiatHandler}
          ></input>
          <label className="p-2">€</label>
        </article>
        <article className="flex w-full justify-center rounded-b-xl bg-blue-700 p-20 ">
          <input
            className="border-b border-white bg-blue-700 p-2 outline-none focus:border-white"
            type="text"
            inputMode="decimal"
            value={satAmount}
            onChange={onChangeSatHandler}
          ></input>
          <label className="p-2">SATS</label>
        </article>
      </section>
    </main>
  );
};

export default Main;
