const fs = require('fs');
const Admin = require('../models/Admin');
const path = require('path');
const nodemailer = require('nodemailer')


module.exports.Logout = (req, res) => {

    req.logout(function (err) {

        if (err) {
            console.log(err);
            return res.redirect('back');
        }

        req.session.destroy(function (err) {

            if (err) {
                console.log(err);
                return res.redirect('back');
            }

            res.clearCookie('testing');
            return res.redirect('/');
        });

    });

}

module.exports.Signin = (req, res) => {

    try {
        if (
            // req.cookies.admin == undefined ||
            //  req.cookies.admin == undefined
            req.isAuthenticated()
        ) {
            return res.redirect('/dashboard');
        }
        else {
            return res.render('Signin');
        }
    }
    catch (err) {
        console.log(err);
        return res.render('Signin');
    }
};


module.exports.checkLogin = async (req, res) => {
    try {
        req.flash('success', "Login successfuly");
        return res.redirect('/dashboard');
    }
    catch (err) {
        console.log("Somthing wrong");
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req, res) => {
    try {
        return res.render('dashboard');
    }
    catch (err) {
        console.log("Somthing wrong");
        return res.redirect('/');
    }
};

module.exports.add_admin = async (req, res) => {
    try {
        return res.render('add_admin');
    }
    catch (err) {
        console.log("Somthing wrong");
        return res.redirect('/');
    }
};

module.exports.chengepassword = async (req, res) => {
    try {
        return res.render('chengepassword');
    }
    catch (err) {
        console.log("Somthing wrong");
        return res.redirect('/');
    }
}

module.exports.checkchangepassword = async (req, res) => {
    try {
        // let oldpass = req.cookies.admin.password;
        let oldpass = req.user.password;
        // let adminId = req.cookies.admin._id;
        let adminId = req.user.id;
        console.log(req.body);

        if (oldpass == req.body.currentpass) {

            if (req.body.currentpass != req.body.newpass) {

                if (req.body.newpass == req.body.confirepass) {

                    let adminData = await Admin.findByIdAndUpdate(
                        adminId,
                        {
                            password: req.body.newpass
                        },
                        { new: true }
                    );

                    if (adminData) {
                        console.log("Password Changed Successfully");
                        return res.redirect('/logout');
                    }
                    else {
                        console.log("Something wrong");
                    }
                }
                else {
                    console.log("New and Confirm Password not match");
                }
            }
            else {
                console.log("New & Current Password must be different");
            }
        }
        else {
            console.log("Current Password not match");
        }
        return res.redirect('/chengepassword');

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.profile = async (req, res) => {
    try {
        return res.render('profile');
    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.view_admin = async (req, res) => {
    try {
        let adminRecord = await Admin.find({});
        if (adminRecord) {
            res.render('view_admin', { adminRecord });
        }
        else {
            return res.render('view_admin', []);
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.inserAdminData = async (req, res) => {
    try {
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.avatar = '';

        if (req.file) {
            req.body.avatar = Admin.adPath + "/" + req.file.filename;
        }

        let adminRecord = await Admin.create(req.body);

        if (adminRecord) {
            console.log("Admin Record Inserted");
            req.flash('success', "admin record inserted successfuly");
            return res.redirect('/add_admin');
        } else {
            console.log("Error in inserting Admin Record");
            req.flash('error', "Error in inserting Admin Record")
            return res.redirect('/add_admin');
        }
    }
    catch (err) {
        console.log(err);
        req.flash('error', "Somthing wrong");
        return res.redirect('/add_admin');
    }
};

module.exports.deleteStudent = async (req, res) => {
    try {
        let adminId = req.params.adId;

        let adminData = await Admin.findById(adminId);
        if (adminData) {
            if (adminData.avatar) {
                let imgPath = path.join(__dirname, "..", adminData.avatar);
                try {
                    await fs.unlinkSync(imgPath);
                }
                catch (err) {
                    console.log(err);
                }
            }

            let deleteStudent = await Admin.findByIdAndDelete(adminId);
            if (deleteStudent) {
                console.log("Record Deleted Successfully");
                req.flash('success', "Record Deleted Successfully ");
                return res.redirect('/view_admin');
            }
            else {
                console.log("Error in Deleting Student Record");
                req.flash('error', "Error in Deleting Student Record ");
                return res.redirect('/view_admin');
            }
        }
        else {
            console.log("Admin Record not found");
            req.flash('error', "Admin Record not found");
            return res.redirect('/view_admin');
        }
    }
    catch (err) {
        req.flash('error', "Somthing Wrong");
        console.log(err);
        return res.redirect('/view_admin');
    }
}


module.exports.updateStudent = async (req, res) => {
    try {
        let adminId = req.query.adminId;
        let oldAdminData = await Admin.findById(adminId);
        console.log(oldAdminData);

        if (oldAdminData) {
            return res.render('edit_admin', {
                oldAdminData
            })
        }
        else {
            console.log("Record not found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.editAdminData = async (req, res) => {
    try {
        let adminId = req.params.adminId;
        let oldAdminData = await Admin.findById(adminId);
        req.body.name = req.body.fname + " " + req.body.lname;
        if (oldAdminData) {
            if (req.file) {
                let imgPath = path.join(__dirname, '..', oldAdminData.avatar);
                try {
                    await fs.unlinkSync(imgPath);
                }
                catch (err) {
                    console.log(err);
                }
                res.body.avatar = Admin.adPath + "/" + req.file.filename;
            }
            else {
                req.body.avatar = oldAdminData.avatar;
            }
            let newAdminData = await Admin.findByIdAndUpdate(adminId, req.body);
            let updateAdminData = await Admin.findById(adminId);
            res.cookie('admin', updateAdminData);
            if (newAdminData) {
                console.log("Record Update");
                return res.redirect("/view_admin");
            }
            else {
                console.log("somthing wrong");
                return res.redirect('back');
            }
        }
        else {
            console.log("Record not found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.verifyEmail = async (req, res) => {
    try {
        return res.render('forget_password/verifyEmail');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.checkemailforget = async (req, res) => {
    try {
        // console.log(req.body);
        let checkEmail = await Admin.findOne({ email: req.body.email });
        if (checkEmail) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "bharadiyavanitar@gmail.com",
                    pass: "hxurlqvcubmuuiqm",
                },
            });

            let OTP = Math.floor(Math.random() * 999999);
            res.cookie('otp', OTP);
            res.cookie('email', req.body.email);
            const info = await transporter.sendMail({
                from: '<bharadiyavanitar@gmail.com>', // sender address
                to: req.body.email, // list of recipients
                subject: "OTP from website", // subject line
                text: "your OTP", // plain text body
                html: `<b>your OTP is below : ${OTP}</b>
                <p>This is OTP from my website </p>`, // HTML body
            });
            if (info.messageId) {
                console.log("Email send");
                return res.redirect("/otp_page");
            }
            else {
                console.log("Email not send");
                return res.redirect("back");
            }
            // console.log("Message sent: %s", info.messageId);
        }
        else {
            console.log("Email is not verify");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.otp_page = async (req, res) => {
    try {
        return res.render('forget_password/otp_page');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.verifyOTP = async (req, res) => {
    try {
        console.log("admin otp:" + req.body.adminotp);
        console.log("developer:" + req.cookies.otp);
        if (req.body.adminotp == req.cookies.otp) {
            return res.redirect('/addNewPasswordPage');
        }
        else {
            console.log("OTP not match");
            return res.redirect('back');

        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addNewPasswordPage = async (req, res) => {
    try {
        return res.render('forget_password/addNewPassword');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updatepassword = async (req, res) => {
    try {
        console.log(req.body);
        let email = req.cookies.email;
        if (req.body.npass == req.body.cpass) {
            let checkEmail = await Admin.findOne({ email: email });
            if (checkEmail) {
                let updpass = await Admin.findByIdAndUpdate(checkEmail.id, { password: req.body.npass });
                if (updpass) {
                    res.clearCookie('otp');
                    res.clearCookie('email');
                    return res.redirect('/logout');
                }
                else {
                    console.log("password not upadate");
                    return res.redirect('back');
                }
            }
            else {
                console.log("Invalid email");
                return res.redirect('back');
            }
        }
        else {
            console.log("New and Confirm password not match");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}