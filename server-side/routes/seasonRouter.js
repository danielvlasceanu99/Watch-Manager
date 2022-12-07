const express = require("express");
const router = express.Router();
const seasonController = require("../controllers").seasonController;

router.get("/getByTvId/:tv_id", seasonController.getSeasonsByTvId);

module.exports = router;
