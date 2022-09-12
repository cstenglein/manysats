import Link from "next/link";
import { FC } from "react";

const PriceUpdate: FC = () => {
  return (
    <article className="pt-14 text-center text-sm text-blue-500">
      <p className="p-2">Price from 2022-09-10T16:06:55.904Z</p>
      <p className="p-2">Next Update in 20s</p>
      <p className="p-2">
        Price Data from the{" "}
        <Link href="https://docs.kraken.com/rest/">
          <span className="underline">Kraken REST API</span>
        </Link>
      </p>
    </article>
  );
};

export default PriceUpdate;
