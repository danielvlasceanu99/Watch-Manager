const express = require("express");
const router = express.Router();
const reviewController = require("../controllers").reviewController;

router.get("/getByMovieId/:movie_id", reviewController.getReviewsByMovieId);
router.get("/getByTvId/:tv_id", reviewController.getReviewsByTvId);
router.get("/getByUserId/:user_id", reviewController.getReviewsByUserId);
router.post("/addReview", reviewController.addReview);

module.exports = router;
