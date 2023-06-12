export type PriceData = {
  date: Date | null;
  pairs: {
    // Bitcoin to Euro
    XXBTZEUR: number | null;
    // Bitcoin to GBP
    XXBTZGBP: number | null;
    // Bitcoin to USD
    XXBTZUSD: number | null;
    // Bitcoin to JPY
    XXBTZJPY: number | null;
  };
};

type Pairs = {
  [pair: string]: PairInfo;
};

/**
 * Note: typing does not contain all data
 * Full info at {@link https://docs.kraken.com/rest/#tag/Market-Data/operation/getTickerInformation}
 */
type PairInfo = {
  /**
   * Ask price
   */
  a: [price: number, wholeLotVolume: number, lotVolume: number];
  /**
   * Bid price
   */
  b: [price: number, wholeLotVolume: number, lotVolume: number];
};

export type TickerResponse = {
  result: Pairs;
  error: string[];
};
