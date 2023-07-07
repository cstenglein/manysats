import { FC } from "react";
import { PriceOptions } from "../pages";

type Props = {
  formattedPrice: string | null;
  selectedCurrency: PriceOptions;
};

const CurrentPrice: FC<Props> = ({ formattedPrice, selectedCurrency }) => {
  return (
    <article className="mx-5 flex w-full justify-start px-2">
      {formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 items-center justify-center rounded-full bg-blue-600 p-2 text-sm text-white">
          {formattedPrice} <br /> {selectedCurrency} / BTC
        </p>
      )}
      {!formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 animate-pulse items-center justify-center rounded-full bg-gray-400 p-2 text-sm text-white"></p>
      )}
    </article>
  );
};

export default CurrentPrice;
