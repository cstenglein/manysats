import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="mt-5 flex w-full justify-center gap-2 text-sm">
      <Link href="/faq">
        <button className="cursor-pointer rounded bg-blue-500 p-2 text-white">FAQ</button>
      </Link>
      <Link href="/legal">
        <button className="cursor-pointer rounded bg-blue-500 p-2 text-white">Legal</button>
      </Link>
    </footer>
  );
};

export default Footer;
