const bcrypt = require("bcryptjs");

const User = require("../models/user-model"); 

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ error : 'User already exists' });
        }
        const fullName = firstName + ' ' + lastName;
        const newUser = new User({ email, password, name: fullName });
        const token = await newUser.generateAuthToken();
        await newUser.save();
        res.json({ message : 'success', token : token });
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const valid = await User.findOne({ email });
        if(!valid){
            res.status(200).json({ message: 'User does not exist' });
        }
        const validPassword = await bcrypt.compare(password, valid.password);
        if(!validPassword){
            res.status(200).json({ message : 'Invalid Credentials' });
        }
        else{
            const token = await valid.generateAuthToken();
            await valid.save();
            res.cookie('userToken', token, {
                httpOnly : true,
                maxAge : 30*24*60*60*1000
            });
            res.status(200).json({  message : "login successful", token : token, user: valid });
        }
    }
    catch(error){
        res.status(500).json({ error : error });
    }
};

const validUser = async (req, res) => {
    try{
        const validUser = await User
        .findOne({ _id : req.rootUserId })
        .select('-password');
        if(!validUser){
            res.json({ message : 'user is not valid' });
        }
        res.status(201).json({ 
            user : validUser,
            token : req.token
         });
    }
    catch(error){
        res.status(500).json({ error: error });
        console.log(error);
    }
};

const searchUsers = async (req, res) => {
    const search = req.query.search ? {
        $or : [
            { name : { $regex : req.query.search, $options : 'i' } },
            { email : { $regex : req.query.search, $options : 'i' } }
        ]
    } : {};
    const users = await User.find(search).find({_id : { $ne : req.rootUser }});
    res.status(200).send(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try{
        const selectedUser = await User.findOne({ _id : id }).select('-password');
        res.status(200).json(selectedUser);
    }
    catch(error){
        res.status(500).json({ error : error });
    }
};

const updateInfo = async (req, res) => {
    const { id } = req.params;
    const { bio, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, bio });
    return updatedUser;
};

module.exports = { register, login, validUser, searchUsers, getUserById, updateInfo };
