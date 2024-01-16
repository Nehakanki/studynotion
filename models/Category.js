const mongoose = require('mongoose')

const CategorySchema =  new mongoose.Schema({

   name:{
    type:String,
    required:true,
    trim:true
   },

   description:{
    type:String,
    required:true,
    trim:true

   },
   //its array bcuz one Category can be alloted to many course
   //ex: python Category ke ek se jyada course ho sakte hai
   course:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Course"
        }
   ]

})

module.exports = mongoose.model("Category",CategorySchema )