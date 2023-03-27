import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { convertBtcToFiat, convertFiatToBtc } from "../utils/convert";
import { getSeparator } from "../utils/utils";
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

  const inputFiat = useRef<HTMLInputElement | null>(null);

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!price) {
      return;
    }

    setFiatAmount(event.target.value);
    setSatAmount(convertFiatToBtc(+event.target.value.replace(/,/g, ""), price!, selectedUnit));
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!price) {
      return;
    }

    setSatAmount(event.target.value);
    setFiatAmount(convertBtcToFiat(+event.target.value.replace(/,/g, ""), price!, selectedUnit));
  };

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSatAmount(convertFiatToBtc(+fiatAmount.replace(/,/g, ""), price!, e.target.value as unknown as Unit));
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
        <NumericFormat
          id="input-fiat"
          className="input-underline"
          value={fiatAmount}
          thousandSeparator=","
          getInputRef={inputFiat}
          onChange={onChangeFiatHandler}
        />
        <label className="w-1/12 p-2" htmlFor="input-fiat">
          €
        </label>
      </article>
      {/* input 2 */}
      <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
        <NumericFormat
          id="input-sat"
          className="input-underline"
          value={satAmount}
          thousandSeparator=","
          onChange={onChangeSatHandler}
        />
        <select className="bg-white" value={selectedUnit} onChange={onChangeSelect}>
          <option value={Unit.SAT}>SAT</option>
          <option value={Unit.BTC}>BTC</option>
        </select>
      </article>
    </section>
  );
};

export default Converter;
