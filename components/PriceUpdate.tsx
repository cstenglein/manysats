import Link from "next/link";
import { FC, useEffect, useState } from "react";

type Props = {
  date: string | null;
};

const PriceUpdate: FC<Props> = ({ date }) => {
  const [secRemaining, setSecRemaining] = useState();
  useEffect(() => {}, []);

  return (
    <article className="pt-6 text-center text-sm text-blue-500">
      {/* <p className="p-2">Price from {date}</p>
      <p className="p-2">Next Update in {secRemaining}s</p> */}
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
