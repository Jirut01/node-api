const mongoose = require('mongoose');
const products =  new mongoose.Schema({    //สร้าง Schema
    product_id: {type:String, unique:true},
    product_name: String,
    description: String,
    price: Number,
    amount: Number,
    image: String
}) 

module.exports = mongoose.model('products',products)   //model('<ชื่อcollecttion>',<ชื่อSchema>)