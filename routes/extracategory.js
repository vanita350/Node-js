
const express = require('express');
const route = express.Router();

const extracategoryCtl = require('../controllers/extracategoryCtl');

route.get('/add_extracategory', extracategoryCtl.add_extracategory);

route.post('/inserExtraCategoryData',extracategoryCtl.inserExtraCategoryData);

route.get('/view_extracategory', extracategoryCtl.view_extracategory)

route.get('/delete_extracategory/:id', extracategoryCtl.delete_extracategory);

route.get('/edit_extracategory/:id', extracategoryCtl.edit_extracategory);

route.post('/update_extracategory/:id', extracategoryCtl.update_extracategory);

module.exports = route;