import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/Main';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ManySats</title>
        <meta name='description' content='Fiat to Satoshi Converter' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main />
    </div>
  );
};

export default Home;
