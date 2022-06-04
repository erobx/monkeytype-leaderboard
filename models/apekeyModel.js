const mongoose = require("mongoose");

const apekeySchema = new mongoose.Schema({
    apekey: String
});

module.exports = mongoose.model("Apekeys", apekeySchema);