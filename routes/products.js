const express = require('express');

const route = express.Router();

const productController = require('../controllers/productCtl');

const productModel = require('..//models/Product');

route.get('/add_product',productController.addProducts);

route.post('/inserProductsData',productModel.uploadProductImage,productController.inserProductsData);

route.get('/view_product',productController.view_product);

route.get('/delete_product/:id', productController.delete_product);

route.get('/edit_product/:id', productController.edit_product);

route.post('/update_product/:id', productModel.uploadProductImage, productController.update_product);

module.exports = route;