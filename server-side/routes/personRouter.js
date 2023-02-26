const express = require("express");
const router = express.Router();
const personController = require("../controllers").personController;

router.get("/search", personController.search);

module.exports = router;
