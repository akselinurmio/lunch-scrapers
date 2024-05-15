import puppeteer from "puppeteer";

export async function getIsoPajaMenuScreenshot() {
  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto("https://www.hhravintolat.fi/iso-paja");

    await page.waitForSelector('[data-testid="richTextElement"]');

    const boundingBox = await page.evaluate(() => {
      const weekdays = ["su", "ma", "ti", "ke", "to", "pe", "la"];

      const today = new Date();
      const currentWeekday = weekdays[today.getDay()];

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeekday = weekdays[tomorrow.getDay()];

      const startRegex = new RegExp(
        `^\\s*${currentWeekday}\\s+0?${today.getDate()}\\.0?${
          today.getMonth() + 1
        }\\s*$`,
        "i"
      );
      const startElement = Array.from(document.querySelectorAll("*")).find(
        (el) => startRegex.test(el.textContent)
      );

      const endRegex = new RegExp(
        `^\\s*${nextWeekday}\\s+0?${tomorrow.getDate()}\\.0?${
          tomorrow.getMonth() + 1
        }\\s*$`,
        "i"
      );
      const endElement = Array.from(document.querySelectorAll("*")).find((el) =>
        endRegex.test(el.textContent)
      );

      if (!startElement) throw new Error("Start element not available");

      if (endElement) {
        const range = document.createRange();
        range.setStartAfter(startElement);
        range.setEndAfter(endElement);

        let { x, y, width, height } = range.getBoundingClientRect();
        height -= endElement.getBoundingClientRect().height;

        return { x, y, width, height };
      } else {
        let { x, y, width, height } = startElement.getBoundingClientRect();
        height = height * 12;

        return { x, y, width, height };
      }
    });

    return await page.screenshot({
      clip: boundingBox,
    });
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
}
