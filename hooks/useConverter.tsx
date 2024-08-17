import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ExchangeRatesResponse } from "@/models/exchangeRateResponse";
import {
  convertBtcToFiat,
  convertBtcToSat,
  convertFiatToBtc,
  convertFiatToSat,
  convertSatToBtc,
  convertSatToFiat,
} from "@/utils/convert";

async function fetchData(): Promise<ExchangeRatesResponse> {
  const res = await fetch("/api/price");
  return await res.json();
}

export function useConverter() {
  const [error, setError] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<ExchangeRatesResponse>({
    table: "",
    rates: {},
    lastupdate: "",
    lastUpdateKraken: "",
  });
  const [amounts, setAmounts] = useState<{ fiat: string; sat: string; btc: string }>({
    fiat: "",
    sat: "",
    btc: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const checkLocalStorage = useCallback((priceData: ExchangeRatesResponse) => {
    if (localStorage.getItem("currency")) {
      if (priceData.rates[localStorage.getItem("currency")!]) {
        setSelectedCurrency(localStorage.getItem("currency")!);
      }
    }
  }, []);

  const validateData = useCallback(
    (data: ExchangeRatesResponse) => {
      setPriceData(data);
      checkLocalStorage(data);
    },
    [checkLocalStorage],
  );

  useEffect(() => {
    fetchData()
      .then(validateData)
      .catch(() => setError(true));
  }, [validateData]);

  const onRefresh = useCallback(async () => {
    setError(false);
    try {
      const data = await fetchData();
      validateData(data);
    } catch {
      setError(true);
    }
  }, [validateData]);

  const onCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem("currency", currencyCode);
    updateAmounts(amounts.fiat, currencyCode);
  };

  const getBtcPrice = (currency: string): number => {
    const btcRateInUSD = priceData.rates["BTC"] || 1;
    const currencyRateInUSD = priceData.rates[currency] || 1;
    return (1 / btcRateInUSD) * currencyRateInUSD;
  };

  const updateAmounts = (fiatAmount: string, currency: string) => {
    const btcPrice = getBtcPrice(currency);

    setAmounts({
      fiat: fiatAmount,
      btc: convertFiatToBtc(fiatAmount, btcPrice),
      sat: convertFiatToSat(fiatAmount, btcPrice),
    });
  };

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fiatAmount = event.target.value;
    updateAmounts(fiatAmount, selectedCurrency);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const satAmount = event.target.value;
    const btcPrice = getBtcPrice(selectedCurrency);

    setAmounts({
      fiat: convertSatToFiat(satAmount, btcPrice),
      sat: satAmount,
      btc: convertSatToBtc(satAmount),
    });
  };

  const onChangeBtcHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const btcAmount = event.target.value;
    const btcPrice = getBtcPrice(selectedCurrency);

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
    onChangeFiatHandler,
    onChangeSatHandler,
    onChangeBtcHandler,
    availableCurrencies: Object.keys(priceData.rates),
    getBtcPrice,
  };
}
