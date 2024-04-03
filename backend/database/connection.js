
const mongoose = require("mongoose");

const mongoDBConnect = () => {
    try{
        mongoose.connect(process.env.URI);
    }
    catch(error){
        console.log("error in connecting database " + error);
    }
};

module.exports = mongoDBConnect;