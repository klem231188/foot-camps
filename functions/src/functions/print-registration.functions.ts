import {BoundingBox, ElementHandle} from 'puppeteer';
const puppeteer = require('puppeteer');

export async function printRegistration(url: string): Promise<Buffer> {
  console.log(`printRegistration(${url})`);

  const width = 800;
  const height = 1200;

  const browser = await puppeteer.launch({
    //headless: false,
    //slowMo: 250,
    args: [
      '--disable-infobars',
      `--window-size=${width},${height}`
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({width: width, height: height, deviceScaleFactor: 2});
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitFor(2000); // Wait that image loads

  const elementHandle: ElementHandle = await page.$('.print-container');
  const boundingBox: BoundingBox = await elementHandle.boundingBox();
  await elementHandle.dispose();

  const buffer = await page.screenshot({
    clip: {
      x: boundingBox.x,
      y: boundingBox.y + 1,
      width: boundingBox.width,
      height: boundingBox.height
    }
  });

  await browser.close();

  return buffer;
}
