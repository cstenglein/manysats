import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Legal: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const onClickHandler = () => {
    alert(props.contact);
  };

  return (
    <>
      <Head>
        <title>ManySats - Imprint</title>
        <meta name="description" content="Manysats - Imprint" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        {/* OG Image */}
        <meta name="og:title" content="ManySats" />
        <meta name="og:description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="og:image" content="https://manysats.com/api/og" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gray-100">
        <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">Imprint</h1>

        <section className="flex h-screen flex-col gap-4 pt-10">
          <button
            className="flex items-center justify-center rounded bg-blue-600 p-2 text-white"
            onClick={onClickHandler}
          >
            <UserCircleIcon className="mr-1 inline h-5 w-5" />
            <span>Show Contact Details</span>
          </button>

          <button className="flex items-center justify-center rounded-t bg-blue-600 p-2 text-white">
            <Link href="/">
              <ArrowLeftIcon className="mr-1 inline h-5 w-5" /> <span>Back to Home</span>
            </Link>
          </button>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { contact: process.env.CONTACT_DETAILS || null } };
};
export default Legal;
