import { getIsoPajaMenuScreenshot } from "./menus/iso-paja/index.js";
import { detectText } from "./ocr.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = process.env.STORAGE_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

async function crawlAndUpload() {
  const menuImage = await getIsoPajaMenuScreenshot();
  const menuText = await detectText(menuImage);

  if (!menuText) throw new Error("No text detected");

  await Promise.all([
    bucket.file("iso-paja.png").save(menuImage, { contentType: "image/png" }),
    bucket
      .file("iso-paja.txt")
      .save(menuText, { contentType: "text/plain; charset=UTF-8" }),
  ]);

  console.log("Uploaded Iso Paja menus to bucket %s", bucketName);

  return menuText;
}

export async function getMenu() {
  const textFile = bucket.file("iso-paja.txt");
  const [metadata] = await textFile.getMetadata();
  const age = Date.now() - Date.parse(metadata.timeCreated);
  const ageInHours = age / (1000 * 60 * 60);

  if (ageInHours < 1) {
    const [buffer] = await textFile.download();
    return buffer.toString();
  }

  return await crawlAndUpload();
}
