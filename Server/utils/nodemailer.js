const nodemailer = require("nodemailer");
require('dotenv').config();
exports.mailSender = async(email, title, body)=>{

    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: 'gmail',
            secure: true,
            auth: {
           
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            },
            
    tls: {
        rejectUnauthorized: false
    },
    debug: true


          });
          

          const info = await transporter.sendMail({
            from: "StudyNotion",
            to: email,
            subject:title,
        
            html: body
          });
          console.log(info);

          return info;
    
    }catch(err){
        console.log("Error occured while nodemailer "+ err);
    }
}

//function called in OTP schema