const express = require('express');

const route = express.Router();

const subCtl = require('../controllers/subcategory');

route.get("/add_subcategory", subCtl.addsubcategory);

route.post("/inserSubCategoryData",subCtl.inserSubCategoryData);

route.get("/view_subcategory",subCtl.viewsubcategory);

module.exports = route;