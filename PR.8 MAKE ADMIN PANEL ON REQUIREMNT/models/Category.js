const mongoose = require('mongoose');

const multer = require('multer');
const { type } = require('os');

const path = require('path');
const fs = require('fs');

const imagesPath = '/uploads/categoryImages';

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        requrired: true
    }
})

const categoryStorage = multer.diskStorage({
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

CategorySchema.statics.uploadCategoryImage = multer({ storage: categoryStorage }).single('avatar');
CategorySchema.statics.adPath = imagesPath;

const Category  = mongoose.model('Category', CategorySchema);

module.exports = Category;