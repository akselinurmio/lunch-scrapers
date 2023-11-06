import { getIsoPajaMenuScreenshot } from "./screenshot.js";
import { detectText } from "../../ocr.js";

export async function getIsoPajaMenu() {
  const screenshot = await getIsoPajaMenuScreenshot();

  return detectText(screenshot);
}
