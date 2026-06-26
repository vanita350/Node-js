const User = require('../model/userModel');

// Register Page
module.exports.registerPage = (req, res) => {
    res.render('register');
};

// Register User
module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }
        
        // Create new user
        const user = await User.create({ name, email, password });
        
        // Set session
        req.session.userId = user._id;
        
        res.redirect('/home');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'Registration failed. Please try again.' });
    }
};

// Login Page
module.exports.loginPage = (req, res) => {
    res.render('login');
};

// Login User
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }
        
        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }
        
        // Set session
        req.session.userId = user._id;
        
        res.redirect('/home');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'Login failed. Please try again.' });
    }
};

// Logout User
module.exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};
