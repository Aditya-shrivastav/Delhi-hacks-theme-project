ProjectData = {};

//express to run server and routes

const express = require('express');
const app = express();

//cors for cross origin alliance

const cors = require('cors');
app.use(cors());

//middleware

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//server setup

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, () => {
    console.log("Server is Running");
    console.log(`Running on localhost : ${port}`);
});

// get method route

app.get('/all', (req, res) => {
    res.send(ProjectData);
});

// post method route

app.post('/add', (req, res) => {
    console.log(req.body);

    ProjectData['date'] = req.body.date;
    ProjectData['temp'] = req.body.temp;
    ProjectData['humidity'] = req.body.humidity;
    ProjectData['weather'] = req.body.weather;
    ProjectData['pressure'] = req.body.pressure;

    res.send(ProjectData);
});