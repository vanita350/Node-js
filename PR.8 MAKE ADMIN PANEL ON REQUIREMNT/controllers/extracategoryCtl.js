const category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
// const Extracategory = require('../models/Extracategory');
const Extracategory = require('../models/Extracategory');

module.exports.add_extracategory = async (req, res) => {
    try {
        let allcategory = await category.find({})
        let allSubcategory = await Subcategory.find({})
        return res.render('add_extracategory', {
            allcategory, allSubcategory
        });
    } catch (err) {
        console.log(err);
        return res.redirect('add_extracategory');
    }
}

module.exports.inserExtraCategoryData = async (req, res) => {
    try {
        console.log(req.body);
        // let addextraData = await Extracategory.create(req.body);
        let addextraData = await Extracategory.create(req.body);
        if (addextraData) {
            req.flash('success', "Add ExtraCategory Record inserted successfully");
            return res.redirect('add_extracategory');
        }
        else {
            req.flash('error', "ExtraCategory Record not found inserted ");
            return res.redirect('add_extracategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('add_extracategory');
    }
}

module.exports.view_extracategory = async (req, res) => {
    try {
        let allextracategory = await Extracategory.find({}).populate('extracategoryId').populate('extraSubcategoryId').exec();
        console.log(allextracategory);

        return res.render('view_extracategory', {
            allextracategory
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('view_extracategory');
    }
}

module.exports.delete_extracategory = async (req, res) => {
    try {
        let deleteExtraCategory = await Extracategory.findByIdAndDelete(req.params.id);
        if (deleteExtraCategory) {
            req.flash('success', "ExtraCategory Record deleted successfully");
            return res.redirect('/extracategory/view_extracategory');
        }
        else {
            req.flash('error', "ExtraCategory Record not deleted ");
            return res.redirect('/extracategory/view_extracategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/extracategory/view_extracategory');
    }
}

module.exports.edit_extracategory = async (req, res) => {
    try {
        let allcategory = await category.find({})
        let allSubcategory = await Subcategory.find({})
        let extracategoryData = await Extracategory.findById(req.params.id);
        return res.render('edit_extracategory', {
            allcategory, allSubcategory, extracategoryData
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect('/extracategory/view_extracategory');
    }
}

module.exports.update_extracategory = async (req, res) => {
    try {
        let updateExtraCategory = await Extracategory.findByIdAndUpdate(req.params.id, req.body);
        if (updateExtraCategory) {
            req.flash('success', "ExtraCategory Record updated successfully");
            return res.redirect('/extracategory/view_extracategory');
        }
        else {
            req.flash('error', "ExtraCategory Record not updated ");
            return res.redirect('/extracategory/view_extracategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/extracategory/view_extracategory');
    }
}


