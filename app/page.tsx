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
        If you like to support my work, please consider donating some sats to my BOLT 12 address:
      </p>
      <QRCodeSVG className='w-48 h-48' value="lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qfmy8pk9duy2qqxfq6fely32t2qm6w9pmy7yastuhmf66ee9sqep5qsr99425pr6sf49mdzyv9e0hx3h23fyz8p7vvqgzmx76p5t5kktft9qqv6w67zf7w4nym9jglqnykcuj764st6p38gur50py6xmau2252flk2t3uw3kkxv4h09zcr2zlekg5ajd47a9qt9p8kydpqc28pjamlhgcr5y85ssu7x2plxdur0yq49tf8y9lk75sqqs6cmm0pkyt9x6lpg24kl47c2zac" />
      <span className="p-2 text-blue-600 underline md:w-1/2 break-all">lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qfmy8pk9duy2qqxfq6fely32t2qm6w9pmy7yastuhmf66ee9sqep5qsr99425pr6sf49mdzyv9e0hx3h23fyz8p7vvqgzmx76p5t5kktft9qqv6w67zf7w4nym9jglqnykcuj764st6p38gur50py6xmau2252flk2t3uw3kkxv4h09zcr2zlekg5ajd47a9qt9p8kydpqc28pjamlhgcr5y85ssu7x2plxdur0yq49tf8y9lk75sqqs6cmm0pkyt9x6lpg24kl47c2zac</span>
      <br />
      <Imprint contactDetails={process.env.CONTACT_DETAILS || ""} websiteLink={process.env.WEBSITE_LINK || ""} />
    </main>
  );
}
