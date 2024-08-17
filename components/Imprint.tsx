"use client";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import Link from "next/link";

export default function Imprint({ contactDetails, websiteLink }: { contactDetails: string; websiteLink: string }) {
  const [visible, setVisible] = useState(false);
  const contactInfo = contactDetails.split("\n");

  return (
    <>
      <p onClick={() => setVisible(true)} className="cursor-pointer pt-4 underline hover:text-gray-600">
        Imprint
      </p>
      <Dialog
        header="Imprint"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <section>
          {contactInfo.map((line) => {
            return <p key={line}>{line}</p>;
          })}
          <Link href={websiteLink} className="text-center text-blue-500 outline-none">
            {websiteLink}
          </Link>
        </section>
      </Dialog>
    </>
  );
}
