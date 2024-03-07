import { ChangeEvent, FC, useEffect, useRef } from "react";
import { NumericFormat } from "react-number-format";
import { PriceOptions } from "./CurrentPrice";

type Props = {
  fiatAmount: string;
  onChangeFiatHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: PriceOptions;
  onCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FiatInput: FC<Props> = ({ fiatAmount, onChangeFiatHandler, selectedCurrency, onCurrencyChange }) => {
  const inputFiat = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputFiat.current) {
      inputFiat.current.focus();
    }
  }, []);

  return (
    <article className="flex w-full items-center justify-center gap-2 rounded-b-xl py-10 pl-10 pr-5">
      <NumericFormat
        id="input-fiat"
        className="input-underline"
        value={fiatAmount}
        thousandSeparator=","
        getInputRef={inputFiat}
        onChange={onChangeFiatHandler}
      />
      <select className="bg-white" value={selectedCurrency} onChange={onCurrencyChange}>
        <option value={PriceOptions.EUR}>EUR</option>
        <option value={PriceOptions.GBP}>GBP</option>
        <option value={PriceOptions.JPY}>JPY</option>
        <option value={PriceOptions.USD}>USD</option>
      </select>
    </article>
  );
};

export default FiatInput;
