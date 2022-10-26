"use client";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const ADDRESS = `Christoph Stenglein
Thalmannsbach 15
4771 Sigharting
manysats@cstenglein.com`;

export default function Legal() {
  const onClickHandler = () => {
    alert(ADDRESS);
  };

  return (
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
  );
}
