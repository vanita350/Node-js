const mongoose = require ('mongoose');
const multer  = require('multer')
const imgpath = "/uploads";
const path = require('path');

const Addmovie = mongoose.Schema({
title:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
} ,
duration:{
    type:String,
    required:true
},
genre:{
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

Addmovie.statics.uploadedImage = multer({storage: StoreImage}).single('avatar');
Addmovie.statics.imgpath = imgpath;

const Movie = mongoose.model('Movie',Addmovie);

module.exports = Movie;