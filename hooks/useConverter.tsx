import { useEffect, useState } from "react";
import { isExchangeRatesResponse } from "@/models/exchangeRateResponse";
import type { ExchangeRatesResponse } from "@/models/exchangeRateResponse";
import {
  convertBtcToFiat,
  convertBtcToSat,
  convertFiatToBtc,
  convertFiatToSat,
  convertSatToBtc,
  convertSatToFiat,
  getBtcPrice,
} from "@/utils/convert";

type Amounts = {
  fiat: string;
  sat: string;
  btc: string;
};

const emptyPriceData: ExchangeRatesResponse = {
  table: "",
  rates: {},
  lastupdate: "",
  lastUpdateKraken: "",
};

async function fetchData(signal?: AbortSignal): Promise<ExchangeRatesResponse> {
  const response = await fetch("/api/price", { signal });
  if (!response.ok) {
    throw new Error(`Price API responded with ${response.status}`);
  }

  const value: unknown = await response.json();
  if (!isExchangeRatesResponse(value)) {
    throw new Error("Price API returned an invalid response");
  }

  return value;
}

function getStoredCurrency(priceData: ExchangeRatesResponse): string | null {
  const storedCurrency = localStorage.getItem("currency");
  return storedCurrency && priceData.rates[storedCurrency] ? storedCurrency : null;
}

export function useConverter(initialPriceData: ExchangeRatesResponse | null) {
  const [error, setError] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<ExchangeRatesResponse>(initialPriceData ?? emptyPriceData);
  const [amounts, setAmounts] = useState<Amounts>({
    fiat: "",
    sat: "",
    btc: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  useEffect(() => {
    const controller = new AbortController();

    const loadPriceData = async () => {
      try {
        const data = initialPriceData ?? (await fetchData(controller.signal));
        setPriceData(data);
        setSelectedCurrency(getStoredCurrency(data) ?? "USD");
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(true);
      }
    };

    void loadPriceData();
    return () => controller.abort();
  }, [initialPriceData]);

  const onRefresh = async () => {
    setError(false);
    try {
      const data = await fetchData();
      setPriceData(data);
    } catch {
      setError(true);
    }
  };

  const onCurrencyChange = (currencyCode: string) => {
    if (!priceData.rates[currencyCode] || currencyCode === selectedCurrency) return;
    setSelectedCurrency(currencyCode);
    localStorage.setItem("currency", currencyCode);

    updateAmounts(amounts.fiat, currencyCode);
  };

  const updateAmounts = (fiatAmount: string, currency: string) => {
    const btcPrice = getBtcPrice(priceData, currency);

    setAmounts({
      fiat: fiatAmount,
      btc: convertFiatToBtc(fiatAmount, btcPrice),
      sat: convertFiatToSat(fiatAmount, btcPrice),
    });
  };

  const onChangeFiat = (fiatAmount: string) => {
    updateAmounts(fiatAmount, selectedCurrency);
  };

  const onChangeSat = (satAmount: string) => {
    const btcPrice = getBtcPrice(priceData, selectedCurrency);

    setAmounts({
      fiat: convertSatToFiat(satAmount, btcPrice),
      sat: satAmount,
      btc: convertSatToBtc(satAmount),
    });
  };

  const onChangeBtc = (btcAmount: string) => {
    const btcPrice = getBtcPrice(priceData, selectedCurrency);

    setAmounts({
      fiat: convertBtcToFiat(btcAmount, btcPrice),
      sat: convertBtcToSat(btcAmount),
      btc: btcAmount,
    });
  };

  return {
    error,
    priceData,
    amounts,
    selectedCurrency,
    onRefresh,
    onCurrencyChange,
    onChangeFiat,
    onChangeSat,
    onChangeBtc,
  };
}
