const express = require("express");
const router = express.Router();
const personController = require("../controllers").personController;

router.get("/search", personController.search);
router.get("/get/:id", personController.getById);

module.exports = router;
