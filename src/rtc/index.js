// https://www.browserless.io/blog/2022/06/10/webrtc-video-automation/
import puppeteer from "puppeteer";
import { resolve } from "node:path";
import { __srcname } from "../utils/index"

export const testWebRtc = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--no-sandbox',
      ]
    })
    const page = await browser.newPage();
    await page.useFileForFakeVideoCapture(resolve(__srcname, "./data/video.mp4"));

    await page.goto(
      `https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos/_sample_.demo.html`,
    );
  } catch (err) {
    console.error(err)
  }
}
