const fs = require('fs');
const path = require('path');
const blog = require('../model/blogModel');

module.exports.blogHome = async (req, res) => {
    let blogData = await blog.find()
    return res.render('blogHome', { 
        blogData,
        userId: req.session ? req.session.userId : null
    });
}

module.exports.addBlog = async (req, res) => {
    return res.render('addBlog');
}

module.exports.insertBlog = async (req, res) => {
    if (req.file) {
        req.body.image = blog.imagePath + "/" + req.file.filename;
    }
    await blog.create(req.body)
    return res.redirect("/home");
}

module.exports.viewBlog = async (req, res) => {
    let blogid = req.query.blogId;

    let singleBlog = await blog.findById(blogid);

    return res.render("view_blog", { blog: singleBlog });
}

module.exports.editBlog = async (req, res) => {

    let blogid = req.query.blogId;

    let singleBlog = await blog.findById(blogid);

    return res.render("editBlog", {
        blog: singleBlog
    });

}

module.exports.updateBlog = async (req, res) => {

    let oldBlog = await blog.findById(req.query.blogId);

    if (req.file) {

        // Check if old file exists before deleting
        const oldImagePath = path.join(__dirname, "..", oldBlog.image);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        req.body.image = blog.imagePath + "/" + req.file.filename;

    } else {

        req.body.image = oldBlog.image;

    }

    await blog.findByIdAndUpdate(req.query.blogId, req.body);

    return res.redirect("/home");

}

module.exports.deleteBlog = async (req, res) => {

    let singleBlog = await blog.findById(req.query.blogId);

    // Check if file exists before deleting
    const imagePath = path.join(__dirname, "..", singleBlog.image);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    await blog.findByIdAndDelete(req.query.blogId);

    return res.redirect('/home');

}

