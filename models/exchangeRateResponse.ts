export type ExchangeRatesResponse = {
  table: string;
  rates: {
    [currencyCode: string]: number;
  };
  lastupdate: string;
};