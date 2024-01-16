const User = require("../models/User");
const OTP = require("../models/OTP");
const otp_generator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { mailSender } = require("../utils/nodemailer");
require("dotenv").config();

// OTP 

exports.OTPGenerator = async (req, res) => {
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

    let otp = otp_generator(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let check_unique_otp = await OTP.findOne({ otp });
    //check everytime unique OTP is generated
    while (check_unique_otp) {
      let otp = otp_generator(6, {
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
        message: "Invalid OTP",
      });
    } else if (recent_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //7. Hash the password and Enter into Db
    const hashedPassword = await bcrypt.hash(password, 10);

    //8. Entry in Db (after this updation done in Profile Schema in profile controller logic is here)
    const profileDetails = await Profile.create({
      gender: null,
      DOB: null,
      about: null,
      ContactNumber: null,
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

//change Password

exports.resetPassword = async (req, res) => {
  //get data from req body
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.log("ENter valid email_ID");
    return res.status(400).json({
      success: false,
      message: "No user Found",
    });
  }

  //get old & new password , confirm password

  function newPassword(password) {
    if (password.length < 8) {
      console.log("enter min 8 length password");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      console.log("Enter atleast 1 upperCase letter");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      console.log("Enter atleast 1 lowerCase letter");
      return false;
    }
    //check for number
    if (!/\d/.test(password)) {
      console.log("enter atleast 1 Number");
      return false;
    }

    //for special charactet
    if (!/[!@#%^&*()-_+=<>?/[\]{}|]/.test(password)) {
      console.log("enter atleast 1 specail character");
      return false;
    }
    // Avoid common passwords or strings
    const commonPasswords = ["password", "qwerty", "12345"];
    if (commonPasswords.includes(password.toLowerCase())) {
      return false;
    }

    // If all checks pass, the password is valid
    return true;
  }
  const { confirmPassword, newPassword } = req.body;

  //validation
  try {
    if (validatePassword(newPassword)) {
      console.log("Password is valid.");
      if (newPassword === confirmPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update the password in DB after hashing it
        user.password = hashedPassword;
        const updated_password = await user.save();
        console.log(updated_password);
        console.log("Password updated successfully");

         // If the password update is successful, send a reset email
         
  //send Mail == password updated
         const emailTitle = "Password Reset Successfully";
         const emailBody ="Your password has been Successfully reset ";
         const email_res = await mailSender(user.email, emailTitle, emailBody);

         
  //return response
        return res.status(200).json({
            success:true,
            message:"PAssword reset done",
            data: user
        })

      } else {
        console.log("Enter new password correctly");
      }
    } else {
      console.log("Password is not valid.");
    }
  } catch (err) {
    console.log("Error something went wrong" + err);
  }


};
