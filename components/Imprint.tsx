"use client";
import XMarkIcon from "../public/icons/x-mark.svg";
import { useRef } from "react";
import Image from "next/image";

export default function Imprint({ contactDetails, websiteLink }: { contactDetails: string; websiteLink: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contactInfo = contactDetails.split("\n");

  return (
    <>
      <p onClick={() => dialogRef.current?.showModal()} className="cursor-pointer pt-4 underline hover:text-gray-600">
        Imprint
      </p>
      <dialog ref={dialogRef} className="rounded border border-blue-400 bg-white p-8 shadow-md">
        <Image
          className="absolute right-2 top-2 h-6 w-6 cursor-pointer"
          src={XMarkIcon}
          alt="Close"
          onClick={() => dialogRef.current?.close()}
        />
        <section className="">
          {contactInfo.map((line) => {
            return <p key={line}>{line}</p>;
          })}
          <a href={websiteLink} className="text-center text-blue-500 outline-none">
            {websiteLink}
          </a>
        </section>
      </dialog>
    </>
  );
}
