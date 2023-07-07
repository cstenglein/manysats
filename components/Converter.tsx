import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { PriceData } from "../models/pricedata";
import { PriceOptions } from "../pages";
import { convertBtcToFiat, convertFiatToBtc } from "../utils/convert";
import CurrentPrice from "./CurrentPrice";
import RefreshBtn from "./RefreshBtn";

type Props = {
  priceData: PriceData | null;
  onRefresh: () => void;
};

export enum Unit {
  SAT,
  BTC,
}

const Converter: FC<Props> = ({ priceData, onRefresh }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const inputFiat = useRef<HTMLInputElement | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<PriceOptions>(PriceOptions.EUR);
  const [selectedUnit, setSelectedUnit] = useState<Unit>(Unit.SAT);

  const getPriceData = useCallback((priceData: PriceData, selectedCurrency: PriceOptions): number => {
    switch (selectedCurrency) {
      case PriceOptions.EUR:
        return priceData.pairs.XXBTZEUR!;
      case PriceOptions.GBP:
        return priceData.pairs.XXBTZGBP!;
      case PriceOptions.JPY:
        return priceData.pairs.XXBTZJPY!;
      case PriceOptions.USD:
        return priceData.pairs.XXBTZUSD!;
    }
  }, []);

  useEffect(() => {
    if (!priceData) {
      return;
    }
    setPrice(getPriceData(priceData, selectedCurrency));

    setFormattedPrice(
      new Intl.NumberFormat(window.navigator.language, {
        minimumFractionDigits: 2,
        currency: selectedCurrency,
      }).format(price!)
    );
  }, [price, priceData, selectedCurrency, getPriceData]);

  useEffect(() => {
    if (inputFiat.current) {
      inputFiat.current.focus();
    }
  }, []);

  const onCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (!priceData) {
      return;
    }

    const selectedCurr = PriceOptions[e.target.value as PriceOptions];
    setSelectedCurrency(selectedCurr);
    const currPrice = getPriceData(priceData, selectedCurr);

    setSatAmount(convertFiatToBtc(+fiatAmount, currPrice, selectedUnit));
  };

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

  return (
    <section className="flex w-11/12 flex-col items-center rounded border border-blue-400 bg-white shadow-md md:w-auto">
      <CurrentPrice formattedPrice={formattedPrice} selectedCurrency={selectedCurrency} />
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
        <select className="bg-white" value={selectedCurrency} onChange={onCurrencyChange}>
          <option value={PriceOptions.EUR}>EUR</option>
          <option value={PriceOptions.GBP}>GBP</option>
          <option value={PriceOptions.JPY}>JPY</option>
          <option value={PriceOptions.USD}>USD</option>
        </select>
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
