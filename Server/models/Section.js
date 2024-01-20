const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    
    sectionName:{
        type:String,
        required:true,
        trim:true
    },

    //subsection is array
    SubSection:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
    


})


module.exports = mongoose.model("Section",SectionSchema);