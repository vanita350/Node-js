const User = require('../model/userModel');

const authMiddleware = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.user = user;
                next();
            } else {
                req.session.userId = null;
                res.redirect('/login');
            }
        } catch (error) {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = authMiddleware;
