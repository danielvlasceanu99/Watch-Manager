const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const adminMiddleware = require("../middlewares").adminMiddleware;
const userMiddleware = require("../middlewares").userMiddleware;

// router.get("/getUser/:id", userController.getAllusers);
router.post("/login", userController.login);
router.get("/getUserData", userController.getUserData);
router.post("/register", userController.register);
router.put("/addToCollection", userController.addToCollection);
router.put("/removeFromCollection", userController.removeFromCollection);
router.put("/addRating", userController.addRating);

router.put("/follow", userMiddleware.userMiddleware, userController.follow);
router.put("/unfollow", userMiddleware.userMiddleware, userController.unfollow);
router.get("/getAllFollowed", userMiddleware.userMiddleware, userController.getAllFollowed);
router.get("/getUserLiked/:userId", userController.getUserLiked);

router.get("/getDashboardData", adminMiddleware.adminMiddleware, userController.getDashboardData);

module.exports = router;
