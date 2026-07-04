const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalSt = require('./config/passport-local-strategy');
const flash = require('connect-flash');

const flashConnect = require('./config/flashConnect');

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
app.use(session({
    name:"testing",
    secret : "test-project",
    resave : true,
    saveUninitialized : false, 
    cookie :{
        maxAge: 1000 * 100 * 60
    }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
app.use(flashConnect.setFlash);
app.use((req, res, next) => {
    res.locals.currentUrl = req.originalUrl;
    next();
});
app.use('/', require('./routes/admin'));
app.use('/category', require('./routes/category'));
app.use('/extracategory', require('./routes/extracategory'));
app.use('/product', require('./routes/products'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is running on port : ${port}`);
})
