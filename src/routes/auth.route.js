const express = require('express');
const jwt = require('jsonwebtoken')

const userModel= require('../models/user.model')

const router = express.Router();

router.post('/register', async(req, res)=>{
    const {username, password}=req.body;

    const user= await userModel.create({
        username,password,
    })

    const token=jwt.sign({
        id:user.id,
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:'User Created Sucessfully!',
        user,
    })
})


//login

router.post('/login',async(req,res)=>{

     const {username,password} = req.body;

    const isUserExist = await userModel.findOne({
        username:username,
    })

    if(!isUserExist){
        return res.status(401).json({
            message:"Inavlid username Please try again!"
        })
    }

    const validPass = password===isUserExist.password;

    if(!validPass){
        return res.status(401).json({
            message:"Invalid password",
        })
    }


    res.status(201).json({
        message:"Login sucessfully!"
    })
})


//token

router.get('/user', async(req,res)=>{
    const {token} =req.cookies;

    if(!token){
        return res.status(401).json({
            message:"Unothorized"
        })
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id:decode.id
        }).select("-password")

        res.status(201).json({
            message:"Users data fetch sucessfully!",
            user,
        })

    }catch{
        return res.status(402).json({
          message:'Invalid Token'
        })
    }
    
})



module.exports=router;