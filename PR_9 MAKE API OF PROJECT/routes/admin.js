const express = require('express');
const nodemailer = require('nodemailer')
const route = express.Router();

const adminCtl = require('../controllers/adminCtl');

const AdminModel = require('../models/AdminModel');

const adminAuth = require('../config/adminAuth');

route.post("/adminRegister", AdminModel.uploadAdminImages, adminCtl.adminRegister);

route.post("/adminLogin", AdminModel.uploadAdminImages, adminCtl.adminLogin);

route.get("/profile", adminAuth, adminCtl.profile)

route.post("/changePassword", adminAuth, adminCtl.changePassword)

route.post("/checkEmail", adminAuth, adminCtl.checkEmail)

route.post("/checkOTP", adminAuth, adminCtl.checkOTP)



module.exports = route;