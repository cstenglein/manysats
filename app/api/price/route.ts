// cache api response for 1 minute
import { ExchangeRatesResponse } from "@/models/exchangeRateResponse";

export const revalidate = 60;
export const runtime = "edge";

// Get all trading pairs
const KRAKEN_TICKER_URL = "https://api.kraken.com/0/public/Ticker";
const TICKER_URL = "https://cdn.wahrungsrechner.info/api/latest.json";

export async function GET() {
  try {
    // Fetch the general ticker data
    const tickerResp = await fetch(TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      // cache the response for 30 minutes
      next: { revalidate: 1800 },
    });
    const ticker: ExchangeRatesResponse = await tickerResp.json();

    // Fetch the Kraken data
    const krakenResp = await fetch(KRAKEN_TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const kraken = await krakenResp.json();

    // Extract rates from Kraken
    const btcToUsd = +kraken.result.XXBTZUSD.a[0];
    const btcToEur = +kraken.result.XXBTZEUR.a[0];
    const btcToCad = +kraken.result.XXBTZCAD.a[0];
    const btcToGbp = +kraken.result.XXBTZGBP.a[0];
    const btcToJpy = +kraken.result.XXBTZJPY.a[0];

    // Update BTC rate in ticker
    ticker.rates["BTC"] = 1 / btcToUsd;
    ticker.rates["EUR"] = btcToEur / btcToUsd;
    ticker.rates["CAD"] = btcToCad / btcToUsd;
    ticker.rates["GBP"] = btcToGbp / btcToUsd;
    ticker.rates["JPY"] = btcToJpy / btcToUsd;
    ticker.lastUpdateKraken = new Date().toISOString();

    return Response.json(ticker);
  } catch (e) {
    console.error("Failed to fetch price data", e);
    return Response.error();
  }
}
