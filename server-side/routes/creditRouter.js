const express = require("express");
const router = express.Router();
const creditController = require("../controllers").creditController;

router.get("/getByMovieId/:movie_id", creditController.getCreditsByMovieId);
router.get("/getByTvId/:tv_id", creditController.getCreditsByTvId);

module.exports = router;
