const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports.createUser = async(req,res) => {
    const { username, email, password } = req.body;
    let existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.status(401).json({"message" : "User alredy exist? try to Login"})
    }
    const hashedpassword = bcrypt.hashSync(password); 
    let newUser = new User({
        username,
        email,
        password: hashedpassword,
    });
    let savedUser = await newUser.save();
    res.json({"message" : "User created successfully"});
}

module.exports.getLogin = async(req,res)=>{
    const { username, password } = req.body;
    // console.log(req.cookies);
    let existingUser = await User.findOne({username: username});
    if(!existingUser){
        return res.status(404).json({ "message": "User credentials does not exists!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(existingUser.username === username && isPasswordCorrect){
        const token = jwt.sign({id: existingUser._id},jwt_secret,{expiresIn: "30sec"});
        res.cookie(String(existingUser._id),token,{
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 2     ),
            httpOnly: true,
            sameSite: 'lax',
        });
        return res.status(200).json({"message": "sucessfully logged in!"});
    }
}

module.exports.getVerified = async (req,res,next)=>{
    const cookie = req.headers.cookie; 
    // console.log(cookie);
    let token;
    if(cookie){
        token = cookie.split("=")[1];
    }

    if(!token){
        return res.status(400).json({"message": "No Token Found"})
    }
    jwt.verify(String(token),jwt_secret,(err, user)=>{
        if(err){
            return res.status(400).json({"message" : "Invalid Token"});
        }
        req.id = user.id;
        next();
    });
    
}

module.exports.getUser = async(req,res) =>{
    const userID = req.id;
    // console.log("userid",userID);
    let user = await User.findById(userID,"-password");
    // console.log("user",user);
    if(!user){
        return res.status(404).json({"message": "User not found"});
    }
    res.status(200).json({user});
}

module.exports.getLogout = (req, res) => {
    const cookie = req.headers.cookie; 
    let token;
    if(cookie){
        token = cookie.split("=")[1];
    }
    if(!token){
        return res.status(400).json({"message": "No Token Found"})
    }
    jwt.verify(String(token),jwt_secret,(err, user)=>{
        // console.log(user);
        if(err){
            return res.status(400).json({"message" : "Invalid Token"});
        }
        res.clearCookie(`${user.id}`);
        // res.cookie[`${user.id}`] = "";
        return res.status(200).json({ "message": "Successfully logged out!" });

    });
    // console.log(req.cookies);
};




