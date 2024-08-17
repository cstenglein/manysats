import { Metadata } from "next";
import "../styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';

import type { Viewport } from "next";
import { PrimeReactProvider } from "primereact/api";


export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  title: "ManySats - Your simple Fiat to Satoshi Converter",
  description: "ManySats is a simple Fiat to Satoshi Converter",
  metadataBase: new URL("https://manysats.com/"),
  openGraph: {
    type: "website",
    url: "https://manysats.com/",
    title: "ManySats",
    description: "ManySats is a simple Fiat to Satoshi Converter",
  },
  icons: [
    {
      url: "/favicon.ico",
      sizes: "64x64",
      type: "image/png",
    },
    {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
  manifest: "/manifest.json",
  other: {
    lightning: "lnurlp:christoph@getalby.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body>{children}</body>
      </PrimeReactProvider>
    </html>
  );
}
