"use client";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export default function ContactButton(props: { contact: string | undefined }) {
  const onClickHandler = () => {
    alert(props.contact || "No contact details defined in environment");
  };

  return (
    <button className="flex items-center justify-center rounded bg-blue-600 p-2 text-white" onClick={onClickHandler}>
      <UserCircleIcon className="mr-1 inline h-5 w-5" />
      <span>Show Contact Details</span>
    </button>
  );
}
