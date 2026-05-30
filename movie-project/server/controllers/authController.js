const User = require("../models/User");

const jwt = require("jsonwebtoken");


// REGISTER USER

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "User Registered",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// LOGIN USER

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found"
      });

    }

    if (user.password !== password) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  registerUser,
  loginUser
};