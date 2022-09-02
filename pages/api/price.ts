import type { NextApiRequest, NextApiResponse } from 'next';

let bla: any = '19955.10000';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!bla) {
    const data = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTEUR');
    const json = await data.json();
    console.log(json);
    bla = json.result.XXBTZEUR.a[0];
  } else {
    console.log('cached :)');
  }

  res.status(200).json(bla);
}
