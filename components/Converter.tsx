"use client";
import { useConverter } from "@/hooks/useConverter";
import CurrentPrice from "./CurrentPrice";
import FiatInput from "./FiatInput";
import NumberInput from "./NumberInput";
import PriceUpdate from "./PriceUpdate";
import { useEffect, useState } from "react";
import refreshIcon from "../public/icons/refresh.svg";
import Image from "next/image";

export default function Converter() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
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

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsDisabled(false);
      setCountdown(60);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDisabled, countdown]);

  const handleRefreshBtnClick = async () => {
    setIsDisabled(true);
    await onRefresh();
  };

  return (
    <>
      <section className="flex w-11/12 flex-col items-center rounded-sm border border-card-border bg-card shadow-md md:w-auto">
        <CurrentPrice priceData={priceData} selectedCurrency={selectedCurrency} />
        <article className="flex w-full justify-end px-2">
          <button
            className="relative -top-4 z-10 -my-5 flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground disabled:bg-muted"
            onClick={handleRefreshBtnClick}
            disabled={isDisabled}
          >
            <Image className="mr-1" src={refreshIcon} alt="bla" />
            {isDisabled ? `Refresh in ${countdown}s` : "Refresh"}
          </button>
        </article>
        <FiatInput
          fiatAmount={amounts.fiat}
          onChangeFiatHandler={onChangeFiatHandler}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
        />
        <NumberInput id="input-sat" amount={amounts.sat} onChange={onChangeSatHandler} label="SAT" />
        <NumberInput id="input-btc" amount={amounts.btc} onChange={onChangeBtcHandler} label="BTC" />
      </section>
      {!error && <PriceUpdate date={priceData.lastupdate} dateKraken={priceData.lastUpdateKraken} />}
      {error && <p className="pt-6 text-sm text-error">Failed to fetch price data. Please try again later</p>}
    </>
  );
}
