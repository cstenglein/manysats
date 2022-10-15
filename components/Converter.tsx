import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { getSeparator } from "../utils/utils";
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
    const FORMATTER = Intl.NumberFormat(window.navigator.language);
    const REGEX = new RegExp(`[^0-9${decimalSep}]`, "g");
    let input = event.target.value.replace(REGEX, "");
    if (input.indexOf(".") > 0) {
      input = input.slice(0, input.indexOf(".") + 3);
    }
    const formattedInput = input.endsWith(decimalSep)
      ? FORMATTER.format(parseFloat(input)) + decimalSep
      : FORMATTER.format(+input.replace(decimalSep, "."));
    setFiatAmount(formattedInput);
    // format output
    const converted = ((parseFloat(input) / price!) * 100_000_000).toFixed(0);
    const formatted = FORMATTER.format(+converted);
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const FORMATTER = Intl.NumberFormat(window.navigator.language);
    const REGEX = new RegExp(`[^0-9]`, "g");
    const input = event.target.value.replace(REGEX, "");
    const formattedInput = input.endsWith(decimalSep)
      ? FORMATTER.format(parseFloat(input)) + decimalSep
      : FORMATTER.format(+input.replace(decimalSep, "."));
    setSatAmount(formattedInput);
    // format output
    const converted = ((parseFloat(input) * price!) / 100_000_000).toFixed(2);
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
