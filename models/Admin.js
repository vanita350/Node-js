const mongoose = require('mongoose');

const multer = require('multer');
const { type } = require('os');

const path = require('path');
const fs = require('fs');

const imagesPath = '/uploads/adminImages';

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requrired: true
    },
    password: {
        type: String,
        requrired: true
    },
    gender: {
        type: String,
        requrired: true
    },
    hobby: {
        type: Array,
        requrired: true
    },
    description: {
        type: String,
        requrired: true
    },
    avatar: {
        type: String,
        requrired: true
    }
})

const adminStorage = multer.diskStorage({
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

AdminSchema.statics.uploadAdminImage = multer({ storage: adminStorage }).single('avatar');
AdminSchema.statics.adPath = imagesPath;

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;