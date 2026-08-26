"use client";
import { useConverter } from "@/hooks/useConverter";
import CurrentPrice from "./CurrentPrice";
import FiatInput from "./FiatInput";
import NumberInput from "./NumberInput";
import PriceUpdate from "./PriceUpdate";
import { useEffect, useState } from "react";
import refreshIcon from "../public/icons/refresh.svg";
import Image from "next/image";
import type { ExchangeRatesResponse } from "@/models/exchangeRateResponse";

interface Props {
  initialPriceData: ExchangeRatesResponse | null;
}

export default function Converter({ initialPriceData }: Props) {
  const [refreshState, setRefreshState] = useState({ isDisabled: false, countdown: 60 });
  const {
    error,
    priceData,
    amounts,
    selectedCurrency,
    onRefresh,
    onCurrencyChange,
    onChangeFiat,
    onChangeSat,
    onChangeBtc,
  } = useConverter(initialPriceData);
  const isReady = Boolean(priceData.rates.BTC && priceData.rates[selectedCurrency]);

  useEffect(() => {
    if (!refreshState.isDisabled) return;

    const timer = window.setInterval(() => {
      setRefreshState((current) =>
        current.countdown <= 1
          ? { isDisabled: false, countdown: 60 }
          : { ...current, countdown: current.countdown - 1 },
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [refreshState.isDisabled]);

  const handleRefreshBtnClick = async () => {
    setRefreshState({ isDisabled: true, countdown: 60 });
    await onRefresh();
  };

  return (
    <>
      <section
        className="flex w-11/12 flex-col items-center rounded-sm border border-card-border bg-card shadow-md md:w-auto"
        aria-busy={!isReady}
      >
        <CurrentPrice priceData={priceData} selectedCurrency={selectedCurrency} />
        <div className="flex w-full justify-end px-2">
          <button
            type="button"
            className="relative -top-4 z-10 -my-5 flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground disabled:bg-muted"
            onClick={() => void handleRefreshBtnClick()}
            disabled={refreshState.isDisabled}
          >
            <Image className="mr-1" src={refreshIcon} alt="" />
            {refreshState.isDisabled ? `Refresh in ${refreshState.countdown}s` : "Refresh"}
          </button>
        </div>
        <FiatInput
          fiatAmount={amounts.fiat}
          onChange={onChangeFiat}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
          disabled={!isReady}
        />
        <NumberInput id="input-sat" amount={amounts.sat} onChange={onChangeSat} label="SAT" disabled={!isReady} />
        <NumberInput id="input-btc" amount={amounts.btc} onChange={onChangeBtc} label="BTC" disabled={!isReady} />
      </section>
      {!error && <PriceUpdate date={priceData.lastupdate} dateKraken={priceData.lastUpdateKraken} />}
      {error && (
        <p className="pt-6 text-sm text-error" role="alert">
          Failed to fetch price data. Please try again later.
        </p>
      )}
    </>
  );
}
