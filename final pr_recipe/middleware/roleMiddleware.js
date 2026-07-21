/**
 * Role-based access control middleware.
 * Restricts route access to users with specified roles.
 * Must be used AFTER the protect middleware.
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'user')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).render('error', {
        message: '🚫 Access Denied: You do not have permission to perform this action.',
        currentUser: req.user,
      });
    }

    next();
  };
};

module.exports = { restrictTo };
