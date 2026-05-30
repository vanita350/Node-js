const express = require("express");

const router = express.Router();

const {
addFavorite,
getFavorites,
removeFavorite
} = require("../controllers/favoriteController");

router.post("/add", addFavorite);

router.get("/:userId", getFavorites);

router.delete("/remove/:id", removeFavorite);

module.exports = router;
