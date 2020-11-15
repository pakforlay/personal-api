const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

async function getYtVid(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://keepv.id/');
    
    await page.type('#dlURL', `${URL}`);
    await page.click('#dlBTNtext', {delay: 300});
    
    await page.waitForSelector('#results > div.row > div.col-12.col-md-6.col-lg-8 > a');
    let ytLink = await page.$eval('#results > div.row > div.col-12.col-md-6.col-lg-8 > a', (element) => {
        return element.getAttribute('href');
    });
	    return { ytLink }
 }
 
const app = express();

app.use(cors())

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server sedang berjalan di ${port}`);
});

app.get('/api/ytVid', async (req,res) => {
 var URL = req.query.url;
 const gets = await getYtVid(url);
    res.json(gets)
 });
