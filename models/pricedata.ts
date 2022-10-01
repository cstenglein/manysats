export type PriceData = {
  price: number | null;
  date: Date | null;
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
