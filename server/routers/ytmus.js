const ytmus = require('express').Router();
const puppeteer = require("puppeteer");

async function ytMusic(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://youtubetomp3.sc/');

    await page.type('#videoURL', `${URL}`);
	await page.waitForSelector('#ftype > optgroup:nth-child(1) > option:nth-child(5)');
	await page.click('#conversionForm > button', {delay: 300});

    await page.waitForSelector('#conversionSuccess > p:nth-child(5) > a', {delay: 10000});
    let getMusic = await page.$eval('#conversionSuccess > p:nth-child(5) > a', (element) => {
        return element.getAttribute('href');
    });
	browser.close()
    return { getMusic }
}

ytmus.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await ytMusic(URL);
    res.json(gets)
});

module.exports = ytmus;
