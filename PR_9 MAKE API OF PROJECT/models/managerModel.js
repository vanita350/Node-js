const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const managerImage = "/uploads/managerImages";


// const Manager = mongoose.model("Manager", ManagerSchema);

const ManagerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    }
});

const managerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", managerImage));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

ManagerSchema.statics.uploadManagerImages = multer({
    storage: managerStorage
}).single("image");

ManagerSchema.statics.ManagerImagePath = managerImage;

const Manager = mongoose.models.Manager || mongoose.model("Manager", ManagerSchema);

module.exports = Manager;