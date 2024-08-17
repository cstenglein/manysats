import Link from "next/link";
import { FC } from "react";

type Props = {
  date: string | null | undefined;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString(window.navigator.language);
};

const PriceUpdate: FC<Props> = ({ date }) => {
  const formattedDate = date ? formatDate(date) : null;

  return (
    <article className="pt-6 text-sm text-blue-600">
      {formattedDate && <p className="p-2">Price from {formattedDate}</p>}
      <p className="p-2">Price data can be refreshed every minute for USD, EUR, GBP, CAD & JPY</p>
      <p className="p-2">Price data for the other currencies will be refreshed every hour</p>
      {!formattedDate && <p className="my-2 h-5 w-full animate-pulse rounded-md bg-gray-400"></p>}
      <p className="p-2">
        Price Data from{" "}
        <Link href="https://wahrungsrechner.info/pages/api">
          <span className="cursor-pointer underline">wahrungsrechner.info</span>
        </Link>{" "}
        and the{" "}
        <Link href="https://docs.kraken.com/rest/">
          <span className="cursor-pointer underline">Kraken REST API</span>
        </Link>
      </p>
    </article>
  );
};

export default PriceUpdate;
