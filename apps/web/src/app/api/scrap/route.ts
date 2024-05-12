import { scrap } from "@repo/scrappers";

export async function POST() {
  const s = scrap();
  return Response.json({ data: s});
}
