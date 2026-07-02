const CategoryModel = require('../models/Category');

module.exports.addCategory = async (req, res) => {
    return res.render('add_category');
}

module.exports.inserCategoryData = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        let image = '';
        if (req.file) {
            image = CategoryModel.adPath + "/" + req.file.filename;
        }
        req.body.avatar = image;
        let categoryAdd = await CategoryModel.create(req.body);
        if (categoryAdd) {
            req.flash('success', "Category Record inserted successfully");
            return res.redirect('/category/add_category');
        }
        else {
            req.flash('error', "Category Record not found ");
            return res.redirect('/category/add_category');
        } successfully
    }
    catch (err) {
        console.log(err);
        return res.redirect('/category/add_category');
    }
}

module.exports.viewCategory = async (req, res) => {
    try {
        let categotyData = await CategoryModel.find({});
        return res.render('view_category', {
            categotyData: categotyData
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('view_category');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        let deleteCategory = await CategoryModel.findByIdAndDelete(req.params.id);
        if (deleteCategory) {
            req.flash('success', "Category Record deleted successfully");
            return res.redirect('/category/view_Category');
        }
        else {
            req.flash('error', "Category Record not deleted ");
            return res.redirect('/category/view_Category');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/category/view_Category');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        let categoryData = await CategoryModel.findById(req.params.id);
        return res.render('edit_category', {
            categoryData: categoryData
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('/category/view_Category');
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        let categoryData = await CategoryModel.findById(req.params.id);
        let image = categoryData.avatar;
        if (req.file) {
            image = CategoryModel.adPath + "/" + req.file.filename;
        }
        req.body.avatar = image;
        let updateCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
        if (updateCategory) {
            req.flash('success', "Category Record updated successfully");
            return res.redirect('/category/view_Category');
        }
        else {
            req.flash('error', "Category Record not updated ");
            return res.redirect('/category/view_Category');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/category/view_Category');
    }
}
