"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Converter from "../components/Converter";
import Footer from "../components/Footer";
import PriceUpdate from "../components/PriceUpdate";
import Title from "../components/Title";

export default function Home() {
  const [price, setPrice] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/price");
    const data: { price: number; date: string } = await res.json();

    setPrice(data.price);
    setDate(data.date);
    setFormattedPrice(
      new Intl.NumberFormat(window.navigator.language, {
        minimumFractionDigits: 2,
        currency: "EUR",
      }).format(data.price)
    );
  };

  const onRefresh = async () => {
    await fetchData();
  };

  return (
    <>
      <Head>
        <title>ManySats - Your simple Fiat to Satoshi Converter</title>
      </Head>
      <Title />
      <main className="flex flex-col items-center">
        <Converter price={price} formattedPrice={formattedPrice} onRefresh={onRefresh} />
        <PriceUpdate date={date} />
      </main>
      <Footer />
    </>
  );
}
