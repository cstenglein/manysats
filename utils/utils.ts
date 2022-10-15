let FORMATTER: Intl.NumberFormat | null = null;

export function getFormatter(locale: string): Intl.NumberFormat {
  if (!FORMATTER || FORMATTER.resolvedOptions().locale !== locale) {
    FORMATTER = new Intl.NumberFormat(locale);
  }
  return FORMATTER;
}

export function getSeparator(locale: string, separatorType: "decimal" | "group"): string {
  const numberWithGroupAndDecimalSeparator = 1000.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find((part) => part.type === separatorType)!.value;
}
