const { route } = require("../routes");

module.exports.postpage = (req, res ) =>{
        return res. render('post'); 
}

module.exports.aboutpage = (req, res ) =>{
    return res.render('about');
}

module.exports.contactpage = (req, res ) =>{
    return res. render('contact');
}

module.exports.feedbackpage = (req, res) =>{
    return res. render('feedback')
}