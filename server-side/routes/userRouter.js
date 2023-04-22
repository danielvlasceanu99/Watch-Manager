const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

// router.get("/getUser/:id", userController.getAllusers);
router.post("/login", userController.login);
router.get("/getUserData", userController.getUserData);
router.post("/register", userController.register);
router.put("/addToCollection", userController.addToCollection);
router.put("/removeFromCollection", userController.removeFromCollection);

module.exports = router;
