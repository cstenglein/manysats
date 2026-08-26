import "server-only";

import type { ExchangeRatesResponse } from "@/models/exchangeRateResponse";

const FRANKFURTER_URL = "https://api.frankfurter.app/latest?from=USD";
const KRAKEN_URL = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,XBTEUR,XBTCAD,XBTGBP,XBTJPY";
const FETCH_TIMEOUT_MS = 10_000;

interface FrankfurterResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseFrankfurterResponse(value: unknown): FrankfurterResponse {
  if (!isRecord(value) || typeof value.base !== "string" || typeof value.date !== "string" || !isRecord(value.rates)) {
    throw new Error("Frankfurter returned an invalid response");
  }

  const rates: Record<string, number> = {};
  for (const [currency, rate] of Object.entries(value.rates)) {
    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
      throw new Error(`Frankfurter returned an invalid ${currency} rate`);
    }
    rates[currency] = rate;
  }

  if (Object.keys(rates).length === 0 || Number.isNaN(Date.parse(value.date))) {
    throw new Error("Frankfurter returned invalid exchange rates");
  }

  return { base: value.base, date: value.date, rates };
}

function readKrakenAsk(result: Record<string, unknown>, pair: string): number {
  const ticker = result[pair];
  if (!isRecord(ticker) || !Array.isArray(ticker.a) || typeof ticker.a[0] !== "string") {
    throw new Error(`Kraken response is missing ${pair}`);
  }

  const ask = Number.parseFloat(ticker.a[0]);
  if (!Number.isFinite(ask) || ask <= 0) {
    throw new Error(`Kraken returned an invalid ${pair} rate`);
  }

  return ask;
}

async function fetchJson(url: string, revalidate: number): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`${new URL(url).hostname} responded with ${response.status}`);
  }

  return response.json();
}

export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const [frankfurterValue, krakenValue] = await Promise.all([
    fetchJson(FRANKFURTER_URL, 1_800),
    fetchJson(KRAKEN_URL, 60),
  ]);

  const frankfurter = parseFrankfurterResponse(frankfurterValue);
  if (!isRecord(krakenValue) || !isRecord(krakenValue.result)) {
    throw new Error("Kraken returned an invalid response");
  }

  const btcToUsd = readKrakenAsk(krakenValue.result, "XXBTZUSD");
  const rates = {
    ...frankfurter.rates,
    USD: 1,
    BTC: 1 / btcToUsd,
    EUR: readKrakenAsk(krakenValue.result, "XXBTZEUR") / btcToUsd,
    CAD: readKrakenAsk(krakenValue.result, "XXBTZCAD") / btcToUsd,
    GBP: readKrakenAsk(krakenValue.result, "XXBTZGBP") / btcToUsd,
    JPY: readKrakenAsk(krakenValue.result, "XXBTZJPY") / btcToUsd,
  };

  return {
    table: frankfurter.base,
    rates,
    lastupdate: new Date(frankfurter.date).toISOString(),
    lastUpdateKraken: new Date().toISOString(),
  };
}
