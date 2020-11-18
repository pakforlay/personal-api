const INSTAGRAM = require('express').Router();
const puppeteer = require("puppeteer");

async function IG(URL) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://downloadgram.com/');

    await page.type('#dg-url', `${URL}`);
	await page.click('#dg-submit', {delay: 300});

    await page.waitForSelector('#results > div > a', {delay: 300);
    let getData = await page.$eval('#results > div > a', (element) => {
        return element.getAttribute('href');
    });
    return { getData }
}

youtube.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await IG(URL);
    res.json(gets)
});

module.exports = INSTAGRAM;
