import type { NextPage } from "next";
import Head from "next/head";
import Converter from "../components/Converter";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ManySats</title>
        <meta name="description" content="Fiat to Satoshi Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Converter />
      <Footer />
    </>
  );
};

export default Home;
