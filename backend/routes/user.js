const express = require('express');
const { createUser, getLogin, getVerified, getUser, getLogout } = require('../controller/user');
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", getLogin);
router.get("/auth", getVerified, getUser);
router.post('/logout', getLogout);

module.exports = router;