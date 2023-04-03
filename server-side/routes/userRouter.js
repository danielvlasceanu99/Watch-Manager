const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

// router.get("/getUser/:id", userController.getAllusers);
router.post("/login", userController.login);

module.exports = router;
