const mongoose = require('mongoose');
const users =  new mongoose.Schema({    //สร้าง Schema
    username: {type:String,  unique:true},
    password: String,
    first_name: String,
    last_name: String,
    token: String,
    permission: {type:String, default : 'user'}
}) 

module.exports = mongoose.model('users',users)   //model('<ชื่อcollecttion>',<ชื่อSchema>)