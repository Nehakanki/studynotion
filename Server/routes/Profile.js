const express = require('express');

const router = express.Router();

const {auth, isInstructor , isStudent , isAdmin} = require('../middlewares/auth');

const {getAllUserDetails , deleteProfile,UpdateProfile , updateProfileImagee } = require('../controller/Profile');

const {resetPasswordToken,resetPassword} = require('../controller/ResetPassword')

router.get('/getUserDetails',auth,getAllUserDetails);
router.put('/updateProfile',auth, UpdateProfile);
router.delete('/deleteProfile', deleteProfile);
router.put('/updateDisplayPicture',auth ,updateProfileImagee)


//------------Reset Password-------------///

router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);



module.exports = router;