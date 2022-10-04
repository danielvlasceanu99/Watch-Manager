const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/latest", movieController.getLatest);

module.exports = router;
