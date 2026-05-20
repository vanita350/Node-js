const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/bookstore");

const db = mongoose.connection;


db.once('open', (err) => {
    if (err) {
        console.log("db is not conected");
        return false;
    } else {
        console.log("db is conected");
    }

})

module.exports = db; 