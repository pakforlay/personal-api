const youtube = require('express').Router();
const puppeteer = require("puppeteer");

async function getYtVid(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://keepv.id/');

    await page.type('#dlURL', `${URL}`);
	await page.click('#dlBTN1', {delay: 300});

    await page.waitForSelector('#results > div.row > div.col-12.col-md-6.col-lg-8 > a');
    let getVideo = await page.$eval('#results > div.row > div.col-12.col-md-6.col-lg-8 > a', (element) => {
        return element.getAttribute('href');
    });
    let titleInfo = await page.$eval('#results > h2', el => el.innerText);
	browser.close()
    return { getVideo, titleInfo }
}

youtube.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getYtVid(URL);
    res.json(gets)
});

module.exports = youtube;
