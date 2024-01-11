const User = require('../models/User');
const OTP = require('../models/OTP');
const otp_generator = require('otp-generator');


exports.OTPGenerator = async (req, res)=>{
    try{
        //fetch email from the user Body
        const {email}= req.body;

        //check if the user aldready registers or not

        const exist_user = await User.findOne({email});

        if(exist_user){
            console.log("User aldready exist");
            res.status(401).json({
                success:false,
                message:"User Aldready Registered"
        
            })
        }

      let generated_OTP = otp_generator(6, {
                upperCaseAlphabets :false,
                lowerCaseAlphabets : false,
                specialChars :false
        })

        let  check_unique_otp = await OTP.findOne({generated_OTP});
        //check everytime unique OTP is generated
        while(check_unique_otp){
           let generated_OTP = otp_generator(6, {
                upperCaseAlphabets :false,
                lowerCaseAlphabets : false,
                specialChars :false
        })
         check_unique_otp = await OTP.findOne({generated_OTP});

        };

        const otpPayload = {email, generated_OTP};
        // Store into the DB

        const otpBody = await OTP.create(otpPayload);

        console.log("Generated OTP body", otpBody);
        res.status(200).json({
            success:true,
            data: generated_OTP,
            message:"OTP generated SUccessfully"
        })
        



    }catch(err){
        console.log(err+"Error while generating the OTP")
        res.status(500).json({
            success:false,
            message:"Error while generating the OTP"
    
        });

    };
}


exports.signUp = async (req, res) =>{
    //1. fetch data from req body

    //2. validate data

    //3. password & confirmPassword Matching

    //4. check for existing user 

    //5.find most recent OTp from OTP DB

    //6. validate the OTP (both otp should be same)

    //7. Hash the password and Enter into Db


}