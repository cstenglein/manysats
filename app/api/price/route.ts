// cache api response for 1 minute
import { ExchangeRatesResponse } from "@/models/exchangeRateResponse";

export const revalidate = 60;
export const runtime = "edge";

// Get all trading pairs
const KRAKEN_TICKER_URL = "https://api.kraken.com/0/public/Ticker";
const TICKER_URL = "https://cdn.moneyconvert.net/api/latest.json";

// Fetch timeout in milliseconds
const FETCH_TIMEOUT = 10000; // 10 seconds

export async function GET() {
  try {
    // Fetch the general ticker data with timeout
    const tickerResp = await fetch(TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      // cache the response for 30 minutes
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!tickerResp.ok) {
      console.error(`Ticker API error: ${tickerResp.status}`);
      return Response.json(
        { error: "Failed to fetch exchange rates" },
        { status: 502 }
      );
    }

    const tickerData = await tickerResp.json();
    const ticker = tickerData as ExchangeRatesResponse;

    // Fetch the Kraken data with timeout
    const krakenResp = await fetch(KRAKEN_TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!krakenResp.ok) {
      console.error(`Kraken API error: ${krakenResp.status}`);
      return Response.json(
        { error: "Failed to fetch BTC rates" },
        { status: 502 }
      );
    }

    const krakenData = await krakenResp.json();
    const krakenResult = krakenData?.result;

    if (!krakenResult) {
      console.error("Invalid Kraken response: missing result field");
      return Response.json(
        { error: "Invalid response from price API" },
        { status: 502 }
      );
    }

    // Extract rates from Kraken
    const btcToUsd = parseFloat(krakenResult.XXBTZUSD?.a?.[0] || "0");
    const btcToEur = parseFloat(krakenResult.XXBTZEUR?.a?.[0] || "0");
    const btcToCad = parseFloat(krakenResult.XXBTZCAD?.a?.[0] || "0");
    const btcToGbp = parseFloat(krakenResult.XXBTZGBP?.a?.[0] || "0");
    const btcToJpy = parseFloat(krakenResult.XXBTZJPY?.a?.[0] || "0");

    if (btcToUsd <= 0) {
      console.error("Invalid BTC/USD rate from Kraken");
      return Response.json(
        { error: "Invalid BTC rate received" },
        { status: 502 }
      );
    }

    // Update BTC rate in ticker
    ticker.rates["BTC"] = 1 / btcToUsd;
    ticker.rates["EUR"] = btcToEur / btcToUsd;
    ticker.rates["CAD"] = btcToCad / btcToUsd;
    ticker.rates["GBP"] = btcToGbp / btcToUsd;
    ticker.rates["JPY"] = btcToJpy / btcToUsd;
    ticker.lastUpdateKraken = new Date().toISOString();

    return Response.json(ticker);
  } catch (e) {
    console.error("Price API error:", e);
    return Response.json(
      { error: "Failed to fetch price data" },
      { status: 500 }
    );
  }
}
