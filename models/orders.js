const mongoose = require('mongoose');
const orders =  new mongoose.Schema({    //สร้าง Schema
    total: Number,
    date: { type: Date, default: Date.now },
    detail: Array
}) 

module.exports = mongoose.model('orders',orders)   //model('<ชื่อcollecttion>',<ชื่อSchema>)