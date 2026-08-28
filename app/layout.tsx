import "../styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

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
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
