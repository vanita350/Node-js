require('dotenv').config();
const express = require('express');

const port = 1300;

const app = express();

const db = require('./config/db');

var cookieParser = require('cookie-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.listen(port,(err) =>{
    err?console.log(err):"";
    console.log(`Server is running on port:${port}`);
})


