const express = require('express');

const route = express.Router();

const categoryCtl = require('../controllers/categoryCtl');

const categoryModel = require('../models/Category'); 

route.get("/add_Category", categoryCtl.addCategory);

route.get("/view_Category", categoryCtl.viewCategory);

route.post("/inserCategoryData",categoryModel.uploadCategoryImage, categoryCtl.inserCategoryData);

route.get("/deleteCategory/:id", categoryCtl.deleteCategory);

route.get("/editCategory/:id", categoryCtl.editCategory);

route.post("/updateCategory/:id", categoryModel.uploadCategoryImage, categoryCtl.updateCategory);

module.exports = route;