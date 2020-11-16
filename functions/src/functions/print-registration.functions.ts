import {BoundingBox, ElementHandle} from 'puppeteer';

const puppeteer = require('puppeteer');

const width = 797;
const height = 2600;

export async function printRegistration(url: string): Promise<Buffer> {
  console.log(`printRegistration(${url})`);

  const browserPromise = puppeteer.launch({
    args: [
      '--disable-infobars',
      '--no-sandbox',
      `--window-size=${width},${height}`
    ],
    // headless: false
  });

  const browser = await browserPromise;
  const page = await browser.newPage();
  await page.setViewport({width: width, height: height, deviceScaleFactor: 2});

  // Wait
  await page.goto(url, {waitUntil: 'networkidle2'});

  // Wait all images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) {
        return Promise.resolve(null);
      }
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    }));
  });

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

  await page.close();
  await browser.close();

  return buffer;
}

export async function printEquipment(url: string): Promise<Buffer> {
  console.log(`printEquipment(${url})`);

  const browserPromise = puppeteer.launch({
    args: [
      '--disable-infobars',
      '--no-sandbox',
      `--window-size=${width},${height}`
    ],
    // headless: false
  });

  const browser = await browserPromise;
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('.shortSize', {visible: true});
  await page.waitForSelector('.shoeSize', {visible: true});
  await page.evaluate(() => {
    const body: HTMLElement = document.querySelector('body');
    body.style.height = 'inherit';
    body.style.overflow = 'initial';

    const appRoot: HTMLElement = document.querySelector('app-root');
    appRoot.style.overflow = 'initial';
    const appFootbalCampPrintEquipment: HTMLElement = document.querySelector('app-football-camp-print-equipment');
    appRoot.innerHTML = appFootbalCampPrintEquipment.outerHTML;
  });

  const buffer = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {left: '0cm', top: '0cm', right: '0cm', bottom: '0cm'}
  });

  await page.close();
  await browser.close();

  return buffer;
}

export async function printReceipt(url: string): Promise<Buffer> {
  console.log(`printReceipt(${url})`);

  const browserPromise = puppeteer.launch({
    args: [
      '--disable-infobars',
      '--no-sandbox',
      `--window-size=${width},${height}`
    ],
  });

  const browser = await browserPromise;
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  // Wait selector
  await page.waitForSelector('.ready-to-print', {visible: true});

  // Wait all images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) {
        return Promise.resolve(null);
      }
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    }));
  });

  await page.evaluate(() => {
    const body: HTMLElement = document.querySelector('body');
    body.style.height = 'inherit';
    body.style.overflow = 'initial';

    const appRoot: HTMLElement = document.querySelector('app-root');
    appRoot.style.overflow = 'initial';
    const appFootbalCampPrintEquipment: HTMLElement = document.querySelector('app-football-camp-print-receipt');
    appRoot.innerHTML = appFootbalCampPrintEquipment.outerHTML;
  });

  const buffer = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {left: '0cm', top: '0cm', right: '0cm', bottom: '0cm'}
  });

  await page.close();
  await browser.close();

  return buffer;
}

export async function printRegistrations(url: string): Promise<Buffer> {
  console.log(`printRegistrations(${url})`);

  const browserPromise = puppeteer.launch({
    args: [
      '--disable-infobars',
      '--no-sandbox',
      `--window-size=${width},${height}`
    ],
  });

  const browser = await browserPromise;
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  // Wait selector
  await page.waitForSelector('.ready-to-print', {visible: true});

  // Wait all images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) {
        return Promise.resolve(null);
      }
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    }));
  });

  await page.evaluate(() => {
    const body: HTMLElement = document.querySelector('body');
    body.style.height = 'inherit';
    body.style.overflow = 'initial';

    const appRoot: HTMLElement = document.querySelector('app-root');
    appRoot.style.overflow = 'initial';
    const appFootbalCampPrintEquipment: HTMLElement = document.querySelector('app-football-camp-print-registrations');
    appRoot.innerHTML = appFootbalCampPrintEquipment.outerHTML;
  });

  const buffer = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {left: '0cm', top: '0cm', right: '0cm', bottom: '0cm'}
  });

  await page.close();
  await browser.close();

  return buffer;
}
