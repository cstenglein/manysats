import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 flex w-full justify-center pb-2 text-sm">
      <Link href="/bla">Legal</Link>
    </footer>
  );
};

export default Footer;
