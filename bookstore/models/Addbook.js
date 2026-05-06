const mongoose = require ('mongoose');
const multer  = require('multer')
const imgpath = "/uploads";
const path = require('path');

const Addbook = mongoose.Schema({
title:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
} ,
pages:{
    type:String,
    required:true
},
booktype:{
    type:Array,
    required:true
},
city:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
}
})

const StoreImage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,path.join(__dirname,'..',imgpath))
    },
    filename : (req,file,cb) =>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})

Addbook.statics.uploadedImage = multer({storage: StoreImage}).single('avatar');
Addbook.statics.imgpath = imgpath;

const Book = mongoose.model('Book',Addbook);

module.exports = Book;