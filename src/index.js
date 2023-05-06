import puppeteer from "puppeteer";
import { apiGetData } from "./utils/index";
import test from "./testPuppeteer/index"
import debug from "debug";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from 'node:url'

const log = debug("app:error");
const url = 'https://juejin.cn/books';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pngPath = resolve(__dirname, '../data/yoursite.png')
const dataPath = resolve(__dirname, './data/data.json')

// title lastedPrice
let result = []


const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 500;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        console.log("totalHeight", totalHeight)
        // console.log("scrollHeight", scrollHeight)
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}


// const elem = await page.$('.course-content');
// const boundingBox = await elem.boundingBox();
// await page.mouse.move(
//   boundingBox.x + boundingBox.width / 2,
//   boundingBox.y + boundingBox.height / 2
// );
// y轴移动1000px
// await page.mouse.wheel({ deltaY: 10000 });
// await page.waitForSelector
// await page.waitForFunction('window.scrollY > 5000')

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // 设置浏览器视窗
  // page.setViewport({
  //   width: 1376,
  //   height: 768,
  // })
  await page.goto(url, {
    waitUntil: 'networkidle0'
  });
  await autoScroll(page);
  await page.screenshot({
    path: pngPath,
    fullPage: true
  });

  // const html = await page.content();
  const items = await page.$$(".book-card-item")
  for (let i = 0;i < items.length;i++) {
    const item = items[i];
    const titleNode = await item.$(".text-highlight")
    const titleText = await page.evaluate((title) => {
      return title.innerHTML
    }, titleNode)

    const priceNode = await item.$(".lasted-price")
    const priceText = await page.evaluate((priceNode) => {
      return priceNode?.childNodes[2]?.textContent.trim()
    }, priceNode)

    result.push({
      title: titleText,
      lastedPrice: priceText
    })
  }
  console.log("result len: ", result.length)
  console.log(result)

  await writeFile(dataPath, JSON.stringify(result));
  await browser.close();
}

async function main() {
  try {
    // testHtml()
    // test()
    await run()
  } catch (err) {
    console.error(err)
  }
}

main()
