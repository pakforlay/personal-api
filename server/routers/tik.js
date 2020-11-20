const tiktok = require('express').Router();
const puppeteer = require("puppeteer");

async function getVideo(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://snaptik.app/');

    await page.type('#url', `${URL}`);
    await page.click('#send', { delay: 300 });

    await page.waitForSelector('#download-block > div > a:nth-child(3)', {delay: 300});
    let mp4direct = await page.$eval("#download-block > div > a:nth-child(3)", (element) => {
        return element.getAttribute("href");
    });
    let image = await page.$eval("#div_download > section > div > div > div > article > div.zhay-left.left > img", (element) => {
        return element.getAttribute("src");
    });
	let textInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(2) > span', el => el.innerText);
	let nameInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > h1 > a', el => el.innerText);
	let timeInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(3) > b', el => el.innerText);
	browser.close();
    return { mp4direct, image, textInfo, nameInfo, timeInfo }
}

tiktok.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getVideo(URL);
    res.json(gets)
});

module.exports = tiktok;
