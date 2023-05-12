const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const adminMiddleware = require("../middlewares").adminMiddleware;

// router.get("/getUser/:id", userController.getAllusers);
router.post("/login", userController.login);
router.get("/getUserData", userController.getUserData);
router.post("/register", userController.register);
router.put("/addToCollection", userController.addToCollection);
router.put("/removeFromCollection", userController.removeFromCollection);
router.put("/addRating", userController.addRating);

router.get("/getDashboardData", adminMiddleware.adminMiddleware, userController.getDashboardData);

module.exports = router;
