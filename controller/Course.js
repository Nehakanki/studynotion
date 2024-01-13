const Course = require('../models/Course');
const User = require('../models/User');
const Tag = require('../models/Tag');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create course function

exports.createCourse = async(req,res)=>{
    try{
        const   {courseName,courseDescription,whatWillWeLearn, price,tag} = req.body;//tag id is passed
        //get thumbnail

        const thumbnail = req.files.thumbnailImage;

        //simple validation
        if(!courseName ||
            !courseDescription|| !whatWillWeLearn||  !price|| !tag){
                return res.status(403).json({
                    success:false,
                    message:"Enter all required details"
                })
            };
            

        //instructor validation
        const userID = req.user.id;


        //valid tag
        const tagDetails =await Tag.findById(tag);
        if(!tagDetails){
            return res.status(403).json({
            success:false,
            message:"Tag Details not found"
            });
        }
        

        //upload image into cloudinary

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create entry into DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:userID,
            whatWillWeLearn,
            price,
            tag:tagDetails._id,
            thumbnail : thumbnailImage.secure_url,
            

        })
        console.log(newCourse);

        //add the new course into the user SChema of the instructor
        await User.findByIdAndUpdate({_id:userID},
            {
                $push:{
                    courses:newCourse._id,
                }
            },{new:true});

        //upadate the tag schema

        await Tag.findByIdAndUpdate({_id:tag},
            {
                $push:{
                    course:newCourse._id,

                }
            },
            {new:true});





        return res.status(200).json({
            success:true,
            message:"Courses created successfully"
        })


    }catch(error){
        console.log("error while creating the course");
        return res.status(403).json({
            success:false,
            message:error.message
        })
        
    }
}