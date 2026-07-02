const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User"

  },

  movieId: {

    type: Number,

    required: true

  },

  title: {

    type: String,

    required: true

  },

  poster: {

    type: String

  }

});

module.exports = mongoose.model("Favorite", favoriteSchema);