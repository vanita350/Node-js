const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const adminImage = "/uploads/adminImages";

const AdminSchema = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
     email:{
        type:String,
        required: true
    },
     password:{
        type:String,
        required: true
    },
     phone:{
        type:Number,
        required: true
    },
     image:{
        type:String,
        required: true
    },
     status:{
        type:Boolean,
        required: true
    },
     created_date:{
        type:String,
        required: true
    },
     updated_date:{
        type:String,
        required: true
    },
})

const adminStorage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,"..", adminImage))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
})


AdminSchema.statics.uploadAdminImages = multer({storage: adminStorage}).single("image");
AdminSchema.statics.adminImagePath = adminImage;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;