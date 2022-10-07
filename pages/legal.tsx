import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const ADDRESS = `Christoph Stenglein
Thalmannsbach 15
4771 Sigharting
manysats@cstenglein.com`;

const Legal: NextPage = () => {
  const onClickHandler = () => {
    alert(ADDRESS);
  };

  return (
    <>
      <Head>
        <title>ManySats - Imprint</title>
        <meta name="description" content="Manysats - Imprint" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gray-100">
        <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">Legal</h1>

        <section className="flex h-screen flex-col gap-4 pt-10">
          <button
            className="flex items-center justify-center rounded bg-blue-600 p-2 text-white"
            onClick={onClickHandler}
          >
            <UserCircleIcon className="mr-1 inline h-5 w-5" />
            <span>Show Contact Details</span>
          </button>

          <Link href="/">
            <button className="flex items-center justify-center rounded-t bg-blue-600 p-2 text-white">
              <ArrowLeftIcon className="mr-1 inline h-5 w-5" /> <span>Back to Home</span>
            </button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Legal;
