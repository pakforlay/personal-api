const film = require('express').Router();
const puppeteer = require("puppeteer");

async function getFilm(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://pahe.ph/');

    await page.type('#s-header', `${URL}`);
	await page.click('#searchform-header > button > i', {delay: 300});

    await page.waitForSelector('#main-content > div.content > div.post-listing.archive-box > div > div > ul:nth-child(3) > li > div.timeline-content > h2 > a');
    let getVideo = await page.$eval('#main-content > div.content > div.post-listing.archive-box > div > div > ul:nth-child(3) > li > div.timeline-content > h2 > a', (element) => {
        return element.getAttribute('href');
    });
    let titleInfo = await page.$eval('#main-content > div.content > div.post-listing.archive-box > div > div > ul:nth-child(3) > li > div.timeline-content > h2', el => el.innerText);
	browser.close()
    return { getFilm, titleInfo }
}

film.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getFilm(URL);
    res.json(gets)
});

module.exports = film;
