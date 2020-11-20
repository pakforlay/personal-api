const twimg = require('express').Router();
const puppeteer = require("puppeteer");

async function getData(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://downloader4twitter.com/');

    await page.type('#twitter_url', `${URL}`);
    await page.click('body > div.header > div > div.twitter-header-content > div.twitter-body > div > form > center > div > button > svg', { delay: 300 });

    await page.waitForSelector('#tweeter_search_form > div.center-content > div.img-preview-container > img', {delay: 300});
    let images = await page.$eval("#tweeter_search_form > div.center-content > div.img-preview-container > img", (element) => {
        return element.getAttribute("src");
    });
    	browser.close();
    return { images }
}

twimg.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getData(URL);
    res.json(gets)
});

module.exports = twimg;
