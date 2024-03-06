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
      {!formattedDate && <p className="my-2 w-full bg-gray-400 animate-pulse h-5 rounded-md"></p>}
      <p className="p-2">
        Price Data from the{" "}
        <Link href="https://docs.kraken.com/rest/">
          <span className="cursor-pointer underline">Kraken REST API</span>
        </Link>
      </p>
    </article>
  );
};

export default PriceUpdate;
