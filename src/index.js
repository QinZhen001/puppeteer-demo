import crawler from "./crawler/index"
// import test from "./test/index"


async function main() {
  try {
    // await test()
    await crawler()
  } catch (err) {
    console.error(err)
  }
}

main()
