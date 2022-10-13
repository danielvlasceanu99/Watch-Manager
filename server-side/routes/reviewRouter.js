const express = require("express");
const router = express.Router();
const reviewController = require("../controllers").reviewController;

router.get("/getByMovieId/:movie_id", reviewController.getReviewsByMovieId);

module.exports = router;
