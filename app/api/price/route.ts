// cache api response for 10 minutes
export const revalidate = 600;
export const runtime = "edge";

// Get all trading pairs
const TICKER_URL = "https://cdn.wahrungsrechner.info/api/latest.json";

export async function GET(_: Request) {
  try {
    const resp = await fetch(TICKER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Response.json(await resp.json());
  } catch (e) {
    console.error("Failed to fetch price data", e);
    return Response.error();
  }
}
