const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT token.
 * Payload: { id, username, role }
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ─── GET /register ───────────────────────────────────────────────────────────
const getRegister = (req, res) => {
  if (res.locals.currentUser) return res.redirect('/recipes');
  res.render('register', { error: null, currentUser: null });
};

// ─── POST /register ───────────────────────────────────────────────────────────
const postRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.render('register', {
        error: 'All fields are required.',
        currentUser: null,
      });
    }

    if (password !== confirmPassword) {
      return res.render('register', {
        error: 'Passwords do not match.',
        currentUser: null,
      });
    }

    if (password.length < 6) {
      return res.render('register', {
        error: 'Password must be at least 6 characters.',
        currentUser: null,
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('register', {
        error: 'Username or email already in use.',
        currentUser: null,
      });
    }

    // Create user (password is hashed in pre-save hook)
    const user = await User.create({ username, email, password });

    // Issue token and send as cookie
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.redirect('/recipes');
  } catch (error) {
    console.error('Register Error:', error);
    res.render('register', {
      error: 'Registration failed. Please try again.',
      currentUser: null,
    });
  }
};

// ─── GET /login ───────────────────────────────────────────────────────────────
const getLogin = (req, res) => {
  if (res.locals.currentUser) return res.redirect('/recipes');
  res.render('login', { error: null, currentUser: null });
};

// ─── POST /login ───────────────────────────────────────────────────────────────
const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('login', {
        error: 'Username and password are required.',
        currentUser: null,
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.render('login', {
        error: 'Invalid username or password.',
        currentUser: null,
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', {
        error: 'Invalid username or password.',
        currentUser: null,
      });
    }

    // Issue JWT token and set cookie
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect('/recipes');
  } catch (error) {
    console.error('Login Error:', error);
    res.render('login', {
      error: 'Login failed. Please try again.',
      currentUser: null,
    });
  }
};

// ─── GET /logout ──────────────────────────────────────────────────────────────
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = { getRegister, postRegister, getLogin, postLogin, logout };
