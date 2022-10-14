import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  onRefresh: () => void;
};

const RefreshBtn: FC<Props> = ({ onRefresh }) => {
  return (
    <article className="flex w-full justify-end px-2">
      <button
        onClick={onRefresh}
        className="z-10 -my-5 flex items-center justify-center gap-1 rounded-full bg-blue-600 p-2 text-white"
      >
        <ArrowPathIcon className="inline h-4 w-4" />
        <p className="text-sm">Refresh</p>
      </button>
    </article>
  );
};

export default RefreshBtn;
