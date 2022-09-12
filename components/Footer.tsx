import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 flex w-full justify-center gap-2 rounded-t  text-sm">
      <Link href="/faq">
        <button className="cursor-pointer rounded-t bg-blue-500 p-2 text-white">FAQ</button>
      </Link>
      <Link href="/legal">
        <button className="cursor-pointer rounded-t bg-blue-500 p-2 text-white">Legal</button>
      </Link>
    </footer>
  );
};

export default Footer;
