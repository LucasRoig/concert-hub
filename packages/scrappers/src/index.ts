import axios from "axios";
import * as cheerio from "cheerio";

const BASE_ROUTE = "https://www.rockstore.fr";
const CONCERT_PAGE = `${BASE_ROUTE}/PBEvents.asp`;

function keepFirstLine(s: string) {
  return s.split("\n")[0];
}
export async function scrap() {
  const response = await axios.get(CONCERT_PAGE);
  const $ = cheerio.load(response.data);
  const $events = $('[itemtype="http://schema.org/Event"]');
  const events = [];
  for (const $event of $events) {
    const title = $(".PBMainTxt", $event).text();
    const date = $(".PBDate", $event).text();
    const detailsUrl = BASE_ROUTE + "/" + $("#btndetail", $event).attr("href");
    const imageUrl = BASE_ROUTE + "/" + $(".PBItemImg img", $event).attr("src");
    const $description = $('[itemprop="description"]', $event);
    const style = keepFirstLine(
      $description
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text(),
    );

    const $spans = $("span", $event);
    let isComplet = false;
    let isCancelled = false; //TODO implement cancelled detection
    for (const $span of $spans) {

      if ($($span).text().trim().toLowerCase() === "complet") {
        isComplet = true;
        console.log($($span).text().trim().toLowerCase())
      }
    }

    events.push({
      title,
      date,
      detailsUrl,
      imageUrl,
      style,
      isComplet,
      isCancelled,
    });
  }
  return events;
}
