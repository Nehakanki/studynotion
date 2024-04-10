const mongoose = require('mongoose')

const profileSchema =  new mongoose.Schema({

    gender:{
        type:String,
   
    },
    DOB:{
        type:String,
       
    },
    about:{
        type:String,
        trim: true
    },
    ContactNumber:{
        type: Number,
        trim:true
    }

})

module.exports = mongoose.model("Profile", profileSchema)