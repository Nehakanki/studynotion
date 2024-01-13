const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const user = require('../models/User');       

//auth
exports.auth = async (req,res, next)=>{
    try{

        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is missing"
            })
        };
        //verfiy the tokem
        try{
            const decode = await jwt.verify(token, process.env.SECRET_KEY);

            console.log(decode);
            req.user = decode;

        }catch(error){
            console.log(error + "invalid token")
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });

        }

        next();
    }catch(error){
        console.log("error"+ error)
        return res.status(401).json({
            success:false,
            message:"somthing went worng"
        });

    }
}




//isStudent
exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for student"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified, please try again'
        })
    }

}


//isInstructor

exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified, please try again'
        })
    }

}


exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified, please try again'
        })
    }

}


