export type PriceData = {
  // Bitcoin to Euro
  EUR: number;
  // Bitcoin to GBP
  GBP: number;
  // Bitcoin to JPY
  JPY: number;
  // Bitcoin to USD
  USD: number;
  date: string;
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
