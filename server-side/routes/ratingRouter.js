const express = require("express");
const router = express.Router();
const ratingController = require("../controllers").ratingController;

const userMiddleware = require("../middlewares").userMiddleware;

router.get("/getAverageMovieRating/:id", ratingController.getAverageMovieRating);
router.get("/getAverageTvRating/:id", ratingController.getAverageTvRating);

module.exports = router;
