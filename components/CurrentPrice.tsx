import React from "react";
import { ExchangeRatesResponse } from "@/models/exchangeRateResponse";
import { getBtcPrice } from "@/utils/convert";

type Props = {
  priceData: ExchangeRatesResponse;
  selectedCurrency: string;
};

export default function CurrentPrice({ priceData, selectedCurrency }: Props) {
  const price = priceData.rates["BTC"] ? getBtcPrice(priceData, selectedCurrency) : undefined;

  const formattedPrice = price
    ? new Intl.NumberFormat(window.navigator.language, {
        style: "currency",
        //replace everything after "_"
        currency: selectedCurrency.split("_")[0],
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
    : null;

  return (
    <article className="mx-5 flex w-full justify-start px-2 text-center">
      {!formattedPrice && (
        <p className="relative -top-2 z-10 -my-5 flex w-5/12 animate-pulse items-center justify-center rounded-full bg-muted p-2 text-sm text-primary-foreground">
          Loading price... <br /> {selectedCurrency} / BTC
        </p>
      )}
      {formattedPrice && (
        <p className="relative -top-2 z-10 -my-5 flex w-5/12 items-center justify-center rounded-full bg-primary p-2 text-sm font-semibold text-primary-foreground">
          {formattedPrice} <br /> {selectedCurrency} / BTC
        </p>
      )}
    </article>
  );
}
