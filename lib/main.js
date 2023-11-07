import functions from "@google-cloud/functions-framework";
import { getMenuURL } from "./crawler/crawl.js";

functions.http("getIsoPajaMenu", async (req, res) => {
  const menuURL = await getMenuURL();

  res
    .status(307)
    .setHeader("Cache-Control", "max-age=3600")
    .setHeader("Location", menuURL)
    .send();
});
