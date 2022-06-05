const mongoose = require('mongoose');

const apekeySchema = new mongoose.Schema({
	apekey: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Apekey', apekeySchema);
