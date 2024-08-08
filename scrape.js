const puppeteer = require("puppeteer");

const website = "https://bringatrailer.com/auctions/";

// const currentAuctionData = [];
const auctionURLList = [];

const scrapeInfiniteScrollItems = async (page) => {
  while (true) {
    const previousHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    // await page.waitForTimeout(1000);
    const newHeight = await page.evaluate("document.body.scrollHeight");

    // break and exit the loop if the page height did not change
    if (newHeight === previousHeight) {
      break;
    }
  }
};

const getData = async (url, browser) => {
  const page = await browser.newPage();
  await page.goto(url);
  await scrapeInfiniteScrollItems(page);

  const currentAuction = await page.$$eval(
    "a.listing-card.bg-white-transparent",
    (auctions) => {
      return auctions.map((auction) => {
        const url = auction.href;
        return { url };
      });
    }
  );

  auctionURLList.push(...currentAuction);
  await page.close();
};

async function runScraper() {
  const browser = await puppeteer.launch({ headless: "new" });
  if (browser === null) {
    console.error("✖ Browser could not be launched");
    return;
  }
  try {
    console.log("Starting the scraping job...");
    const page = await browser.newPage();
    await scrapeInfiniteScrollItems(page);
    await getData(website, browser);
    console.log("Scraping job finished");
  } catch (error) {
    console.error(`✖ An error ocurred: ${error.message}`);
  } finally {
    // await outputData();
    console.log(`Number of URL scraped: ${auctionURLList.length}`);
    await browser.close();
    console.log("Browser closed");
  }
}

runScraper();
