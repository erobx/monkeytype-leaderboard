if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const apekeyModel = require('./models/apekeyModel');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Monkeytype API
// const { MonkeytypeClient } = require('monkeytype-js');
// const monkeytypeClient = new MonkeytypeClient(
// 	'NjI4YWM5NWZhZDc0MjJiNThmMDdhYTE4LkQ5TngtQ2wydk52b0laYnFmV3lSZml1MFRoR3UwV3pU'
// );


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/add', (req, res) => {
        var apekey = new apekeyModel({
            apekey: req.body.apekey
        });
        apekey.save();
        console.log('Success!');
        res.redirect('/');
});

app.get('/view', async (req, res) => {
    res.send(await apekeyModel.find({ apekey: req.body.id }).exec());
});

app.get('/api', async (req, res) => {
	const { data } = await monkeytypeClient.users.getPersonalBests('time', 60);
	res.send(data);
});

server.listen(process.env.PORT || 3000);