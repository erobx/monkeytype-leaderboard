const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Database
const db = new sqlite3.Database('./database/apekeys.db');

db.run('CREATE TABLE IF NOT EXISTS APEKEYS (apekey TEXT NOT NULL)');

// Monkeytype API
// const { MonkeytypeClient } = require('monkeytype-js');
// const monkeytypeClient = new MonkeytypeClient(
// 	'NjI4YWM5NWZhZDc0MjJiNThmMDdhYTE4LkQ5TngtQ2wydk52b0laYnFmV3lSZml1MFRoR3UwV3pU'
// );


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/add', (req, res) => {
	db.serialize(() => {
		db.run(
			'INSERT INTO APEKEYS (apekey) VALUES(?)',
			[req.body.apekey],
			function (err) {
				if (err) {
					return console.log(err.message);
				}
				res.send(
					'New employee has been added into the database with ID = ' + req.body.apekey);
			}
		);
	});
});

app.get('/close', function (req, res) {
	db.close((err) => {
		if (err) {
			res.send('There is some error in closing the database');
			return console.error(err.message);
		}
		console.log('Closing the database connection.');
		res.send('Database connection successfully closed');
	});
});

app.get('/api', async (req, res) => {
	const { data } = await monkeytypeClient.users.getPersonalBests('time', 60);
	res.send(data);
});

server.listen(process.env.PORT || 3000);