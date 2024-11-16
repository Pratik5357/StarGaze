const axios = require("axios");
const { Apod } = require("../models/apod");

module.exports.getApod = async (req,res) => {
    let date = req.params;
    let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date.id}`);  
    res.send(response.data);
}

module.exports.getNews = async (req,res) => {
    let response = await axios.get("https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=5");
    res.send(response.data);
}

module.exports.manyApod = async (req,res) => {
    let data = await Apod.find();
    res.send(data);
}

module.exports.todayApod = async (req,res) =>{
    let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);  
    let apod = response.data;
    let existing_data = await Apod.find({date : apod.date});
    if(existing_data.length === 0){
        let newApod = new Apod({
            date: apod.date,
            title: apod.title,
            explanation: apod.explanation,
            url: apod.url,
            media_type: apod.media_type,
            hdurl: apod.hdurl,
        });
        await newApod.save();
        console.log("saved");
    }
    res.send(apod);
}

module.exports.getAllNews = async (req,res) => {
    let response = await axios.get("https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=20");
    res.send(response.data);
}