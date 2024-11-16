const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const { Apod } = require('../models/apod');
dotenv.config();

mongoose.connect('mongodb://localhost:27017/StarGaze').then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
});
const getData = async() =>{
    let res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=aa6NxK1Z8UAIKoFEwyTJ2C16rW2DIL48VTizwdWc&start_date=2024-10-01&end_date=2024-11-13`);
    return await res.data;
}
let data;
getData().then(res => {
    Apod.insertMany(res);
    console.log("done");
});
