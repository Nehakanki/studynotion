const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../controller/Course')

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

//HW
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


          //HWW
          
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