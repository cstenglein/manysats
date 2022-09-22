import type { NextPage } from "next";
import Head from "next/head";
import Converter from "../components/Converter";
import Footer from "../components/Footer";
import Title from "../components/Title";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ManySats</title>
        <meta name="description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className="flex flex-col items-center">
        <Title />
        <Converter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
