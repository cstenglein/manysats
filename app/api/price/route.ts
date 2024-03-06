import { TickerResponse } from "@/models/pricedata";

// update price every 60 seconds
export const revalidate = 60;
export const runtime = "edge";

// Get all trading pairs
const KRAKEN_TICKER_URL = "https://api.kraken.com/0/public/Ticker";

export async function GET(_: Request) {
  try {
    const resp = await fetch(KRAKEN_TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: TickerResponse = await resp.json();

    return Response.json({
      EUR: +data.result.XXBTZEUR.a[0],
      GBP: +data.result.XXBTZGBP.a[0],
      JPY: +data.result.XXBTZJPY.a[0],
      USD: +data.result.XXBTZUSD.a[0],
      date: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Failed to fetch price data", e);
    return Response.error();
  }
}
