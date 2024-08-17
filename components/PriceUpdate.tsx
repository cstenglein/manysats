import Link from "next/link";

type Props = {
  date: string | null | undefined;
  dateKraken: string | null | undefined;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString(window.navigator.language);
};

export default function PriceUpdate({ date, dateKraken }: Props) {
  const formattedDate = date ? formatDate(date) : null;
  const formattedDateKraken = dateKraken ? formatDate(dateKraken) : null;

  return (
    <>
      <article className="pt-6 text-sm text-blue-600">
        <ul className="p-2">
          <li className="font-bold">Last updated:</li>
          <ul className="list-none">
            {formattedDateKraken && (
              <li>
                USD, EUR, GBP, CAD, JPY: <span className="font-bold">{formattedDateKraken}</span>
              </li>
            )}
            {formattedDate && (
              <li>
                Other Currencies: <span className="font-bold">{formattedDate}</span>
              </li>
            )}
          </ul>
          <li className="mt-4 font-bold">Update Frequency</li>
          <ul className="list-none">
            <li>
              USD, EUR, GBP, CAD, JPY: <span className="font-bold">Every minute</span>
            </li>
            <li>
              Other Currencies: <span className="font-bold">Every hour</span>
            </li>
          </ul>
        </ul>
      </article>
      <article className="pt-6 text-center text-sm text-blue-600">
        Currency rates provided by{" "}
        <Link href="https://wahrungsrechner.info/pages/api">
          <span className="cursor-pointer underline">wahrungsrechner.info</span>
        </Link>{" "}
        and the{" "}
        <Link href="https://docs.kraken.com/rest/">
          <span className="cursor-pointer underline">Kraken REST API</span>
        </Link>
        .
      </article>
    </>
  );
}
