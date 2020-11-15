const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const app = express();

app.use(cors())

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server sedang berjalan di ${port}`);
});


app.get('', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/api/tik', async (req, res) => {
    res.sendFile(__dirname + '/tik.js')
    var url = req.query.url;
    const gets = await getVideo(url);
    res.json(gets)
});

app.get('/api/ytVid', async (req,res) => {
    res.sendFile(__dirname + '/ytMus.js')
    var url = req.query.url;
    const gets = await getYtVid(url);
    res.json(gets)
});