const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const movieRouter = require("./movieRouter");
const tvRouter = require("./tvRouter");
const creditRouter = require("./creditRouter");
const reviewRouter = require("./reviewRouter");
const seasonRouter = require("./seasonRouter");
const genreRouter = require("./genreRouter");

router.use("/", resetRouter);
router.use("/movie", movieRouter);
router.use("/tv", tvRouter);
router.use("/credit", creditRouter);
router.use("/review", reviewRouter);
router.use("/season", seasonRouter);
router.use("/genre", genreRouter);

module.exports = router;
