import Converter from "@/components/Converter";
import Imprint from "@/components/Imprint";
import Title from "@/components/Title";
import { getExchangeRates } from "@/lib/exchange-rates";
import type { ExchangeRatesResponse } from "@/models/exchangeRateResponse";
import { QRCodeSVG } from "qrcode.react";

const donationAddress =
  "lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qfmy8pk9duy2qqxfq6fely32t2qm6w9pmy7yastuhmf66ee9sqep5qsr99425pr6sf49mdzyv9e0hx3h23fyz8p7vvqgzmx76p5t5kktft9qqv6w67zf7w4nym9jglqnykcuj764st6p38gur50py6xmau2252flk2t3uw3kkxv4h09zcr2zlekg5ajd47a9qt9p8kydpqc28pjamlhgcr5y85ssu7x2plxdur0yq49tf8y9lk75sqqs6cmm0pkyt9x6lpg24kl47c2zac";

export default async function Home() {
  let initialPriceData: ExchangeRatesResponse | null = null;

  try {
    initialPriceData = await getExchangeRates();
  } catch (error) {
    console.error("Failed to load initial price data:", error);
  }

  return (
    <main className="flex flex-col items-center">
      <Title />
      <Converter initialPriceData={initialPriceData} />
      <p className="p-2 text-center text-link">
        If you like to support my work, please consider donating some sats to my BOLT 12 address:
      </p>
      <QRCodeSVG className="h-48 w-48 border-2 border-white" title="BOLT 12 donation address" value={donationAddress} />
      <code className="p-2 break-all text-link underline md:w-1/2">{donationAddress}</code>
      <Imprint contactDetails={process.env.CONTACT_DETAILS || ""} websiteLink={process.env.WEBSITE_LINK || ""} />
    </main>
  );
}
