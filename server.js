if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apekeyModel = require('./models/apekeyModel');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Database
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (err) {
		console.log(err);
	}
};
connectDB();

// Monkeytype API
const { MonkeytypeClient } = require('monkeytype-js');
const monkeytypeClient = new MonkeytypeClient(
	'NjI4YWM5NWZhZDc0MjJiNThmMDdhYTE4LkQ5TngtQ2wydk52b0laYnFmV3lSZml1MFRoR3UwV3pU'
);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/add', async (req, res) => {
    const ak = req.body.apekey;
    const duplicate = await apekeyModel.findOne({ apekey: ak }).exec();
    if(duplicate) return res.sendStatus(409);
    try {
        await apekeyModel.create({"apekey": req.body.apekey});
    } catch (err) {
        console.log(err);
    }
	res.redirect('/');
});

app.get('/view', async (req, res) => {
	res.send(await apekeyModel.find().exec());
});

app.get('/api', async (req, res) => {
	const { data } = await monkeytypeClient.users.getPersonalBests('time', 60);
	res.send(data);
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	server.listen(process.env.PORT || 3000);
});

