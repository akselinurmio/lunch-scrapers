import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient();

export async function detectText(image) {
  const [result] = await client.textDetection(image);

  return result.fullTextAnnotation.text;
}
