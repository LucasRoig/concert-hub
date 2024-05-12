import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "../trigger";
import { scrap } from "@repo/scrappers";


client.defineJob({
  id: "scrap-rockstore",
  name: "Scrap Rockstore",
  version: "0.0.1",
  trigger: cronTrigger({
    cron: "0 0 * * *"
  }),
  run: async (payload, io, ctx) => {
    io.logger.info("scrap-rockstore-started")

    const result = await io.runTask("run scrapper", async () => {
      const r = await scrap();
      return r;
    })

    io.logger.info("result :")
    io.logger.info(JSON.stringify(result))
  }
})
