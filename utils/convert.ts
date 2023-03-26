import { Unit } from "../components/Converter";

export function convert(floatInput: number, price: number, selectedUnit: Unit) {
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
