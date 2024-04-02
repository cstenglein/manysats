import Converter from "@/components/Converter";
import Imprint from "@/components/Imprint";
import Title from "@/components/Title";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Title />
      <Converter />
      <p className="p-2 text-center text-blue-600">
        If you like to support my work, please consider donating some sats to my lightning address:
      </p>
      <QRCodeSVG value="christoph@getalby.com" />
      <span className="pt-2 text-blue-600 underline">christoph@getalby.com</span>
      <br />
      <Imprint contactDetails={process.env.CONTACT_DETAILS || ""} websiteLink={process.env.WEBSITE_LINK || ""} />
    </main>
  );
}
