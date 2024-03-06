import { Unit } from "@/components/Converter";

let SAT_FORMAT: Intl.NumberFormat | null = null;
let BTC_FORMAT: Intl.NumberFormat | null = null;

export function getFormatter(locale: string, selectedUnit: Unit): Intl.NumberFormat {
  switch (+selectedUnit as Unit) {
    case Unit.SAT:
      if (!SAT_FORMAT || SAT_FORMAT.resolvedOptions().locale !== locale) {
        SAT_FORMAT = new Intl.NumberFormat(locale);
      }
      return SAT_FORMAT;
    case Unit.BTC:
      if (!BTC_FORMAT || BTC_FORMAT.resolvedOptions().locale !== locale) {
        BTC_FORMAT = new Intl.NumberFormat(locale, { minimumFractionDigits: 8 });
      }
      return BTC_FORMAT;
  }
}

export function getSeparator(locale: string, separatorType: "decimal" | "group"): string {
  const numberWithGroupAndDecimalSeparator = 1000.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find((part) => part.type === separatorType)!.value;
}
