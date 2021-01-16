const youtube = require('express').Router();
const puppeteer = require("puppeteer");

async function getYtVid(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.y2mate.com/');

    await page.type('#txt-url', `${URL}`);
	await page.click('#btn-submit', {delay: 300});
	await page.click('#mp4 > table > tbody > tr:nth-child(2) > td.txt-center > a', {delay: 300});

    await page.waitForSelector('#process-result > div > a');
    let getVideo = await page.$eval('#process-result > div > a', (element) => {
        return element.getAttribute('href');
    });
    let titleInfo = await page.$eval('#exampleModalLabel', el => el.innerText);
	browser.close()
    return { getVideo, titleInfo }
}

youtube.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getYtVid(URL);
    res.json(gets)
});

module.exports = youtube;
