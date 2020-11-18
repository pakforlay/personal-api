const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

async function getYtVid(URL) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://youtubetomp3.sc/');

    await page.type('#videoURL', `${URL}`);
	await page.waitForSelector('#ftype > optgroup:nth-child(1) > option:nth-child(5)');
	await page.click('#conversionForm > button', {delay: 300});

    await page.waitForSelector('#conversionSuccess > p:nth-child(5) > a');
    let getVideo = await page.$eval('#conversionSuccess > p:nth-child(5) > a', (element) => {
        return element.getAttribute('href');
    });
    return { getVideo }
}

const app = express();

app.use(cors())

app.listen(4000, () => {
    console.log("Server berjalan di port 4000");
});

app.get('/ytVid', async (req,res) => {
    var URL = req.query.URL;
    const gets = await getYtVid(URL);
    res.json(gets)
});
