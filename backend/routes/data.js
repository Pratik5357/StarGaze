const express = require('express');
const router = express.Router();
const { getApod, getNews, manyApod, todayApod, getAllNews } = require("../controller/data.js");

router.get("/apod", manyApod);
router.get("/apod/:id", getApod);
router.get("/todaysApod",todayApod);
router.get("/news", getNews);
router.get("/allNews", getAllNews);

module.exports = router;    