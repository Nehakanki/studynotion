
 const { mailSender } = require("../utils/nodemailer");
require("dotenv").config();


exports.sendMailtoUSer = async (req,res)=>{
    const {email} = req.body;

    try{
        const mailTouser = await mailSender(email ,"Thanks for Visting","Your message is took upon Thanks for visting our Website");

        if(!mailSender){
            console.log("Error in sending email")
            return res.status(404).json({
                success:false,
                message:"Error in mailing the user"
            })
        
        }
        return res.status(200).json({
            success:true,
            message:"mail sent to user successfully"
        })


        

    }catch(error){
        console.log(error);
        return res.json(200).json({
            success:false,
            message:error.message
        })
    }
}