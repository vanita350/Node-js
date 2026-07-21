const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const employeImages = "/uploads/employeImages";

// const Manager = mongoose.model("Manager", ManagerSchema);

const EmployeeSchema = mongoose.Schema({
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

const employeeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", employeImages));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

EmployeeSchema.statics.uploadManagerImages = multer({
    storage:employeeStorage 
}).single("image");

EmployeeSchema.statics.EmployeeImagePath  = employeImages;

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;