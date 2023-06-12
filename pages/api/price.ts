import type { NextApiRequest, NextApiResponse } from "next";
import { PriceData, TickerResponse } from "../../models/pricedata";

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

export default async function handler(_: NextApiRequest, res: NextApiResponse<PriceData>) {
  if (!cachedData.date || new Date().getTime() - cachedData.date?.getTime() > CACHE_MS) {
    await fetchPrice();
  }

  res.status(200).json(cachedData);
}

async function fetchPrice() {
  try {
    const resp = await fetch(BASE_URL);
    const data: TickerResponse = await resp.json();

    cachedData.pairs.XXBTZEUR = +data.result.XXBTZEUR.a[0];
    cachedData.pairs.XXBTZGBP = +data.result.XXBTZGBP.a[0];
    cachedData.pairs.XXBTZJPY = +data.result.XXBTZJPY.a[0];
    cachedData.pairs.XXBTZUSD = +data.result.XXBTZUSD.a[0];
    cachedData.date = new Date();
  } catch (error) {
    console.error(error);
  }
}
