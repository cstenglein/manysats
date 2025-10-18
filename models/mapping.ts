export interface CurrencyItem {
  label: string;
  value: string;
}

export interface CurrencyGroup {
  label: string;
  code: string;
  items: CurrencyItem[];
}

export const groupedCurrencies: CurrencyGroup[] = [
  {
    label: "Asia",
    code: "Asia",
    items: [
      { label: "Chinese Yuan - CNY", value: "CNY" },
      { label: "Hong Kong Dollar - HKD", value: "HKD" },
      { label: "Indian Rupee - INR", value: "INR" },
      { label: "Indonesian Rupiah - IDR", value: "IDR" },
      { label: "Israeli New Shekel - ILS", value: "ILS" },
      { label: "Japanese Yen - JPY", value: "JPY" },
      { label: "Malaysian Ringgit - MYR", value: "MYR" },
      { label: "Philippine Peso - PHP", value: "PHP" },
      { label: "Singapore Dollar - SGD", value: "SGD" },
      { label: "South Korean Won - KRW", value: "KRW" },
      { label: "Thai Baht - THB", value: "THB" },
    ],
  },
  {
    label: "Europe",
    code: "Europe",
    items: [
      { label: "British Pound Sterling - GBP", value: "GBP" },
      { label: "Bulgarian Lev - BGN", value: "BGN" },
      { label: "Czech Koruna - CZK", value: "CZK" },
      { label: "Danish Krone - DKK", value: "DKK" },
      { label: "Euro - EUR", value: "EUR" },
      { label: "Hungarian Forint - HUF", value: "HUF" },
      { label: "Icelandic Króna - ISK", value: "ISK" },
      { label: "Norwegian Krone - NOK", value: "NOK" },
      { label: "Polish Złoty - PLN", value: "PLN" },
      { label: "Romanian Leu - RON", value: "RON" },
      { label: "Swedish Krona - SEK", value: "SEK" },
      { label: "Swiss Franc - CHF", value: "CHF" },
      { label: "Turkish Lira - TRY", value: "TRY" },
    ],
  },
  {
    label: "North America",
    code: "North America",
    items: [
      { label: "Canadian Dollar - CAD", value: "CAD" },
      { label: "Mexican Peso - MXN", value: "MXN" },
      { label: "United States Dollar - USD", value: "USD" },
    ],
  },
  {
    label: "South America",
    code: "South America",
    items: [
      { label: "Brazilian Real - BRL", value: "BRL" },
    ],
  },
  {
    label: "Africa",
    code: "Africa",
    items: [
      { label: "South African Rand - ZAR", value: "ZAR" },
    ],
  },
  {
    label: "Oceania",
    code: "Oceania",
    items: [
      { label: "Australian Dollar - AUD", value: "AUD" },
      { label: "New Zealand Dollar - NZD", value: "NZD" },
    ],
  },
];
