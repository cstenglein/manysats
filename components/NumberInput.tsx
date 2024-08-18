import { ChangeEvent } from "react";
import { NumericFormat } from "react-number-format";

type Props = {
  id: string;
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function NumberInput({ id, amount, onChange, label }: Props) {
  return (
    <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
      <NumericFormat id={id} className="input-underline" value={amount} thousandSeparator="," onChange={onChange} />
      <span className="bg-white">{label}</span>
    </article>
  );
}
