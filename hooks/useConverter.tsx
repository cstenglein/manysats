import { PriceOptions } from "@/components/CurrentPrice";
import { PriceData } from "@/models/pricedata";
import { convertBtcToFiat, convertBtcToSat, convertFiat, convertSatToBtc, convertSatToFiat } from "@/utils/convert";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

async function fetchData(): Promise<PriceData> {
  const res = await fetch("/api/price");
  return await res.json();
}

export function useConverter() {
  const [error, setError] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<PriceData>({
    date: "",
    EUR: 0,
    GBP: 0,
    JPY: 0,
    USD: 0,
  });
  const [amounts, setAmounts] = useState<{ fiat: string; sat: string; btc: string }>({
    fiat: "",
    sat: "",
    btc: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState<PriceOptions>(PriceOptions.EUR);

  const validateData = useCallback((data: PriceData) => {
    setPriceData(data);
  }, []);

  useEffect(() => {
    fetchData()
      .then(validateData)
      .catch(() => setError(true));
  }, [validateData]);

  const onRefresh = async () => {
    setError(false);
    await fetchData();
  };

  const onCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const selectedCurrency = PriceOptions[event.target.value as keyof typeof PriceOptions];
    setSelectedCurrency(selectedCurrency);

    const { sat, btc } = convertFiat(amounts.fiat, priceData[selectedCurrency]);

    setAmounts({
      ...amounts,
      sat,
      btc,
    });
  };

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fiatAmount = event.target.value;

    const { sat, btc } = convertFiat(fiatAmount, priceData[selectedCurrency]);

    setAmounts({
      ...amounts,
      fiat: fiatAmount,
      sat,
      btc,
    });
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const satAmount = event.target.value;

    setAmounts({
      ...amounts,
      fiat: convertSatToFiat(satAmount, priceData[selectedCurrency]),
      sat: satAmount,
      btc: convertSatToBtc(satAmount),
    });
  };

  const onChangeBtcHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const btcAmount = event.target.value;

    setAmounts({
      ...amounts,
      fiat: convertBtcToFiat(btcAmount, priceData[selectedCurrency]),
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
  };
}
