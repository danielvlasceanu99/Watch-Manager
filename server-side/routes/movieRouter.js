const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/latest", movieController.getLatest);
router.get("/get", movieController.get);
router.get("/get/:id", movieController.getById);

module.exports = router;
