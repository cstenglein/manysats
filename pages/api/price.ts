import type { NextApiRequest, NextApiResponse } from "next";

type PriceData = {
  price: number | null;
  date: Date | null;
};

let cachedData: PriceData = {
  price: null,
  date: null,
};

const CACHE_MS = 180_000;

export default async function handler(_: NextApiRequest, res: NextApiResponse<any>) {
  if (!cachedData.date || new Date().getTime() - cachedData.date?.getTime() > CACHE_MS) {
    console.info("fetch data");
    const data = await fetch("https://api.kraken.com/0/public/Ticker?pair=XBTEUR");
    const json = await data.json();

    cachedData.price = +json.result.XXBTZEUR.a[0];
    cachedData.date = new Date();
  } else {
    console.info("use cached data");
  }

  res.status(200).json(cachedData);
}
