import { NumericFormat } from "react-number-format";

type Props = {
  id: string;
  amount: string;
  onChange: (amount: string) => void;
  label: string;
  disabled: boolean;
};

export default function NumberInput({ id, amount, onChange, label, disabled }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
      <NumericFormat
        id={id}
        className="input-underline"
        value={amount}
        thousandSeparator=","
        inputMode="decimal"
        disabled={disabled}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.source === "event") onChange(values.value);
        }}
        onCopy={(event) => {
          event.preventDefault();
          event.clipboardData.setData("text/plain", amount.replaceAll(",", ""));
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
