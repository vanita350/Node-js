const express = require('express');

const port = 8010;

const app = express();

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", require('./routes'))


// app.get('/', (req, res) => {
//     return res.render('post');
// });

app.listen(port, (err) => {
    if (err) {
        console.log("something wrong", err);
    }

    console.log("server is running on port:", port);
});