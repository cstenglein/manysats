import Converter from "@/components/Converter";
import Title from "@/components/Title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Title />
      <main className="flex flex-col items-center">
        <Converter />
      </main>
      <Link href="/imprint" className="mt-5 flex w-full justify-center gap-2 text-sm">
        <button className="cursor-pointer rounded bg-blue-600 p-2 text-white">Imprint</button>
      </Link>
    </>
  );
}
