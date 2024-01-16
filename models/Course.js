const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    courseName:{
        type:String,
        requried:true
    },
    courseDescription:{
        type:String,
        requried:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatWillWeLearn:{
        type:String,
        requried:true
    },
    //array 
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section"
            
        },
    
    ],

    Rating_review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Rating_Review"
            
        }
    ],
    price:{
        type:Number,
        requried:true
    },

    thumbnail:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },

    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
       

    },
    StudentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true


        }
    ],
    instructions:{
        type:[String],

    },
    status:{
        type:String,
        enum : ["drafted","Published"]
    }


})

module.exports = mongoose.model("Course",CourseSchema );

