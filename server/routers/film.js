const film = require('express').Router();
const puppeteer = require("puppeteer");

async function getFilm(URL) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('http://149.56.24.226/');

    await page.type('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__query > input', `${URL}`);
	await page.click('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__button > button', {delay: 300});

    await page.waitForSelector('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a');
    let getVideo = await page.$eval('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a', (element) => {
        return element.getAttribute('href');
    });
    let titleInfo = await page.$eval('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2', el => el.innerText);
	browser.close()
    return { getFilm, titleInfo }
}

film.get('/', async (req, res) => {
    var URL = req.query.URL;
    const gets = await getFilm(URL);
    res.json(gets)
});

module.exports = film;
