const category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

module.exports.addsubcategory = async (req, res) => {
    try {
        // console.log("Subcategory controller");
        let allcategory = await category.find({})

        return res.render('add_subcategory', {
            allcategory: allcategory
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong", error: err });
    }
}

module.exports.inserSubCategoryData = async (req, res) => {
    try {
        // console.log(req.body);
        let subData = await Subcategory.create(req.body);
        if (subData) {
            req.flash('success', "SubCategory Record inserted successfully");
            return res.redirect('add_subcategory');
        }
        else {
            req.flash('error', "SubCategory Record not found inserted ");
            return res.redirect('add_subcategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('add_subcategory');
    }
}

module.exports.viewsubcategory = async (req, res) => {
    try {
        let subcategoryData = await Subcategory.find({}).populate('categoryId').exec();
        console.log(subcategoryData)
        return res.render('view_subcategory', {
            subcategoryData
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('view_subcategory');
    }
}

