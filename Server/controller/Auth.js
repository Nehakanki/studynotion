const User = require("../models/User");
const { OTP, sendVerificationEmail } = require("../models/OTP")

const otpGenerator = require("otp-generator");

const Profile = require('../models/Profile')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const  mailSender  = require("../utils/nodemailer");
require("dotenv").config();

// OTP 

exports.sendOTP = async (req, res) => {
  try {
    //fetch email from the user Body
    const { email } = req.body;

    //check if the user aldready registers or not

    const exist_user = await User.findOne({ email });

    if (exist_user) {
      console.log("User aldready exist");
      res.status(401).json({
        success: false,
        message: "User Aldready Registered",
      });
    }
    //generated the OTP using the otp_generator library

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let check_unique_otp = await OTP.findOne({ otp });
    //check everytime unique OTP is generated
    while (check_unique_otp) {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      check_unique_otp = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };
    // Store into the DB

    const otpBody = await OTP.create(otpPayload);

    console.log("Generated OTP body", otpBody);
    res.status(200).json({
      success: true,
      data: otp,
      message: "OTP generated SUccessfully",
    });
  } catch (err) {
    console.log(err + "Error while generating the OTP");
    res.status(500).json({
      success: false,
      message: "Error while generating the OTP",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    //1. fetch data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //2. validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Enter required details",
      });
    }
    //3. password & confirmPassword Matching
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password mismatch",
      });
    }

    //4. check for existing user
    const existing_user = await User.findOne({ email });
    if (existing_user) {
      return res.status(400).json({
        success: false,
        message: "User aldready Exist/Registerd",
      });
    }

    //5.find most recent OTp from OTP DB

    const recent_otp = await OTP.find({ email })
      .sort({ createdAt: -1 }) //for sorting in ascending order
      .limit(1);
    console.log(recent_otp);

    //6. validate the OTP (both otp should be same)
    if (recent_otp.length == 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        message: "Invalid OTP length 0",
      });
    } else if (recent_otp[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP ",
      });
    }

    //7. Hash the password and Enter into Db
    const hashedPassword = await bcrypt.hash(password, 10);

    //8. Entry in Db (after this updation done in Profile Schema in profile controller logic is here)
    const profileDetails = await Profile.create({
      gender: "",
      DOB:"",
      about: "",
      ContactNumber: "",
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additonalDetails: profileDetails._id, //id passed here
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, //api for creating the profile pic of the user 
    });
    return res.status(200).json({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Error while creatin entry in DB" + error);
    return res.status(500).json({
      success: false,
      message: "Error while creatin entry in DB. try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;

    //valdate data
    if (!password || !email) {
      return res.status(403).json({
        success: false,
        message: "Enter required details",
      });
    }

    //check user
    const user = await User.findOne({ email }).populate("additonalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user Found SignUp first",
      });
    }
    //password match brcypt compare
    const passwordMatch = await bcrypt.compare(password, user.password);

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    //generateJWT
    if (passwordMatch) {
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "9d",
      });

      //this line might cause error
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //create cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log("Error while login" + error);
    return res.status(500).json({
      success: false,
      message: "Error while login",
    });
  }
};

