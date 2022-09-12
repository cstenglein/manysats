import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
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
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">Legal</h1>

      <section className="flex h-screen flex-col gap-4 pt-10">
        <button
          className="flex items-center justify-center rounded bg-blue-500 p-2 text-white"
          onClick={onClickHandler}
        >
          <UserCircleIcon className="mr-1 inline h-5 w-5" />
          <span>Show Contact Details</span>
        </button>

        <Link href="/">
          <button className="flex items-center justify-center rounded-t bg-blue-500 p-2 text-white">
            <ArrowLeftIcon className="mr-1 inline h-5 w-5" /> <span>Back to Home</span>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Legal;
