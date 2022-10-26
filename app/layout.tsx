import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>ManySats - Your simple Fiat to Satoshi Converter</title>
        <meta name="description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        {/* OG Image */}
        <meta property="og:url" content="https://manysats.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ManySats" />
        <meta property="og:description" content="Your simple Fiat to Satoshi Converter" />
        <meta property="og:image" content="https://manysats.com/api/og" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="manysats.com" />
        <meta property="twitter:url" content="https://manysats.com/" />
        <meta name="twitter:title" content="ManySats" />
        <meta name="twitter:description" content="Your simple Fiat to Satoshi Converter" />
        <meta name="twitter:image" content="https://manysats.com/api/og" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
