import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Dropdown } from "primereact/dropdown";
import { CurrencyGroup, groupedCurrencies } from "@/models/mapping";

type Props = {
  fiatAmount: string;
  onChangeFiatHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
};

const FiatInput: FC<Props> = ({ fiatAmount, onChangeFiatHandler, selectedCurrency, onCurrencyChange }) => {
  const inputFiat = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const groupedItemTemplate = (option: CurrencyGroup) => {
    return (
      <div className="align-items-center flex">
        <div>{option.label}</div>
      </div>
    );
  };

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
      {!isLoading && (
        <Dropdown
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.value)}
          options={groupedCurrencies}
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
          optionGroupTemplate={groupedItemTemplate}
          valueTemplate={(option) => <div>{option.value}</div>}
          filter
          resetFilterOnHide={true}
        />
      )}
    </article>
  );
};

export default FiatInput;
