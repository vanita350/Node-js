const express = require('express');
const router = express.Router();
const { getRegister, postRegister, getLogin, postLogin, logout } = require('../controllers/authController');
const { optionalAuth } = require('../middleware/authMiddleware');

// Apply optionalAuth so redirect logic works
router.get('/register', optionalAuth, getRegister);
router.post('/register', postRegister);

router.get('/login', optionalAuth, getLogin);
router.post('/login', postLogin);

router.get('/logout', logout);

module.exports = router;
