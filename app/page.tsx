import Converter from "@/components/Converter";
import Title from "@/components/Title";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Title />
      <Converter />
      <Link href="/imprint" className="mt-5 flex w-full justify-center gap-2 text-sm">
        <button className="cursor-pointer rounded bg-blue-600 p-2 text-white">Imprint</button>
      </Link>
      <p className="p-2 text-blue-600">Lightning Address for tips:</p>
      <QRCodeSVG value="christoph@getalby.com" />
      <span className="text-blue-600 underline">christoph@getalby.com</span>
    </main>
  );
}
