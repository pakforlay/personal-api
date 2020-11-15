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