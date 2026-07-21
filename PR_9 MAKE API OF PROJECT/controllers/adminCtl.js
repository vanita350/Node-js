const AdminModel = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const moment = require('moment')
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const ManagerModel = require("../models/ManagerModel");

module.exports.adminRegister = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);

        let exitAdmin = await AdminModel.findOne({ email: req.body.email });
        if (exitAdmin) {
            return res.status(200).json({ msg: "Admin is alredy register !!   try to login " })
        }
        else {
            if (req.body.password == req.body.confirm_password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                var image = '';
                if (req.file) {
                    image = AdminModel.adminImagePath + "/" + req.file.filename;
                }
                req.body.image = image;
                req.body.created_date = moment().format('DD-MM-YYYY, h:mm:ss A');
                req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss A');
                req.body.status = true;
                // console.log(req.body);
                let adminData = await AdminModel.create(req.body);
                if (adminData) {
                    return res.status(200).json({ msg: "you are register successfully" });
                }
                else {
                    return res.status(200).json({ msg: "not register proper !! somthing wrong" });
                }
            }
            else {
                return res.status(200).json({ msg: "password & confirm password not match" });
            }
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Server is not connection proper" });
    }
}



module.exports.adminLogin = async (req, res) => {
    try {

        let exitEmail = await AdminModel.findOne({ email: req.body.email });
        if (exitEmail) {
            const isMatch = await bcrypt.compare(req.body.password, exitEmail.password);

            // console.log("Entered Password:", req.body.password);
            // console.log("Database Password:", exitEmail.password);
            // console.log("Password Match:", isMatch);

            if (await bcrypt.compare(req.body.password, exitEmail.password)) {
                let token = jwt.sign({ adminToken: exitEmail }, 'Admin123', { expiresIn: "7d" });
                return res.status(200).json({ msg: "Login successfully !!!  Token generated", adminToken: token });
            }
            else {
                return res.status(200).json({ msg: "Invalid password" })
            }
        }
        else {
            return res.status(200).json({ msg: "Invalid Email" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Server is not connection proper" })
    }
}


module.exports.profile = async (req, res) => {
    try {
        return res.status(200).json({ msg: "Admin profile is here", adminprofile: req.user.adminToken });

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Server is not connection proper" })
    }
}


module.exports.changePassword = async (req, res) => {
    try {


        console.log(req.user.adminToken._id);
        console.log(req.body);
        if (await bcrypt.compare(req.body.cpass, req.user.adminToken.password)) {
            if (req.body.cpass != req.body.npass) {
                if (req.body.npass == req.body.confirm_Password) {
                    let hashPass = await bcrypt.hash(req.body.npass, 10);
                    let updatePass = await AdminModel.findByIdAndUpdate(req.user.adminToken._id, { password: hashPass });
                    if (updatePass) {
                        return res.status(200).json({ msg: " password  change successfully" })
                    }
                    else {
                        return res.status(200).json({ msg: " password  not change" })
                    }
                }
                else {
                    return res.status(200).json({ msg: " password  not match" })
                }
            }
            else {
                return res.status(200).json({ msg: "old & new password is are same  ! then why would change" })
            }
        }
        else {

            return res.status(200).json({ msg: "old password is not match" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Server is not connection proper" })
    }
}




module.exports.checkEmail = async (req, res) => {
    try {
        let emailExist = await AdminModel.findOne({ email: req.body.email });
        if (emailExist) {

            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: "bharadiyavanitar@gmail.com",
                    pass: "gnzeglijwtnxtlfg",
                },
            });
            const otp = Math.round(Math.random() * 100000)
            res.cookie("email", req.body.email);

            const info = await transporter.sendMail({
                from: 'bharadiyavanitar@gmail.com', // sender address
                to: req.body.email, // list of recipients
                subject: "send otp", // subject line
                text: "your otp is here", // plain text body
                html: `<b>YOUR OTP HERE:${otp}</b>`, // HTML body
            });
            // console.log("send mail")
            // console.log("OTP:", otp);

            if (info) {
                return res.status(200).json({ msg: "OTP send successflly", otp: otp });
            }
            else {
                return res.status(400).json({ msg: "failed to send otp" });

            }
        }
        else {
            res.json({ msg: "Email is not exist" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "somthing wrong" });
    }
    // console.log(req.body);
}




module.exports.checkOTP = async (req, res) => {
    try {

        // console.log(req.body);

        let otp = req.headers.cookie;


        console.log("Cookie :", otp);

        // Example: otp=123456
        let checkPostOTP = otp.slice(4, otp.length);

        console.log("Cookie OTP :", checkPostOTP);

        if (req.body.otp == checkPostOTP) {
            return res.status(200).json({
                msg: "OTP Match Successfully"
            });
        } else {
            return res.status(400).json({
                msg: "OTP Not Match"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: "Something Wrong"
        });
    }
};



