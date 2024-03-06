"use client";
import { FC, useEffect, useState } from "react";

export enum PriceOptions {
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  USD = "USD",
}

type Props = {
  price: number | null;
  selectedCurrency: PriceOptions;
};

const CurrentPrice: FC<Props> = ({ price, selectedCurrency }) => {
  const formattedPrice = price
    ? new Intl.NumberFormat(window.navigator.language, {
        minimumFractionDigits: 2,
        currency: selectedCurrency,
      }).format(price)
    : null;

  return (
    <article className="mx-5 flex w-full justify-start px-2 text-center">
      {!formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 animate-pulse items-center justify-center rounded-full bg-gray-400 p-2 text-sm text-white">
          Loading price... <br /> {selectedCurrency} / BTC
        </p>
      )}
      {formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 items-center justify-center rounded-full bg-blue-600 p-2 text-sm text-white">
          {formattedPrice} <br /> {selectedCurrency} / BTC
        </p>
      )}
    </article>
  );
};

export default CurrentPrice;
