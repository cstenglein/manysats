import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Converter from "../components/Converter";
import Footer from "../components/Footer";
import PriceUpdate from "../components/PriceUpdate";
import Title from "../components/Title";
import { PriceData } from "../models/pricedata";

export enum PriceOptions {
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  USD = "USD",
}

const Home: NextPage = () => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/price");
    const data: PriceData = await res.json();
    setPriceData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = async () => {
    await fetchData();
  };

  return (
    <>
      <Head>
        <title>ManySats - Your simple Fiat to Satoshi Converter</title>
        <meta name="description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        {/* OG Image */}
        <meta property="og:url" content="https://manysats.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ManySats" />
        <meta property="og:description" content="Your simple Fiat to Satoshi Converter" />
        <meta property="og:image" content="https://manysats.com/api/og" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="manysats.com" />
        <meta property="twitter:url" content="https://manysats.com/" />
        <meta name="twitter:title" content="ManySats" />
        <meta name="twitter:description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="twitter:image" content="https://manysats.com/api/og" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Title />
      <main className="flex flex-col items-center">
        <Converter priceData={priceData} onRefresh={onRefresh} />
        <PriceUpdate date={priceData?.date?.toString()} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
