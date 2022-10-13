const express = require("express");
const router = express.Router();
const personController = require("../controllers").personController;

router.get("/getByMovieId/:movie_id", personController.getCastByMovieId);

module.exports = router;
