const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;

router.get("/latest", movieController.getLatest);
router.get("/search", movieController.search);
router.get("/filter", movieController.filter);
router.get("/get/:id", movieController.getById);
router.get("/getByList", movieController.getByList);

module.exports = router;
