"use client";
import XMarkIcon from "../public/icons/x-mark.svg";
import { useRef } from "react";
import Image from "next/image";

export default function Imprint({ contactDetails, websiteLink }: { contactDetails: string; websiteLink: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contactInfo = contactDetails.split("\n");

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="cursor-pointer pt-4 underline hover:text-gray-600"
        aria-haspopup="dialog"
      >
        Imprint
      </button>
      <dialog
        ref={dialogRef}
        className="rounded border border-card-border bg-card p-8 text-foreground shadow-md backdrop:bg-black/50"
        aria-labelledby="imprint-title"
      >
        <button
          type="button"
          className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
          aria-label="Close imprint"
          onClick={() => dialogRef.current?.close()}
          autoFocus
        >
          <Image src={XMarkIcon} alt="" />
        </button>
        <section>
          <h2 id="imprint-title" className="mb-4 text-xl font-bold">
            Imprint
          </h2>
          {contactInfo.map((line, index) => {
            return <p key={`${index}:${line}`}>{line}</p>;
          })}
          {websiteLink && (
            <a href={websiteLink} className="text-center text-link underline">
              {websiteLink}
            </a>
          )}
        </section>
      </dialog>
    </>
  );
}
