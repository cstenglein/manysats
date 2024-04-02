"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export default function Imprint({ contactDetails }: { contactDetails: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <p onClick={() => dialogRef.current?.showModal()} className="cursor-pointer pt-4 underline hover:text-gray-600">
        Imprint
      </p>
      <dialog ref={dialogRef} className="rounded border border-blue-400 bg-white p-8 shadow-md">
        <XMarkIcon
          className="absolute right-2 top-2 h-6 w-6 cursor-pointer"
          onClick={() => dialogRef.current?.close()}
        />
        <p className="pt-4 text-center">{contactDetails}</p>
      </dialog>
    </>
  );
}
