import { FC } from "react";

type Props = {
  formattedPrice: string | null;
};

const CurrentPrice: FC<Props> = ({ formattedPrice }) => {
  return (
    <article className="mx-5 flex w-full justify-start px-2">
      {formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 items-center justify-center rounded-full bg-blue-500 p-2 text-sm text-white">
          {formattedPrice} € / BTC
        </p>
      )}
      {!formattedPrice && (
        <p className="z-10 -my-5 flex w-5/12 animate-pulse items-center justify-center rounded-full bg-gray-400 p-2 text-sm text-white"></p>
      )}
    </article>
  );
};

export default CurrentPrice;
