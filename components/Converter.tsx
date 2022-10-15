import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { getFormatter, getSeparator } from "../utils/utils";
import CurrentPrice from "./CurrentPrice";
import RefreshBtn from "./RefreshBtn";

type Props = {
  price: number | null;
  formattedPrice: string | null;
  onRefresh: () => void;
};

const Converter: FC<Props> = ({ price, formattedPrice, onRefresh }) => {
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const [decimalSep, setDecimalSep] = useState<string>("");
  const inputFiat = useRef<HTMLInputElement | null>(null);

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const FORMATTER = getFormatter(window.navigator.language);
    const regex = new RegExp(`[^0-9${decimalSep}]`, "g");

    let input = event.target.value.replace(regex, "");

    // cut off third decimal place
    if (input.indexOf(decimalSep) > 0) {
      input = input.slice(0, input.indexOf(decimalSep) + 3);
    }

    let floatInput = parseFloat(input.replace(decimalSep, ".")) || 0;

    // format input
    // if input contains a separator (e.g. "200.") then format and add separator again for further input
    const formattedInput = input.endsWith(decimalSep)
      ? `${FORMATTER.format(floatInput)}${decimalSep}`
      : FORMATTER.format(floatInput);
    setFiatAmount(formattedInput);

    // format output
    const converted = ((floatInput / price!) * 100_000_000).toFixed(0);
    const formatted = FORMATTER.format(+converted);
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const FORMATTER = getFormatter(window.navigator.language);

    // format input
    const input = parseFloat(event.target.value.replace(/[^0-9]/g, "")) || 0;
    const formattedInput = FORMATTER.format(input);
    setSatAmount(formattedInput);

    // format output
    const converted = ((input * price!) / 100_000_000).toFixed(2);
    const formatted = FORMATTER.format(+converted);
    setFiatAmount(formatted);
  };

  useEffect(() => {
    if (inputFiat.current) {
      inputFiat.current.focus();
    }
    setDecimalSep(getSeparator(window.navigator.language, "decimal"));
  }, []);

  return (
    <section className="flex w-11/12 flex-col items-center rounded border border-blue-400 bg-white shadow-md md:w-auto">
      <CurrentPrice formattedPrice={formattedPrice} />
      <RefreshBtn onRefresh={onRefresh} />
      {/* input 1 */}
      <article className="flex w-full justify-center rounded-t-xl p-10">
        <input
          ref={inputFiat}
          id="input-fiat"
          className="input-underscore"
          type="text"
          inputMode="decimal"
          value={fiatAmount}
          onChange={onChangeFiatHandler}
        ></input>
        <label className="w-1/12 p-2" htmlFor="input-fiat">
          €
        </label>
      </article>
      {/* input 2 */}
      <article className="flex w-full justify-center rounded-b-xl p-10">
        <input
          id="input-sat"
          className="input-underscore"
          type="text"
          inputMode="decimal"
          value={satAmount}
          onChange={onChangeSatHandler}
        ></input>
        <label className="w-1/12 p-2" htmlFor="input-sat">
          SATS
        </label>
      </article>
    </section>
  );
};

export default Converter;
