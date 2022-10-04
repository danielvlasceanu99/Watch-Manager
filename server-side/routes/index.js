const express = require("express");
const router = express.Router();

const resetRouter = require("./reset");
const movieRouter = require("./movieRouter");

router.use("/", resetRouter);
router.use("/movie", movieRouter);

module.exports = router;
