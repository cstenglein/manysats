import ContactButton from "@/components/ContactButton";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ManySats | Imprint",
};

export default function Imprint() {
  return (
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">Imprint</h1>

      <section className="flex h-screen flex-col gap-4 pt-10">
        <ContactButton contact={process.env.CONTACT_DETAILS} />
        <button className="flex items-center justify-center rounded-t bg-blue-600 p-2 text-white">
          <Link href="/">
            <ArrowLeftIcon className="mr-1 inline h-5 w-5" /> <span>Back to Home</span>
          </Link>
        </button>
      </section>
    </main>
  );
}
