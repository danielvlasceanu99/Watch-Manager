const express = require("express");
const router = express.Router();
const tvController = require("../controllers").tvController;

router.get("/latest", tvController.getLatest);
router.get("/get/:id", tvController.getById);

module.exports = router;
