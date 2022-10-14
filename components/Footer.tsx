import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="mt-5 flex w-full justify-center gap-2 text-sm">
      {/* <Link href="/faq">
        <button className="cursor-pointer rounded bg-blue-600 p-2 text-white">FAQ</button>
      </Link> */}
      <Link href="/imprint">
        <button className="cursor-pointer rounded bg-blue-600 p-2 text-white">Imprint</button>
      </Link>
    </footer>
  );
};

export default Footer;
