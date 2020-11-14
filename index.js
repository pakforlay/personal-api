const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

async function getVideo(URL) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://musicallydown.com');

    await page.type('#link_url', `${URL}`);
    await page.waitForSelector('.btn.waves-effect.waves-light.orange', {visible: true});
    await page.click('.btn.waves-effect.waves-light.orange', { delay: 300 });

    await page.waitForSelector('#video');
    let poster = await page.$eval("#video", (element) => {
        return element.getAttribute("poster");
    });
    let mp4direct = await page.$eval("#welcome > div > div:nth-child(2) > div.col.s12.l8.left-align > a:nth-child(6)", (element) => {
        return element.getAttribute("href");
    });
    return { poster, mp4direct }
}
const app = express();

app.use(cors())

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server sedang berjalan di ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World ! ! !')
});

app.get('/tiktok', async (req,res) => {
    var URL = req.query.URL;
    const gets = await getVideo(URL);
    res.json(gets)
});