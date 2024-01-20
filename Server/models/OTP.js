const mongoose = require('mongoose');
const {mailSender} = require('../utils/nodemailer');

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

// OTPSchema.pre("save", async function (next) {
//     try {
//         await sendVerificationEmail(this.email, this.otp);
//         next();
//     } catch (err) {
//         console.log("Error occurred while sending mail: " + err);
//         next(err);
//     }
// });

OTPSchema.pre("save", function (next) {
    sendVerificationEmail(this.email, this.otp)
        .then(() => next())
        .catch(err => next(err));
});

module.exports = {
    OTP: mongoose.model("OTP", OTPSchema),
    sendVerificationEmail
 };