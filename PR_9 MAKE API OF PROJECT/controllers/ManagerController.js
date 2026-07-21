
const ManagerModel = require("../models/ManagerModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { profile } = require("./adminCtl");


const EmployeeModel = require("../models/EmployeeModel");

module.exports.managerRegister = async (req, res) => {
    try {

        // Check Email
        const checkManagerEmail = await ManagerModel.findOne({
            email: req.body.email
        });

        if (checkManagerEmail) {
            return res.status(200).json({
                msg: "Manager Email Already Exists !! try to new email"
            });
        }

        // Check Password
        if (req.body.password != req.body.confirm_password) {
            return res.status(200).json({
                msg: "Password and Confirm Password Not Match"
            });
        }

        // Hash Password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Upload Image
        let image = "";

        if (req.file) {
            image = ManagerModel.ManagerImagePath + "/" + req.file.filename;
        }

        req.body.image = image;
        req.body.status = true;
        req.body.created_date = moment().format("DD-MM-YYYY, h:mm:ss A");
        req.body.updated_date = moment().format("DD-MM-YYYY, h:mm:ss A");

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save Cookies
        res.cookie("email", req.body.email);
        res.cookie("otp", otp);

        // Mail Configuration
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "bharadiyavanitar@gmail.com",
                pass: "gnzeglijwtnxtlfg",
            },
        });

        // Send Mail
        const info = await transporter.sendMail({
            from: "bharadiyavanitar@gmail.com",
            to: req.body.email,
            subject: "Manager Registration OTP",
            html: `<p>Your OTP is : ${otp} <br/> your email is ${req.body.email}</p>`
        });

        if (!info) {
            return res.status(400).json({
                msg: "OTP Send Failed"
            });
        }

        // Save Manager
        const manager = await ManagerModel.create(req.body);

        return res.status(200).json({
            msg: "Manager Registered Successfully",
            manager
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: err.message
        });

    }
};


module.exports.managerLogin = async (req, res) => {
    try {

        let exitManager = await ManagerModel.findOne({ email: req.body.email });
        if (exitManager) {
            // const isMatch = await bcrypt.compare(req.body.password, exitManager.password);
            if (await bcrypt.compare(req.body.password, exitManager.password)) {
                let managerToken = jwt.sign({ managerToken: exitManager }, 'Manager', { expiresIn: "365d" });
                return res.status(200).json({ msg: "Login successfully !!!  Token generated", token: managerToken });
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
        return res.status(400).json({ msg: "Somthing wrong" })
    }
}

module.exports.managerProfile = async (req, res) => {
    try {
        return res.status(200).json({ msg: "Manager data  is here", profile: req.user });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" });
    }
}


module.exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
        if (await bcrypt.compare(req.body.cpass, req.user.password)) {
            if (req.body.cpass != req.body.npass) {
                if (req.body.npass == req.body.confirm_password) {
                    let hashPassword = await bcrypt.hash(req.body.npass, 10)
                    let manager = await ManagerModel.findByIdAndUpdate(req.user._id, { password: hashPassword });
                    if (manager) {
                        return res.status(200).json({ msg: "password change succesfully" });
                    }
                    else {
                        return res.status(200).json({ msg: "manager password not updated" });
                    }
                }
                else {
                    return res.status(400).json({ msg: " password  and confirm password dose not match " });
                }
            }
            else {
                return res.status(400).json({ msg: "new password  and confirm password should be different " });
            }
        }
        else {

            return res.status(200).json({ msg: "current password not match" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" });
    }
}

module.exports.showAllManagers = async (req, res) => {
    try {
        let allmanagers = await ManagerModel.find({});
        if (allmanagers) {
            return res.status(200).json({ msg: "All managers ", data: allmanagers })
        }
        else {
            return res.status(404).json({ msg: "managers record not found" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" })
    }
}


module.exports.deleteManager = async (req, res) => {
    try {
        // console.log(req.params.id);
        let deleteManager = await ManagerModel.findByIdAndDelete(req.params.id);
        if (deleteManager) {
            return res.status(200).json({ msg: "delete manager successfully" })
        }
        else {
            return res.status(401).json({ msg: "manager not found" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" })
    }
}

module.exports.employeeRegister = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" })
    }
}





// employee 
module.exports.employeeRegister = async (req, res) => {
    try {

        let exitEmployee = await EmployeeModel.findOne({ email: req.body.email });
        if (exitEmployee) {
            return res.status(200).json({ msg: "Employee allredy exist with this email", });
        }
        else {
            var image = '';
            if (req.file) {
                image = EmployeeModel.employeImages + "/" + req.file.filename;
            }
            req.body.image = image;
            let password = req.body.password;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.status = true;
            req.body.created_date = moment().format('DD-MM-YYYY, h:mm:ss A');
            req.body.updated_date = moment().format('DD-MM-YYYY, h:mm:ss A');
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: "bharadiyavanitar@gmail.com",
                    pass: "gnzeglijwtnxtlfg",
                },
            });
            const info = await transporter.sendMail({
            from: "bharadiyavanitar@gmail.com",
            to: req.body.email,
            subject: "Employee credentials",
            html: `<p>your email is ${req.body.email}</p>`
        });
          if (info) {
              let employeeRegister = await EmployeeModel.create(req.body);
              if(employeeRegister){
                  return res.status(200).json({ msg: "Employe register successfully" });
                  
                }
                else{
                    return res.status(400).json({ msg: "Somthing wrong" })
                }
            }
            else {
                return res.status(400).json({ msg: "email not send and data is not registered try again" });

            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong" })
    }
}
