import functions from "@google-cloud/functions-framework";
import { getIsoPajaMenu } from "./menus/iso-paja/iso-paja.js";

functions.http("getIsoPajaMenu", async (req, res) => {
  const menu = await getIsoPajaMenu();

  res
    .contentType("text/plain")
    .setHeader("Cache-Control", "max-age=120")
    .send(menu);
});
