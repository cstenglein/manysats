import { Unit } from "@/components/Converter";

export function convertFiatToBtc(floatInput: number, price: number, selectedUnit: Unit) {
  let converted: string;
  switch (+selectedUnit as Unit) {
    case Unit.SAT:
      converted = ((floatInput / price) * 100_000_000).toFixed(0);
      break;
    case Unit.BTC:
      converted = (floatInput / price).toFixed(8);
      break;
  }
  return converted;
}

export function convertBtcToFiat(btcInput: number, price: number, selectedUnit: Unit) {
  let converted: string;
  switch (+selectedUnit as Unit) {
    case Unit.SAT:
      converted = ((btcInput * price) / 100_000_000).toFixed(2);
      break;
    case Unit.BTC:
      converted = (btcInput * price).toFixed(2);
      break;
  }
  return converted;
}
