const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
let port = process.env.PORT || 3000;


async function getVideo(URL) {
    const browser = await puppeteer.launch({headless: true});
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

app.get("/", (req, res) => {
    res.send("Hello World ! ! !");
});

app.get('/tiktok', async (req,res) => {
    var URL = req.query.URL;
    const gets = await getVideo(URL);
    res.json(gets)
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});