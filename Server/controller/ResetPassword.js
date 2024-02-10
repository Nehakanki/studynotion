const User = require("../models/User");

const {mailSender} = require("../utils/nodemailer");
const bcrypt = require("bcrypt");
const crypto = require('crypto')

//reset password token

exports.resetPasswordToken = async (req, res) => {
  try {
    //1. get email

    const {email} = req.body;
    //2. check user for email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "Your Email is not registered",
      });
    }
    //3. generate Token & its expires time
    const token = crypto.randomUUID();
    console.log(token);
    //4. update user by adding token & expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },//find on basic of the email
      {
        token: token, //insert the token
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //token with expiry time
      },
      { new: true }//in order to get the updated DB 
    );
    //5. create URL
    const url = `http://localhost:3000/update-password/${token}`;

    //6. send Mail containing url
    await mailSender(email, "Password Reset Link", `Password Url Link: ${url}`);
    //7 return response

    return res.status(200).json({
      success: true,
      message: "mail sent successfully check email and reset it",
    });
  } catch (error) {
    console.log("Error while reseting the password"+ error);
    return res.status(500).json({
        success:false,
        message:"error in resetting the password"
    })
  }
};

//reset password

exports.resetPassword = async(req, res)=>{
    try{
               //1. data fetch
    const {password, confirmPassword, token}= req.body;
    console.log(password, confirmPassword);
    //2. validate
   if(password !== confirmPassword){
       return res.json({
           success:false,
           message:"Password not match"
       })
   }
  
   //3.get userdetails from db
   const userDetails = await User.findOne({token:token});
   //4. if no- entry Token invalid

   if(!userDetails){
       return res.json({
           success:false,
           message:"Token is invalid"
       });
   }
   // 5. token time check
   if(userDetails.resetPasswordExpires <Date.now()){
       return res.json({
           success:false,
           message:"Token is expired, please regenerate"

       })

   }
   ///hash password
   const hashedPassword = await bcrypt.hash(password, 10);

   //update password
   await User.findOneAndUpdate({token:token},
       
                   {password:hashedPassword},
                   {new:true});


       //return reponse

       return res.status(200).json({
           success:true,
           message:"Password reset succesfully"
       })
    }catch(error){
        console.log(error + "Error occured")
        return res.status(500).json({
            success:false,
            message:"error in resetting the password"
        })

    }

}