import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { groupedCurrencies } from "@/models/mapping";
import type { CurrencyItem } from "@/models/mapping";
import { components } from "react-select";
import type { GroupBase, OptionsOrGroups, SingleValue, SingleValueProps, Props as SelectProps } from "react-select";
import dynamic from "next/dynamic";

const TypedSelect = dynamic<SelectProps<CurrencyItem, false, GroupBase<CurrencyItem>>>(
  () => import("react-select").then((module) => module.default),
  {
    ssr: false,
    loading: () => <select className="w-48 bg-primary" aria-label="Currency" disabled />,
  },
);

function CurrencySingleValue(props: SingleValueProps<CurrencyItem, false, GroupBase<CurrencyItem>>) {
  return (
    <components.SingleValue {...props}>
      <span>{props.data.value}</span>
    </components.SingleValue>
  );
}

type Props = {
  fiatAmount: string;
  onChange: (amount: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currencyCode: string) => void;
  disabled: boolean;
};

export default function FiatInput({ fiatAmount, onChange, selectedCurrency, onCurrencyChange, disabled }: Props) {
  const inputFiat = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (inputFiat.current) {
      inputFiat.current.focus();
    }
  }, []);

  const groupedOptions: OptionsOrGroups<CurrencyItem, GroupBase<CurrencyItem>> = groupedCurrencies.map((group) => ({
    label: group.label,
    options: group.items.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
  }));

  const selectedCurrencyItem =
    groupedCurrencies.flatMap((group) => group.items).find((item) => item.value === selectedCurrency) || null;

  const handleCurrencyChange = (newValue: SingleValue<CurrencyItem>) => {
    onCurrencyChange(newValue ? newValue.value : "USD");
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-b-xl py-10 pr-5 pl-10">
      <label className="sr-only" htmlFor="input-fiat">
        Fiat amount
      </label>
      <NumericFormat
        id="input-fiat"
        className="input-underline"
        value={fiatAmount}
        thousandSeparator=","
        getInputRef={inputFiat}
        inputMode="decimal"
        disabled={disabled}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.source === "event") onChange(values.value);
        }}
      />
      <TypedSelect
        className="w-48"
        inputId="currency-select"
        aria-label="Currency"
        isDisabled={disabled}
        options={groupedOptions}
        onInputChange={(value: string) => setInputValue(value)}
        onChange={handleCurrencyChange}
        value={selectedCurrencyItem}
        components={{ SingleValue: CurrencySingleValue }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "rgb(var(--card))",
            borderColor: "rgb(var(--primary))",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "rgb(var(--card))",
            color: "rgb(var(--foreground))",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "rgb(var(--primary))" : "rgb(var(--card))",
            color: state.isFocused ? "rgb(var(--primary-foreground))" : "rgb(var(--foreground))",
            cursor: "pointer",
            ":active": {
              backgroundColor: "rgb(var(--primary))",
              color: "rgb(var(--primary-foreground))",
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "rgb(var(--foreground))",
          }),
        }}
      />
    </div>
  );
}
