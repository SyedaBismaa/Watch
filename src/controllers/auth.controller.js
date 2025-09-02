const userModel = require('../models/user.model')
const jwt =require('jsonwebtoken')
const bcrypt=  require('bcryptjs');

async function registerController(req,res) {
    const {fullName:{firstName,lastName},email,password}=req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
    return res.status(400).json({message:"User already Exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName:{
            firstName,lastName
        },
        email,
        password:hashPassword,
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered sucessfully!",
        user:{
           email:user.email,
           _id:user._id,
           fullName:user.fullName,
        }
    })
}


async function loginController(req,res) {
    const {email,password} = req.body;

    const user = await userModel.findOne({ email});

    if(!user){
        return res.status(401).json({ message:"Invalid Email Please try again"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid password,try agin !"})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({message:"User LoggedIn successfully!"})


}

module.exports={
    registerController,
    loginController
}