const mongoose = require('mongoose')
// const {settings}= require('../app');


const userSchema = new mongoose.Schema({
    username:String,
    password:String,
})


const userModel = mongoose.model("user",userSchema);

module.exports=userModel;