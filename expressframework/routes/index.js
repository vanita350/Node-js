const express = require('express');

const route = express.Router();
 
const postController = require('../controllers/postController');

route.get('/',postController.postpage )
route.get('/about',postController.aboutpage)
route.get('/contact', postController.contactpage)
route.get('/feedback',postController.feedbackpage)

// console.log("Routing");

module.exports = route ;