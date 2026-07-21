const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to verify JWT token from cookies.
 * Attaches the user object to req.user if valid.
 * Redirects to login if token is missing or invalid.
 */
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.flash && req.flash('error', 'Please log in to access this page.');
      return res.redirect('/login');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    // Attach user to request object
    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

/**
 * Middleware to optionally attach user info if logged in.
 * Does NOT redirect – used for public pages that also show user-specific content.
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      req.user = user;
      res.locals.currentUser = user;
    } else {
      res.locals.currentUser = null;
    }
    next();
  } catch (error) {
    res.locals.currentUser = null;
    next();
  }
};

module.exports = { protect, optionalAuth };
