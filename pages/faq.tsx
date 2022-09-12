import { NextPage } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const ADDRESS = `Christoph Stenglein
Thalmannsbach 15
4771 Sigharting
manysats@cstenglein.com`;

const FAQ: NextPage = () => {
  const onClickHandler = () => {
    alert(ADDRESS);
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">FAQ</h1>

      <section className="flex h-screen flex-col gap-4 pt-10">
        <p>FAQ is not yet finished :) Please come back later</p>

        <Link href="/">
          <button className="rounded-t bg-blue-500 p-2 text-white">
            <ArrowLeftIcon className="inline h-5 w-5" /> Back to Home
          </button>
        </Link>
      </section>
    </main>
  );
};

export default FAQ;
