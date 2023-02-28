const express = require("express");
const router = express.Router();
const creditController = require("../controllers").creditController;

router.get("/getByMovieId/:movie_id", creditController.getCreditsByMovieId);
router.get("/getByTvId/:tv_id", creditController.getCreditsByTvId);
router.get("/getByPersonId/:person_id", creditController.getCreditsByPersonId);

module.exports = router;
