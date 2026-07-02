const mongoose = require('mongoose');

const multer = require('multer');
const { type } = require('os');

const path = require('path');
const fs = require('fs');

const imagesPath = '/uploads/productImages';

const ProductSchema = mongoose.Schema({
    productcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        requrired: true
    },
    ProductSubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        requrired: true
    },
    ProductExtraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Extracategory",
        requrired: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requrired: true
    },
    old_price: {
        type: Number,
        requrired: true
    },
    stock: {
        type: Number,
        requrired: true
    },
    description: {
        type: String,
        requrired: true
    },
    productImage: {
        type: String,
        requrired: true
    }
})

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagesPath));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now()
        );
    }
})

ProductSchema.statics.uploadProductImage = multer({ storage: productStorage }).single('productImage');
ProductSchema.statics.adPath = imagesPath;

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;