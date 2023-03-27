import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { convert } from "../utils/convert";
import { getFormatter, getSeparator } from "../utils/utils";
import CurrentPrice from "./CurrentPrice";
import RefreshBtn from "./RefreshBtn";

type Props = {
  price: number | null;
  formattedPrice: string | null;
  onRefresh: () => void;
};

export enum Unit {
  SAT,
  BTC,
}

const Converter: FC<Props> = ({ price, formattedPrice, onRefresh }) => {
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const [decimalSep, setDecimalSep] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<Unit>(Unit.SAT);

  const regex = new RegExp(`[^0-9${decimalSep}]`, "g");
  const inputFiat = useRef<HTMLInputElement | null>(null);

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!price) {
      return;
    }
    let input = event.target.value.replace(regex, "");

    // cut off third decimal place
    if (input.indexOf(decimalSep) > 0) {
      input = input.slice(0, input.indexOf(decimalSep) + 3);
    }

    let floatInput = parseFloat(input.replace(decimalSep, ".")) || 0;

    // format input
    const INPUT_FORMATTER = getFormatter(window.navigator.language, Unit.SAT);
    // if input contains a separator (e.g. "200.") then format and add separator again for further input
    const formattedInput = input.endsWith(decimalSep)
      ? `${INPUT_FORMATTER.format(floatInput)}${decimalSep}`
      : INPUT_FORMATTER.format(floatInput);
    setFiatAmount(formattedInput);

    // format output
    const OUTPUT_FORMATTER = getFormatter(window.navigator.language, selectedUnit);
    const formatted = OUTPUT_FORMATTER.format(+convert(floatInput, price!, selectedUnit));
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!price) {
      return;
    }
    const FORMATTER = getFormatter(window.navigator.language, selectedUnit);

    // format input
    const input = parseFloat(event.target.value.replace(/[^0-9]/g, "")) || 0;
    const formattedInput = FORMATTER.format(input);
    setSatAmount(formattedInput);

    // format output
    const converted = ((input * price) / 100_000_000).toFixed(2);
    const formatted = FORMATTER.format(+converted);
    setFiatAmount(formatted);
  };

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    let input = fiatAmount.replace(regex, "");
    let floatInput = parseFloat(input.replace(decimalSep, ".")) || 0;

    const FORMATTER = getFormatter(window.navigator.language, +e.target.value);

    const formatted = FORMATTER.format(+convert(floatInput, price!, e.target.value as unknown as Unit));
    setSatAmount(formatted);
    setSelectedUnit(e.target.value as unknown as Unit);
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
          className="input-underline"
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
      <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
        <input
          id="input-sat"
          className="input-underline"
          type="text"
          inputMode="decimal"
          value={satAmount}
          onChange={onChangeSatHandler}
        ></input>
        <select className="bg-white" value={selectedUnit} onChange={onChangeSelect}>
          <option value={Unit.SAT}>SAT</option>
          <option value={Unit.BTC}>BTC</option>
        </select>
      </article>
    </section>
  );
};

export default Converter;
