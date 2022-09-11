import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 flex w-full justify-center text-sm">
      <Link href="/legal">
        <span className="cursor-pointer rounded-t bg-blue-500 p-2 text-white">Legal</span>
      </Link>
    </footer>
  );
};

export default Footer;
