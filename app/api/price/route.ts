import { getExchangeRates } from "@/lib/exchange-rates";

export const revalidate = 60;
export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  try {
    return Response.json(await getExchangeRates());
  } catch (error) {
    console.error("Price API error:", error);
    return Response.json({ error: "Price data is temporarily unavailable" }, { status: 502 });
  }
}
