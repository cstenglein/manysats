"use client";
import { PriceData } from "@/models/pricedata";
import {
  convertBtcToFiat,
  convertBtcToSat,
  convertFiatToBtc,
  convertFiatToSat,
  convertSatToBtc,
  convertSatToFiat,
} from "@/utils/convert";
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import CurrentPrice, { PriceOptions } from "./CurrentPrice";
import PriceUpdate from "./PriceUpdate";
import RefreshBtn from "./RefreshBtn";

export enum Unit {
  SAT,
  BTC,
}

const Converter: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<{ fiat: string; sat: string; btc: string }>({
    fiat: "",
    sat: "",
    btc: "",
  });
  const inputFiat = useRef<HTMLInputElement | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<PriceOptions>(PriceOptions.EUR);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/price");
    const data: PriceData = await res.json();
    return data;
  }, []);

  const validateData = useCallback(
    (data: PriceData) => {
      setPriceData(data);
      setPrice(data[selectedCurrency]);
    },
    [selectedCurrency],
  );

  useEffect(() => {
    fetchData()
      .then(validateData)
      .catch(() => setError(true));

    if (inputFiat.current) {
      inputFiat.current.focus();
    }
  }, [fetchData, selectedCurrency, price, validateData]);

  const onRefresh = async () => {
    setError(false);
    await fetchData();
  };

  const onCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    event.preventDefault();

    const selectedCurrency = PriceOptions[event.target.value as keyof typeof PriceOptions];
    setSelectedCurrency(selectedCurrency);
    const price = priceData![selectedCurrency];

    setAmounts({
      ...amounts,
      sat: convertFiatToSat(amounts.fiat, price),
      btc: convertFiatToBtc(amounts.fiat, price),
    });
  };

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fiatAmount = event.target.value;

    setAmounts({
      ...amounts,
      fiat: fiatAmount,
      sat: convertFiatToSat(fiatAmount, price!),
      btc: convertFiatToBtc(fiatAmount, price!),
    });
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const satAmount = event.target.value;

    setAmounts({
      ...amounts,
      fiat: convertSatToFiat(satAmount, price!),
      sat: satAmount,
      btc: convertSatToBtc(satAmount),
    });
  };

  const onChangeBtcHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const btcAmount = event.target.value;

    setAmounts({
      ...amounts,
      fiat: convertBtcToFiat(btcAmount, price!),
      sat: convertBtcToSat(btcAmount),
      btc: btcAmount,
    });
  };

  return (
    <>
      <section className="flex w-11/12 flex-col items-center rounded border border-blue-400 bg-white shadow-md md:w-auto">
        <CurrentPrice price={price!} selectedCurrency={selectedCurrency} />
        <RefreshBtn onRefresh={onRefresh} />
        <article className="flex w-full items-center justify-center gap-2 rounded-b-xl pl-10 py-10 pr-5">
          <NumericFormat
            id="input-fiat"
            className="input-underline"
            value={amounts.fiat}
            thousandSeparator=","
            getInputRef={inputFiat}
            onChange={onChangeFiatHandler}
          />
          <select className="bg-white" value={selectedCurrency} onChange={onCurrencyChange} disabled={!price}>
            <option value={PriceOptions.EUR}>EUR</option>
            <option value={PriceOptions.GBP}>GBP</option>
            <option value={PriceOptions.JPY}>JPY</option>
            <option value={PriceOptions.USD}>USD</option>
          </select>
        </article>
        <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
          <NumericFormat
            id="input-sat"
            className="input-underline"
            value={amounts.sat}
            thousandSeparator=","
            onChange={onChangeSatHandler}
          />
          <span className="bg-white">SAT</span>
        </article>
        <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
          <NumericFormat
            id="input-btc"
            className="input-underline"
            value={amounts.btc}
            thousandSeparator=","
            onChange={onChangeBtcHandler}
          />
          <span className="bg-white">BTC</span>
        </article>
      </section>
      {!error && <PriceUpdate date={priceData?.date?.toString()} />}
      {error && <p className="pt-6 text-sm text-red-500">Failed to fetch price data. Please try again later</p>}
    </>
  );
};

export default Converter;
