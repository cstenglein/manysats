import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { CurrencyItem, groupedCurrencies } from "@/models/mapping";
import { components, GroupBase, OptionsOrGroups, SingleValue, SingleValueProps, Props as SelectProps } from "react-select";
import dynamic from "next/dynamic";
import React from "react";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <select className="w-48 bg-primary"></select>,
});

const TypedSelect = Select as unknown as React.ComponentType<SelectProps<CurrencyItem, false, GroupBase<CurrencyItem>>>;

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
      <TypedSelect
        className="w-48"
        options={groupedOptions}
        onInputChange={(value: string) => setInputValue(value)}
        onChange={handleCurrencyChange}
        value={selectedCurrencyItem}
        isLoading={isLoading}
        components={{ SingleValue: CustomSingleValue }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'rgb(var(--card))',
            borderColor: 'rgb(var(--primary))',
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'rgb(var(--card))',
            color: 'rgb(var(--foreground))',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? 'rgb(var(--primary))'
              : 'rgb(var(--card))',
            color: state.isFocused
              ? 'rgb(var(--primary-foreground))'
              : 'rgb(var(--foreground))',
            cursor: 'pointer',
            ':active': {
              backgroundColor: 'rgb(var(--primary))',
              color: 'rgb(var(--primary-foreground))'
            }
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'rgb(var(--foreground))'
          }),
        }}
      />
    </article>
  );
}