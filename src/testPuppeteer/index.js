import puppeteer from "puppeteer";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from 'node:url'
import debug from "debug";

const log = debug("app:pupeeteer");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfPath = resolve(__dirname, '../data/test.pdf')
const screenshotPath = resolve(__dirname, '../data/screenshot.png')




const testVersion = async (browser) => {
  console.log(await browser.version());
}

const testPdf = async (browser) => {
  log("testPdf start")
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
  await page.pdf({ path: pdfPath, format: 'A4' });
  log("testPdf end")
}

const testScreenshot = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com');
  await page.screenshot({ path: screenshotPath });
}

const testEvaluate = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com');
  // const three = await page.evaluate(() => {
  //   return 1 + 2;
  // });
  //   const three = await page.evaluate(`
  //     1 + 2
  // `);
  const body = await page.evaluate(() => {
    return document.body;
  });
  console.log(body);
  // console.log(three);
}


// main test function
const test = async () => {
  // headless: "new
  const browser = await puppeteer.launch();
  // await testVersion(browser)
  // await testPdf(browser)
  // await testScreenshot(browser)
  await testEvaluate(browser)
  await browser.close();
}


export default test
