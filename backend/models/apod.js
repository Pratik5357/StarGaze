const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apodSchema = new Schema({
    date: String,
    title: String,
    explanation: String,
    url: String,
    media_type: String,
    hdurl: String,
});

module.exports.Apod = mongoose.model("Apod", apodSchema);



