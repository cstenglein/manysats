import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { NumericFormat } from "react-number-format";

type Props = {
  id: string;
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function NumberInput({ id, amount, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = useCallback(async (e: ClipboardEvent) => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      e.preventDefault();
      const rawValue = amount.replace(/,/g, "");
      await navigator.clipboard.writeText(rawValue);
    }
  }, [amount]);

  // Add event listener on mount, remove on unmount
  useEffect(() => {
    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [amount, handleCopy]);

  return (
    <article className="flex w-full items-center justify-center gap-2 rounded-b-xl p-10">
      <NumericFormat 
        id={id} 
        className="input-underline" 
        value={amount} 
        thousandSeparator="," 
        onChange={onChange}
        getInputRef={inputRef}
      />
      <span className="bg-white">{label}</span>
    </article>
  );
}
