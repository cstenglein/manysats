import Link from "next/link";

type Props = {
  date: string | null | undefined;
  dateKraken: string | null | undefined;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
};

export default function PriceUpdate({ date, dateKraken }: Props) {
  const formattedDate = date ? formatDate(date) : null;
  const formattedDateKraken = dateKraken ? formatDate(dateKraken) : null;

  return (
    <>
      <section className="pt-6 text-sm text-link">
        <div className="p-2">
          <h2 className="font-bold">Last updated:</h2>
          <ul className="list-none">
            {formattedDateKraken && (
              <li>
                USD, EUR, GBP, CAD, JPY:{" "}
                <time className="font-bold" dateTime={dateKraken ?? undefined}>
                  {formattedDateKraken}
                </time>
              </li>
            )}
            {formattedDate && (
              <li>
                Other Currencies:{" "}
                <time className="font-bold" dateTime={date ?? undefined}>
                  {formattedDate}
                </time>
              </li>
            )}
          </ul>
          <h2 className="mt-4 font-bold">Update Frequency</h2>
          <ul className="list-none">
            <li>
              USD, EUR, GBP, CAD, JPY: <span className="font-bold">Every minute</span>
            </li>
            <li>
              Other Currencies: <span className="font-bold">Every day</span>
            </li>
          </ul>
        </div>
      </section>
      <p className="pt-6 text-center text-sm text-link">
        Currency rates provided by{" "}
        <Link className="underline" href="https://www.frankfurter.app">
          Frankfurter API
        </Link>{" "}
        and the{" "}
        <Link className="underline" href="https://docs.kraken.com/rest/">
          Kraken REST API
        </Link>
        .
      </p>
    </>
  );
}
