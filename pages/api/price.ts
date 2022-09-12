import type { NextApiRequest, NextApiResponse } from "next";

type PriceData = {
  price: number | null;
  date: string | null;
};

let cachedData: PriceData = {
  price: null,
  date: null,
};

export default async function handler(_: NextApiRequest, res: NextApiResponse<any>) {
  if (!cachedData.price) {
    const data = await fetch("https://api.kraken.com/0/public/Ticker?pair=XBTEUR");
    const json = await data.json();
    console.log(json);
    cachedData.price = +json.result.XXBTZEUR.a[0];
    cachedData.date = new Date().toISOString();
  } else {
    console.log("cached :)");
  }

  res.status(200).json(cachedData);
}
