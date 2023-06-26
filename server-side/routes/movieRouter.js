const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;
const adminMiddleware = require("../middlewares").adminMiddleware;

router.get("/latest", movieController.getLatest);
router.get("/search", movieController.search);
router.get("/filter", movieController.filter);
router.get("/get/:id", movieController.getById);
router.get("/getByList", movieController.getByList);
router.get("/getAll", movieController.getAll);
router.get("/getRecomandations", movieController.getRecomandations);
router.get("/getTopMovies", movieController.getTopMovies);

router.post("/addMovie", adminMiddleware.adminMiddleware, movieController.addMovie);
router.put("/editMovie/:id", adminMiddleware.adminMiddleware, movieController.editMovie);
router.delete("/deleteMovie/:id", adminMiddleware.adminMiddleware, movieController.deleteMovie);

module.exports = router;
