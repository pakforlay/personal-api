const express = require("express");
const app = express();
const tiktok = require("./tiktok.js");
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World ! ! !");
});

app.get("/tik", (req, res) => {
    res.send(tiktok);
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});