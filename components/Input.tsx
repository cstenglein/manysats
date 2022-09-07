import { FC } from "react";

const Input: FC = () => {
  const onChangeHandler = () => {};

  return (
    <div className="my-8 flex w-full">
      <input
        className="border-b border-white bg-gray-800 text-right outline-none focus:border-blue-400"
        type="text"
        inputMode="decimal"
      ></input>
      <label>€</label>
    </div>
  );
};

export default Input;
