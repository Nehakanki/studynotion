const mongoose = require('mongoose');

const Rating_ReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    rating:{
        type:Number,
        required : true,

    },

    review:{
        type:String,
        
    }




})

module.exports = mongoose.model("Rating_Review",Rating_ReviewSchema)