const express = require('express');

const route = express.Router();

const adminCtl = require('../controllers/adminCtl');

const Admin = require('../models/Admin');

const passport = require('passport');

route.get('/Logout', adminCtl.Logout);

route.post("/checkLogin", passport.authenticate('local',{failureRedirect : '/'}),adminCtl.checkLogin);

route.get("/", adminCtl.Signin);

route.get("/profile",passport.checkauthentication,  adminCtl.profile);

route.get("/chengepassword",passport.checkauthentication, adminCtl.chengepassword);

route.post("/checkchangepassword",adminCtl.checkchangepassword);

route.get("/dashboard",passport.checkauthentication, adminCtl.dashboard);

// forget pass

route.get("/verifyEmail",adminCtl.verifyEmail);

route.post("/checkemailforget", adminCtl.checkemailforget);

route.get("/otp_page", adminCtl.otp_page);

route.post("/verifyOTP", adminCtl.verifyOTP);

route.get("/addNewPasswordPage", adminCtl.addNewPasswordPage);

route.post("/updatepassword", adminCtl.updatepassword);

// end pass

route.get("/add_admin", passport.checkauthentication,adminCtl.add_admin);

route.get("/view_admin", passport.checkauthentication,adminCtl.view_admin);

route.post("/inserAdminData", Admin.uploadAdminImage, adminCtl.inserAdminData);

route.get("/deleteStudent/:adId",adminCtl.deleteStudent);

route.get("/updateStudent",passport.checkauthentication, adminCtl.updateStudent);

route.post("/EditAdminData/:adminId",Admin.uploadAdminImage, adminCtl.editAdminData);

route.use("/category", passport.checkauthentication ,require ('./category'));

route.use("/subcategory", passport.checkauthentication ,require ('./subcategory'));

route.use("/extracategory", passport.checkauthentication ,require ('./extracategory'));

route.use('/products',passport.checkauthentication, require('./products'));

module.exports = route;