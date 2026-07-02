const mongoose = require('mongoose');

const { type } = require('os');

const fs = require('fs');

const SubcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        requrired: true
    },
    subcategory_name: {
        type: String,
        requrired: true
    }
})


const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;