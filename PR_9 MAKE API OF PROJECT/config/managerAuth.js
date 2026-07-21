const jwt = require("jsonwebtoken");
const managerModel = require("../models/managerModel")
const bcrypt = require("bcrypt")

const managerAuth = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(400).json({ msg: "token is required" });
    }

    try {
        let decoded = jwt.verify(token.slice(7, token.length), 'Manager');
        // console.log(decoded.managerData.email);
        let email = decoded.managerToken.email;
        // let password = decoded.managerData.password;
        let exitManager = await managerModel.findOne({ email: email });
        if (exitManager) {
            // if (await bcrypt.compare(password, exitManager.password)) {
                req.user = exitManager
                next();
            // }
            // else{
            //     return res.status(200).json({ msg: "invalid password" });
            // }
        }
        else {
            return res.status(400).json({ msg: "invalid email " });
        }
    }
    catch {
        return res.status(400).json({ msg: "invalid token " });

    }
}

module.exports = managerAuth;