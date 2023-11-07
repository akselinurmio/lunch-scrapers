import functions from "@google-cloud/functions-framework";
import { getMenu } from "./crawler/crawl.js";

functions.http("getIsoPajaMenu", async (req, res) => {
  const menu = await getMenu();

  res.contentType("text/plain").send(menu);
});
