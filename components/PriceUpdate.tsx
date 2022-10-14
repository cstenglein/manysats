import Link from "next/link";
import { FC } from "react";

type Props = {
  date: string | null;
};

const PriceUpdate: FC<Props> = ({ date }) => {
  const formattedDate = date ? new Date(date).toLocaleString(window.navigator.language) : null;

  return (
    <article className="pt-6 text-sm text-blue-600">
      {formattedDate && <p className="p-2">Price from {formattedDate}</p>}
      {!formattedDate && <p className="p-2">Date not available</p>}
      {/* <p className="p-2">Next Update in {secRemaining}s</p> */}
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
