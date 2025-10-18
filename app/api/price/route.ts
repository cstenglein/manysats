// cache api response for 1 minute
import { ExchangeRatesResponse } from "@/models/exchangeRateResponse";

export const revalidate = 60;
export const runtime = "edge";

// Get all trading pairs
const KRAKEN_TICKER_URL = "https://api.kraken.com/0/public/Ticker";
const TICKER_URL = "https://api.frankfurter.app/latest?from=USD";

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
      // Return empty values instead of error
      const emptyResponse: ExchangeRatesResponse = {
        table: "USD",
        rates: {},
        lastupdate: new Date().toISOString(),
        lastUpdateKraken: new Date().toISOString(),
      };
      return Response.json(emptyResponse);
    }

    const tickerData = await tickerResp.json();
    // Transform frankfurter.app response to our format
    const ticker: ExchangeRatesResponse = {
      table: tickerData.base || "USD",
      rates: tickerData.rates || {},
      lastupdate: tickerData.date ? new Date(tickerData.date).toISOString() : new Date().toISOString(),
      lastUpdateKraken: new Date().toISOString(),
    };

    // Fetch the Kraken data with timeout
    const krakenResp = await fetch(KRAKEN_TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!krakenResp.ok) {
      console.error(`Kraken API error: ${krakenResp.status}`);
      // Return ticker data without BTC rates
      return Response.json(ticker);
    }

    const krakenData = await krakenResp.json();
    const krakenResult = krakenData?.result;

    if (!krakenResult) {
      console.error("Invalid Kraken response: missing result field");
      // Return ticker data without BTC rates
      return Response.json(ticker);
    }

    // Extract rates from Kraken
    const btcToUsd = parseFloat(krakenResult.XXBTZUSD?.a?.[0] || "0");
    const btcToEur = parseFloat(krakenResult.XXBTZEUR?.a?.[0] || "0");
    const btcToCad = parseFloat(krakenResult.XXBTZCAD?.a?.[0] || "0");
    const btcToGbp = parseFloat(krakenResult.XXBTZGBP?.a?.[0] || "0");
    const btcToJpy = parseFloat(krakenResult.XXBTZJPY?.a?.[0] || "0");

    if (btcToUsd <= 0) {
      console.error("Invalid BTC/USD rate from Kraken");
      // Return ticker data without BTC rates
      return Response.json(ticker);
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
    // Return empty values instead of error
    const emptyResponse: ExchangeRatesResponse = {
      table: "USD",
      rates: {},
      lastupdate: new Date().toISOString(),
      lastUpdateKraken: new Date().toISOString(),
    };
    return Response.json(emptyResponse);
  }
}
