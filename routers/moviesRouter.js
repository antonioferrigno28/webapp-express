const express = require("express");
const moviesController = require("../controllers/moviesController.js");
const router = express.Router();

//routes
router.get("/", moviesController.index);
router.get("/:id", moviesController.show);
router.post("/:id/reviews", moviesController.storeReviewByMovieId);

module.exports = router;
