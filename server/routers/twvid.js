const twvid = require('express').Router();
const puppeteer = require("puppeteer");

async function getData(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://downloader4twitter.com/');

    await page.type('#twitter_url', `${URL}`);
	  await page.click('body > div.header > div > div.twitter-header-content > div.twitter-body > div > form > center > div > button > svg', {delay: 300});

    await page.waitForSelector('#tweeter_search_form > div.center-content > div.button-container > div:nth-child(2) > a.btn-play');
  	await page.click('#tweeter_search_form > div.center-content > div.button-container > div:nth-child(2) > a.btn-play');
    let getVideo = await page.$eval('#twitter_video', (element) => {
        return element.getAttribute('src');
    });
	browser.close();
    return { getVideo }
}

twvid.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getData(URL);
    res.json(gets)
});

module.exports = twvid;
