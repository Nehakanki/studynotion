const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../controller/Course');
const { json } = require('express');

const cloudinary = require('cloudinary').v2;


exports.UpdateProfile = async (req,res)=>{
   
    try{
         //get values
            // const {gender="" ,DOB="", about,ContactNumber } = req.body; --->sir code
                const {gender,DOB, about,ContactNumber } = req.body;
                //get User Id 
                //so if the user is logged in (means it has token ) and that token value we inserted into req,user so that we can easily decode the userID

                const id = req.user.id.toString();

                if(!gender || !DOB ||
                    !about||!ContactNumber|| !id){
                        return res.status(403).json({
                            success:false,
                        message : "All details are required "
                        })
                    }

                //find profile id   
                

                const userDetails = await User.findById(id);
                const profileID=  userDetails.additonalDetails;
                const profileDetails = await Profile.findById(profileID); 

                //update the profile Schema since we have aldready created the in SignUp logic

                profileDetails.DOB = DOB;
                profileDetails.about =about;
                profileDetails.gender = gender;
                profileDetails.ContactNumber = ContactNumber;
                //now save into the DB of profile

                await profileDetails.save();

                //return response

                return res.status(200).json({
                    success:true,
                    message:"Profile Updated Successfully"
                })



    }catch(error){
        console.log(error)
        res.status(404).json({
            success:false,
            message:error.message
        })
    }



}


exports.deleteProfile = async(req,res)=>{
    try{
        //get id 
        const id = req.user.id;
        //validate it
        const userDetails = await User.findById(id);

      
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
          //delete from Profile
          await Profile.findByIdAndDelete({_id:userDetails.additonalDetails});


          
          
        //delete from the EnrolledCOurses section 
        //just update the array
        await Course.updateMany(
            { StudentEnrolled: id },
            { $pull: { StudentEnrolled: id} }
        );
        //delete the User since we want to delete the profile
        await User.findByIdAndDelete({_id:id})


        return res.status(200).json({
            success:false,
            message:"Delete Profile and updated the enrolled course section"


        })
    }catch(error){
        console.log(error);
        return res.status(403).json({
            success:false,
            message:error.message

        })

    }

}

exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;
        //validate & getDetails

        const userDetails = await User.findById(id).populate("additonalDetails").exec();
        //populate to get all the entries
        return res.status(200).json({
            success:true,
            message:"User Data FOund",
            userDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
async function uploadToCloudinary(file,folder, quality){
    const options ={folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality= quality;
    }

    options.resource_type="auto"; //imp part
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.updateProfileImagee = async (req,res)=>{
    try {
        console.log("Update backend route")
        const userId = req.user.id;
        console.log(userId)
        
        const displayPicture = req.files.displayPicture
        console.log(displayPicture)
        
        const image = await uploadToCloudinary(
          displayPicture,
          process.env.FOLDER_NAME,
          1000,
          1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { image: image.secure_url },
          { new: true }
        )
        res.send({
          success: true,
          message: `Image Updated successfully`,
          data: updatedProfile,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}