import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { CurrencyItem, groupedCurrencies } from "@/models/mapping";
import { components, GroupBase, OptionsOrGroups, SingleValue, SingleValueProps } from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <select className="w-48 bg-white"></select>,
});

type Props = {
  fiatAmount: string;
  onChangeFiatHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
};

export default function FiatInput({ fiatAmount, onChangeFiatHandler, selectedCurrency, onCurrencyChange }: Props) {
  const inputFiat = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (inputFiat.current) {
      inputFiat.current.focus();
    }
    setIsLoading(false);
  }, []);

  const groupedOptions: OptionsOrGroups<CurrencyItem, GroupBase<CurrencyItem>> = groupedCurrencies.map((group) => ({
    label: group.label,
    options: group.items.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
  }));

  const selectedCurrencyItem =
    groupedCurrencies.flatMap((group) => group.items).find((item) => item.value === selectedCurrency) || null;

  const CustomSingleValue = (props: SingleValueProps<CurrencyItem, false, GroupBase<CurrencyItem>>) => {
    return (
      <components.SingleValue {...props}>
        <span>{props.data.value}</span>
      </components.SingleValue>
    );
  };

  const handleCurrencyChange = (newValue: SingleValue<CurrencyItem>) => {
    onCurrencyChange(newValue ? newValue.value : "USD");
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
      <Select
        className="w-48"
        options={groupedOptions}
        onInputChange={(value) => setInputValue(value)}
        // @ts-ignore
        onChange={handleCurrencyChange}
        value={selectedCurrencyItem}
        isLoading={isLoading}
        // @ts-ignore
        components={{ SingleValue: CustomSingleValue }}
      />
    </article>
  );
}
