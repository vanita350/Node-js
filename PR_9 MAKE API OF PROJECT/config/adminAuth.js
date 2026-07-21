const jwt = require("jsonwebtoken"); 

const adminAuth = (req,res,next) => {
    const token = req.header('Authorization');
    console.log(token);
    if(!token){
        return res.status(400).json({msg : "token is required"});
    }
    
    try{
        let decoded = jwt.verify(token.slice(7,token.lenght),'Admin123');
        req.user = decoded;
        next();
    }
    catch{
        return res.status(400).json({msg : "invalid token "});

    }
}

 module.exports = adminAuth;