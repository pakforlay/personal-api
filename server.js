const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const eventsRouter = require('./server/routers/events-router');
const tiktok = require('./server/routers/tik');
const youtube = require('./server/routers/ytvid');

const app = express();
const port = 80;

app.use(morgan('dev'));
app.use(express.static('client'));


// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,recording-session");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/events', eventsRouter);
app.use('/tiktok', tiktok);
app.use('/ytvid', youtube);

app.listen(port);
console.log("Running app on port port. Visit: http://localhost:" + port + "/");

