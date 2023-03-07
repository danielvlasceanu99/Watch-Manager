const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.get("/getUsers", userController.getAllusers);

module.exports = router;
