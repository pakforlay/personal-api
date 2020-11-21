const ytmus = require('express').Router();
const puppeteer = require("puppeteer");

async function ytMusic(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.320youtube.com/');

    await page.type('#inputUrl', `${URL}`);
    await page.click('body > div:nth-child(1) > div:nth-child(2) > form > p:nth-child(5) > button', {delay: 300});
    await page.waitForSelector('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-3 > img');
    let getImages = await page.$eval('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-3 > img', (element) => {
	return element.getAttribute('src');
    });
    await page.waitForSelector('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-9 > div.container > div > p > button');
    await page.click('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-9 > div.container > div > p > button');
    await page.waitForSelector('#download > div > div > a');
    let getVideo = await page.$eval('#download > div > div > a', (element) => {
        return element.getAttribute('href');
    });
 /* let titleInfo = await page.$eval('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-9 > p:nth-child(1)', el => el.innerText);
    let sizeInfo = await page.$eval('body > div:nth-child(1) > div:nth-child(4) > div > div.col-md-9 > p:nth-child(2)', el => el.innerText); */
	browser.close();
    return { getImages, getVideo, }
}

ytmus.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await ytMusic(URL);
    res.json(gets)
});

module.exports = ytmus;
