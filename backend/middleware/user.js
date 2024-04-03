const jwt = require("jsonwebtoken");

const User = require("../models/user-model")

Auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[0];
        
        const verifiedUser = jwt.verify(token, process.env.JSON_SECRET_KEY);
        const rootUser = await User
        .findOne({ _id : verifiedUser.id })
        .select('-password');
        req.token = token;
        req.rootUser = rootUser;
        req.rootUserId = rootUser._id;

        next();
    }
    catch(error){
        res.json({error : 'Invalid Token'});
    }
};

module.exports = Auth;