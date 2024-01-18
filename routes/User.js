const express = require('express');

const router = express.Router();


const {login, signUp,sendOTP,changePassword } = require('../controller/Auth');

const {resetPasswordToken, resetPassword} = require('../controller/ResetPassword');

const {auth, isInstructor, isAdmin, isStudent} = require("../middlewares/auth");
const { route } = require('./Payment');

router.post("/login", login);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

router.post('/changePassword', auth, changePassword);

//reset Password

router.post('/reset-password-token', resetPasswordToken);


router.post('/reset-password', resetPassword);

//Export the router for use in the main application
module.exports = router;