import { getIsoPajaMenuScreenshot } from "./menus/iso-paja/index.js";
import { detectText } from "./ocr.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = process.env.STORAGE_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

export async function crawlAndUpload() {
  const menuImage = await getIsoPajaMenuScreenshot();
  const menuText = await detectText(menuImage);

  if (!menuText) throw new Error("No text detected");

  const imageFile = bucket.file("iso-paja.png");
  const textFile = bucket.file("iso-paja.txt");

  await Promise.all([
    imageFile
      .save(menuImage, {
        contentType: "image/png",
      })
      .then(() => {
        console.log(`Uploaded ${imageFile.name} to ${imageFile.publicUrl()}`);
      }),
    textFile
      .save(menuText, {
        contentType: "text/plain; charset=utf-8",
      })
      .then(() => {
        console.log(`Uploaded ${textFile.name} to ${textFile.publicUrl()}`);
      }),
  ]);

  console.log(`Uploaded Iso Paja menus to bucket ${bucketName}`);
}
