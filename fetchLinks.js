import puppeteer from "puppeteer";
import fs from "fs";
import { setTimeout } from "node:timers/promises";

const url = "https://bringatrailer.com/auctions/";

const fetchLinks = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: "/usr/bin/google-chrome",
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        console.log("scrolling 1");
        while (true) {
            const previousHeight = await page.evaluate(
                "document.body.scrollHeight"
            );
            await page.evaluate(
                "window.scrollTo(0, document.body.scrollHeight)"
            );
            await setTimeout(1000);
            const newHeight = await page.evaluate("document.body.scrollHeight");

            if (newHeight === previousHeight) {
                break;
            }
        }
        console.log("going to page");
        await page.goto(url, { waitUntil: "networkidle2" });
        console.log("scrolling 2");
        while (true) {
            const previousHeight = await page.evaluate(
                "document.body.scrollHeight"
            );
            await page.evaluate(
                "window.scrollTo(0, document.body.scrollHeight)"
            );
            await setTimeout(1000);
            const newHeight = await page.evaluate("document.body.scrollHeight");

            if (newHeight === previousHeight) {
                break;
            }
        }
        console.log("getting links");
        const auctionLinks = await page.$$eval(
            "a.listing-card.bg-white-transparent",
            (auctions) => {
                return auctions.map((auction) => auction.href);
            }
        );

        fs.writeFileSync("auctionLinks.txt", auctionLinks.join("\n"), "utf-8");

        await browser.close();

        return;
    } catch (error) {
        throw new Error(error.message);
    }
};

fetchLinks();
