import React from 'react';

type Props = {
  priceData: {
    rates: {
      [currencyCode: string]: number;
    };
  };
  selectedCurrency: string;
};

export default function CurrentPrice({ priceData, selectedCurrency }: Props) {
  const calculatePrice = () => {
    const btcRateInUSD = priceData.rates["BTC"] || 1;
    const currencyRateInUSD = priceData.rates[selectedCurrency] || 1;
    return 1 / btcRateInUSD * currencyRateInUSD;
  };

  const price = priceData.rates["BTC"] ? calculatePrice() : undefined;

  const formattedPrice = price
    ? new Intl.NumberFormat(window.navigator.language, {
      style: 'currency',
      currency: selectedCurrency.replace("_DIPRO", "").replace("_DICOM", "").replace("_BLKMKT", ""),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
}