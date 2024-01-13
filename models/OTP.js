const mongoose = require('mongoose')

const OTPSchema =  new mongoose.Schema({

   email:{
    type:String,
    required:true
   },
   otp:{
    type:String,
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires: 5*60
   }

})

//after Schmea above the model

async function sendVerificationEmail(email,otp){

    try{
        const mailResponse = await mailSender(email, "Verfication of Email from Study Notion", otp);
    console.log("Email Response"+ mailResponse)
    }catch(err){
        console.log("error occurd while sending mail"+ err);
        throw err;
    }

}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", OTPSchema)