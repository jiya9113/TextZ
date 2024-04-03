const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        bio : {
            type : String,
            default : 'Available'
        },
        profilePic : {
            type : String,
            default : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        contacts : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ]
    },
    {
        timestamps : true
    }
);

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken =  async function(){
    try {
        let token = jwt.sign(
            {id : this._id.toString(), email : this.email},
            process.env.JSON_SECRET_KEY,
            {
                expiresIn : '30d'
            }
        )
        return token;
    }
    catch(error) {
        console.log(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;