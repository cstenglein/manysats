import { ChangeEvent, FC } from "react";
import { NumericFormat } from "react-number-format";

type Props = {
  id: string;
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const NumberInput: FC<Props> = ({ id, amount, onChange, label }) => {
  return (
    <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
      <NumericFormat id={id} className="input-underline" value={amount} thousandSeparator="," onChange={onChange} />
      <span className="bg-white">{label}</span>
    </article>
  );
};

export default NumberInput;
