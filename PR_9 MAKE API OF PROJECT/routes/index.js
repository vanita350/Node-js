const express = require('express');

const route = express.Router();


route.use("/admin",require('./admin'))

route.use("/manager", require("./ManagerRoutes"));

module.exports = route;