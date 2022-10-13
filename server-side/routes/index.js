const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const movieRouter = require("./movieRouter");
const tvRouter = require("./tvRouter");
const personRouter = require("./personRouter");
const reviewRouter = require("./reviewRouter");

router.use("/", resetRouter);
router.use("/movie", movieRouter);
router.use("/tv", tvRouter);
router.use("/person", personRouter);
router.use("/review", reviewRouter);

module.exports = router;
