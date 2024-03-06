export function convertSatToBtc(satInput: string): string {
  return (+satInput.replace(/,/g, "") / 100_000_000).toFixed(8);
}

export function convertBtcToSat(btcInput: string): string {
  return (+btcInput.replace(/,/g, "") * 100_000_000).toFixed(0);
}

export function convertFiatToBtc(fiatAmount: string, price: number): string {
  const floatInput = +fiatAmount.replace(/,/g, "");
  return (floatInput / price).toFixed(8);
}

export function convertFiatToSat(fiatAmount: string, price: number): string {
  const floatInput = +fiatAmount.replace(/,/g, "");
  return ((floatInput / price) * 100_000_000).toFixed(0);
}

export function convertBtcToFiat(btcInput: string, price: number): string {
  const btcAmount = +btcInput.replace(/,/g, "");
  return (btcAmount * price).toFixed(2);
}

export function convertSatToFiat(satInput: string, price: number): string {
  const satAmount = +satInput.replace(/,/g, "");
  return ((satAmount / 100_000_000) * price).toFixed(2);
}
