import type { NextApiRequest, NextApiResponse } from "next";

let price: number = 19955.1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!price) {
    const data = await fetch(
      "https://api.kraken.com/0/public/Ticker?pair=XBTEUR"
    );
    const json = await data.json();
    console.log(json);
    price = +json.result.XXBTZEUR.a[0];
  } else {
    console.log("cached :)");
  }

  res.status(200).json(price);
}
