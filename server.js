const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    res.send(req.body.apekey);
});

app.get('/api', async (req, res) => {
	const { data } = await monkeytypeClient.users.getPersonalBests('time', 60);
	res.send(data);
});

server.listen(process.env.PORT || 3000);