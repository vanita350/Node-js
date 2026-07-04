const category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
let Poduct = require('../models/Product');
const Product = require('../models/Product');

module.exports.addProducts = async (req, res) => {
    try {
        let categoryData = await category.find({});
        let SubcategoryData = await Subcategory.find({});
        let ExtracategoryData = await Extracategory.find({});
        console.log("Add Product Page Opened");
        return res.render('add_products', {
            categoryData, SubcategoryData, ExtracategoryData
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('add_products');
    }
}

module.exports.inserProductsData = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        let image = '';
        if (req.file) {
            image = Poduct.adPath + "/" + req.file.filename;
        }
        req.body.productImage = image;
        let productData = await Product.create(req.body);
        if (productData) {
            req.flash('success', "Product Datailed added successfully");
            return res.redirect('add_product');
        }
        else {
            req.flash('error', "Product not found ");
            return res.redirect('add_product');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('add_product');
    }
}


module.exports.view_product = async (req, res) => {
    try {
        let productData = await Product.find().populate('productcategoryId').populate('ProductSubcategoryId').populate('ProductExtraId').exec();
        // console.log(req.body);
        return res.render('view_products',{
            productData
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('view_products');
    }
}

module.exports.delete_product = async (req, res) => {
    try {
        let deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (deleteProduct) {
            req.flash('success', 'Product Record deleted successfully');
            return res.redirect('/products/view_product');
        }
        else {
            req.flash('error', 'Product Record not deleted ');
            return res.redirect('/products/view_product');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/products/view_product');
    }
}

module.exports.edit_product = async (req, res) => {
    try {
        let categoryData = await category.find({});
        let SubcategoryData = await Subcategory.find({});
        let ExtracategoryData = await Extracategory.find({});
        let productData = await Product.findById(req.params.id);
        return res.render('edit_products', {
            categoryData, SubcategoryData, ExtracategoryData, productData
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('/products/view_product');
    }
}

module.exports.update_product = async (req, res) => {
    try {
        let productData = await Product.findById(req.params.id);
        let image = productData.productImage;
        if (req.file) {
            image = Poduct.adPath + '/' + req.file.filename;
        }
        req.body.productImage = image;
        let updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (updateProduct) {
            req.flash('success', 'Product Record updated successfully');
            return res.redirect('/products/view_product');
        }
        else {
            req.flash('error', 'Product Record not updated ');
            return res.redirect('/products/view_product');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/products/view_product');
    }
}
