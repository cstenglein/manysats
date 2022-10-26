import type { NextApiRequest, NextApiResponse } from "next";
import { PriceData, TickerResponse } from "../../models/pricedata";

let cachedData: PriceData = {
  price: null,
  date: null,
};

const CACHE_MS = 60_000;

const BASE_URL = "https://api.kraken.com/0/public/Ticker?pair=XBTEUR";

export default async function handler(_: NextApiRequest, res: NextApiResponse<any>) {
  if (!cachedData.date || new Date().getTime() - cachedData.date?.getTime() > CACHE_MS) {
    await fetchPrice();
  }

  res.status(200).json(cachedData);
}

async function fetchPrice() {
  try {
    const resp = await fetch(BASE_URL);
    const data: TickerResponse = await resp.json();

    cachedData.price = +data.result.XXBTZEUR.a[0];
    cachedData.date = new Date();
  } catch (error) {
    console.error(error);
  }
}
