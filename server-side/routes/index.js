const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const movieRouter = require("./movieRouter");
const tvRouter = require("./tvRouter");
const creditRouter = require("./creditRouter");
const reviewRouter = require("./reviewRouter");
const seasonRouter = require("./seasonRouter");
const genreRouter = require("./genreRouter");
const personRouter = require("./personRouter");
const userRouter = require("./userRouter");
const ratingRouter = require("./ratingRouter");

router.use("/", resetRouter);
router.use("/movie", movieRouter);
router.use("/tv", tvRouter);
router.use("/credit", creditRouter);
router.use("/review", reviewRouter);
router.use("/season", seasonRouter);
router.use("/genre", genreRouter);
router.use("/person", personRouter);
router.use("/user", userRouter);
router.use("/rating", ratingRouter);

module.exports = router;
