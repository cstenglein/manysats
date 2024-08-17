"use client";
import { useConverter } from "@/hooks/useConverter";
import { FC } from "react";
import CurrentPrice from "./CurrentPrice";
import FiatInput from "./FiatInput";
import NumberInput from "./NumberInput";
import PriceUpdate from "./PriceUpdate";
import RefreshBtn from "./RefreshBtn";

const Converter: FC = () => {
  const {
    error,
    priceData,
    amounts,
    selectedCurrency,
    onRefresh,
    onCurrencyChange,
    onChangeFiatHandler,
    onChangeSatHandler,
    onChangeBtcHandler,
  } = useConverter();

  return (
    <>
      <section className="flex w-11/12 flex-col items-center rounded border border-blue-400 bg-white shadow-md md:w-auto">
        <CurrentPrice priceData={priceData} selectedCurrency={selectedCurrency} />
        <RefreshBtn onRefresh={onRefresh} />
        <FiatInput
          fiatAmount={amounts.fiat}
          onChangeFiatHandler={onChangeFiatHandler}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
        />
        <NumberInput id="input-sat" amount={amounts.sat} onChange={onChangeSatHandler} label="SAT" />
        <NumberInput id="input-btc" amount={amounts.btc} onChange={onChangeBtcHandler} label="BTC" />
      </section>
      {!error && <PriceUpdate date={priceData.lastupdate.toString()} />}
      {error && <p className="pt-6 text-sm text-red-500">Failed to fetch price data. Please try again later</p>}
    </>
  );
};

export default Converter;
