const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create course function

exports.createCourse = async(req,res)=>{
    try{
        const   {courseName,courseDescription,whatWillWeLearn, price,category} = req.body;//Category id is passed
        //get thumbnail

        const thumbnail = req.files.thumbnailImage;

        //simple validation
        if(!courseName ||
            !courseDescription|| !whatWillWeLearn||  !price|| !category){
                return res.status(403).json({
                    success:false,
                    message:"Enter all required details"
                })
            };
            

        //instructor validation
        const userID = req.user.id;


        //valid Category
        const CategoryDetails =await Category.findById(Category);
        if(!CategoryDetails){
            return res.status(403).json({
            success:false,
            message:"Category Details not found"
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
            Category:CategoryDetails._id,
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

        //upadate the Category schema

        await Category.findByIdAndUpdate({_id:Category},
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