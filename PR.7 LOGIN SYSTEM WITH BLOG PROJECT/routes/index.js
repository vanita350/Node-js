const express = require('express');
const {
    blogHome,
    addBlog,
    viewBlog,
    insertBlog,
    editBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogCtrl');

const {
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    logoutUser
} = require('../controllers/authCtrl');

const authMiddleware = require('../middleware/auth');

const blog = require('../model/blogModel');

const routes = express.Router();

routes.get('/', registerPage);

routes.get('/home', authMiddleware, blogHome);

routes.get('/createBlog', authMiddleware, addBlog);

routes.post('/createBlog', authMiddleware, blog.imageUpload, insertBlog);

routes.get('/viewBlog', viewBlog);

routes.get('/editBlog', authMiddleware, editBlog);

routes.post('/updateBlog', authMiddleware, blog.imageUpload, updateBlog);

routes.get('/deleteBlog', authMiddleware, deleteBlog);

// Auth Routes
routes.get('/register', registerPage);
routes.post('/register', registerUser);
routes.get('/login', loginPage);
routes.post('/login', loginUser);
routes.get('/logout', logoutUser);

module.exports = routes;