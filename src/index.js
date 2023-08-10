import crawler from "./crawler/index"
// import test from "./test/index"
import { testWebRtc } from "./rtc/index"

async function main() {
  try {
    // await test()
    // await crawler()
    // await testWebRtc()
  } catch (err) {
    console.error(err)
  }
}

main()
