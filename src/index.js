import { apiGetData } from "./utils/index";
import test from "./testPuppeteer/index"
import debug from "debug";
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from 'node:url'

const log = debug("app:error");
const url = 'https://juejin.cn/books';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const htmlPath = resolve(__dirname, './data/message.html')



async function main() {
  try {
    // const res = await apiGetData(url)
    // log("write start")
    // await writeFile(htmlPath, res);
    // log("write end")
    test()
  } catch (err) {
    console.error(err)
  }
}

main()
