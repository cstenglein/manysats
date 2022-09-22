import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Converter from "../components/Converter";
import Footer from "../components/Footer";
import PriceUpdate from "../components/PriceUpdate";
import Title from "../components/Title";

const Home: NextPage = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/price")
      .then((res) => res.json())
      .then((data: { price: number; date: string }) => {
        setPrice(data.price);
        setDate(data.date);
        setFormattedPrice(
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            currency: "EUR",
          }).format(data.price)
        );
      });
  };

  return (
    <>
      <Head>
        <title>ManySats</title>
        <meta name="description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Title />
      <main className="flex flex-col items-center">
        <Converter price={price} formattedPrice={formattedPrice} />
        <PriceUpdate date={date} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
