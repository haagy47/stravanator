const express = require("express");
const strava = require('strava-v3');
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);

module.exports = router;
