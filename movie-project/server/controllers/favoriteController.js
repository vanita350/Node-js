const Favorite = require("../models/Favorite");

const addFavorite = async (req, res) => {

  try {

    const favorite = new Favorite({

      userId: req.body.userId,

      movieId: req.body.movieId,

      title: req.body.title,

      poster: req.body.poster

    });

    await favorite.save();

    res.status(201).json({

      message: "Movie added to favorites"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

const getFavorites = async (req, res) => {

  try {

    const favorites = await Favorite.find({

      userId: req.params.userId

    });

    res.status(200).json(favorites);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

const removeFavorite = async (req, res) => {

  try {

    await Favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({

      message: "Favorite Removed"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {
addFavorite,
getFavorites,
removeFavorite
};
