export type ExchangeRatesResponse = {
  table: string;
  rates: {
    [currencyCode: string]: number;
  };
  lastupdate: string;
  lastUpdateKraken: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isExchangeRatesResponse(value: unknown): value is ExchangeRatesResponse {
  if (!isRecord(value) || typeof value.table !== "string" || !isRecord(value.rates)) {
    return false;
  }

  if (
    typeof value.lastupdate !== "string" ||
    Number.isNaN(Date.parse(value.lastupdate)) ||
    typeof value.lastUpdateKraken !== "string" ||
    Number.isNaN(Date.parse(value.lastUpdateKraken))
  ) {
    return false;
  }

  const ratesAreValid = Object.values(value.rates).every(
    (rate) => typeof rate === "number" && Number.isFinite(rate) && rate > 0,
  );

  return ratesAreValid && typeof value.rates.BTC === "number" && typeof value.rates.USD === "number";
}
