import { scrap } from "@repo/scrappers";

export async function POST() {
  const s = await scrap();
  return Response.json({ data: s});
}
