import functions from "@google-cloud/functions-framework";
import { crawlAndUpload } from "./crawler/crawl.js";

functions.cloudEvent("iso-paja-menu", async () => {
  await crawlAndUpload();
});
