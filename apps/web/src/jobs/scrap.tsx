import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "../trigger";
import { scrap } from "@repo/scrappers";
import { resend } from "../lib/resend";
import Email from "../emails"

client.defineJob({
  id: "scrap-rockstore",
  name: "Scrap Rockstore",
  version: "0.0.1",
  trigger: cronTrigger({
    cron: "0 0 * * *"
  }),
  integrations: {
    resend
  },
  run: async (payload, io, ctx) => {
    io.logger.info("scrap-rockstore-started")

    const result = await io.runTask("run scrapper", async () => {
      const r = await scrap();
      return r;
    })

    io.logger.info("result :")
    io.logger.info(JSON.stringify(result))
    console.log("email", process.env.EMAIL_TO_ADDRESS)
    await io.resend.emails.send("send-email", {
      to: process.env.EMAIL_TO_ADDRESS!,
      subject: "Scrap Job Done !",
      react: <Email events={result.map(e => ({
        city: "Montpellier",
        venue: "Rockstore",
        date: e.date,
        isCanceled: e.isCancelled,
        isComplet: e.isComplet,
        title: e.title,
        url: e.detailsUrl
      }))}/>,
      from: "onboarding@resend.dev",
    })
  }
})
