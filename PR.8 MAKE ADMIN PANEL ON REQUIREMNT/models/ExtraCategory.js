const mongoose = require('mongoose');

const { type } = require('os');

const fs = require('fs');

const ExtracategorySchema = mongoose.Schema({
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        requrired: true
    },
    extraSubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        requrired: true
    },
    extracategory_name: {
        type: String,
        requrired: true
    }
})


const Extracategory = mongoose.model('Extracategory', ExtracategorySchema);

module.exports = Extracategory;