export const dynamic = "force-dynamic";

import { PriceData, TickerResponse } from "@/models/pricedata";

let cachedData: PriceData = {
  pairs: {
    XXBTZEUR: null,
    XXBTZGBP: null,
    XXBTZJPY: null,
    XXBTZUSD: null,
  },
  date: null,
};

const CACHE_MS = 60_000;

// Get all trading pairs
const BASE_URL = "https://api.kraken.com/0/public/Ticker";

async function fetchPrice() {
  try {
    const resp = await fetch(BASE_URL);
    const data: TickerResponse = await resp.json();

    cachedData.pairs.XXBTZEUR = +data.result.XXBTZEUR.a[0];
    cachedData.pairs.XXBTZGBP = +data.result.XXBTZGBP.a[0];
    cachedData.pairs.XXBTZJPY = +data.result.XXBTZJPY.a[0];
    cachedData.pairs.XXBTZUSD = +data.result.XXBTZUSD.a[0];
    cachedData.date = new Date().toISOString();
  } catch (error) {
    console.error(error);
  }
}

export async function GET(_: Request) {
  if (!cachedData.date || new Date().getTime() - new Date(cachedData.date).getTime() > CACHE_MS) {
    await fetchPrice();
  }

  return Response.json(cachedData);
}
