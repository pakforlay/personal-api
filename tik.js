const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

async function getVideo(url) {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})    ;
    const page = await browser.newPage();
    await page.goto('https:musicallydown.com');

    await page.type('#link_url', `${url}`);
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

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server sedang berjalan di ${port}`);
});


app.get('/api/tik', async (req,res) => {
    var url = req.query.url;
    const gets = await getVideo(url);
    res.json(gets)
});