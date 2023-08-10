import puppeteer from "puppeteer";
import { resolve, dirname } from "node:path";
import { apiGetData } from "../utils/index";
import { __srcname } from "../utils/index";
import debug from "debug";

const log = debug("app:pupeeteer");


const pdfPath = resolve(__srcname, './data/test.pdf')
const screenshotPath = resolve(__srcname, './data/screenshot.png')
const htmlPath = resolve(__srcname, './data/message.html')



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

const testHtml = async (url) => {
  // const res = await apiGetData(url)
  // log("write start")
  // await writeFile(htmlPath, res);
  // log("write end")
}



// main test function
const test = async () => {
  // headless: "new
  const browser = await puppeteer.launch();
  // await testVersion(browser)
  await testPdf(browser)
  // await testScreenshot(browser)
  // await testEvaluate(browser)
  await browser.close();
}


export default test


client.on("stream-message", (uid, data) => {
  data = JSON.parse(Uint8ArrayToString(data))
  let { type, songCode, status, position = 0, realPosition = 0, ntp } = data
  if (!type) {
    return
  }
  console.log("stream-message received", data)
  switch (type) {
    case 4:
      // 转态改变
      let newTime = position / 1000
      newTime = newTime > 0 ? newTime : 0
      if (this.status == ENMU_BGM_STATUS.IDLE) {
        if (this.role == "audience") {
          // 观众
          // 使用 realPosition
          realPosition = realPosition / 1000
          realPosition = realPosition > 0 ? realPosition : 0
          realPosition = realPosition - (window.renderDelay / 1000)
          if (Math.abs(this.currentTime - realPosition) > 1000) {
            return
          }
          this.currentTime = realPosition
          engine.setTime(this.currentTime);
          if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
          }
          intervalId = setInterval(() => {
            if ((this.currentTime + 0.02) > engine.totalTime) {
              clearInterval(intervalId)
              intervalId = null
              return
            }
            this.currentTime += 0.02
            engine.setTime(this.currentTime);
          }, 20)
        } else {
          // 伴唱
          // 未开始时记录远端主唱进度
          this.currentTime = newTime
        }
      }
      break
  }
});
