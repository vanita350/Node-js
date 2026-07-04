const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async function (email, password, done) {
               console.log(email, password);
            try {
                let adminRecord = await Admin.findOne({ email: email });

                if (!adminRecord) {
                    return done(null, false);
                }

                if (adminRecord.password !== password) {
                    return done(null, false);
                }
                return done(null, adminRecord);

            } catch (err) {
                return done(err);
            }
        }
    )
);

// Session me user id save karega
passport.serializeUser(function (admin, done) {
    done(null, admin.id);
});

// Session se user data nikalega
passport.deserializeUser(async function (id, done) {
    try {
        let adminRecord = await Admin.findById(id);
      
        if (adminRecord) {
            return done(null, adminRecord);
        }

        return done(null, false);

    } catch (err) {
        return done(err);
    }
});


passport. checkauthentication = function (req, res, next){
    console.log("testing"+req.isAuthenticated());
  if(req.isAuthenticated()){
    return next();
  }
  else{
    return res.redirect('/');
  }
}

passport.setAuthenticateUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;