const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

const cloudinary = require('cloudinary').v2;

// const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create course function

exports.createCourse = async(req,res)=>{

    async function uploadToCloudinary(file,folder, quality){
        const options ={folder};
        console.log("temp file path", file.tempFilePath);
    
        if(quality){
            options.quality= quality;
        }
    
        options.resource_type="auto"; //imp part
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    }
    
    try{
        const   {courseName,courseDescription,whatWillWeLearn,tags ,price,category} = req.body;//Category id is passed
        //get thumbnail

        const thumbnail = req.files.thumbnail;
        console.log("Thumbnail")
        console.log(thumbnail)

        //simple validation
        if(!courseName ||
            !courseDescription|| !whatWillWeLearn|| !price|| !category ){
                return res.status(403).json({
                    success:false,
                    message:"Enter all required details"
                })
            };
            

        //instructor validation
        const userID = req.user.id;
        console.log(userID)

        
        //valid Category
        console.log("category", category)
        const CategoryDetails = await Category.findById(category);
        console.log("category detail",CategoryDetails)

        if(!CategoryDetails){
            return res.status(403).json({
            success:false,
            message:"Category Details not found"
            });
        }
        

        //upload image into cloudinary
        //upload to cloudinary


        const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME)
        console.log(thumbnailImage);
        
        //create entry into DB
        console.log("enrtry cration start")
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:userID,
            whatWillWeLearn,
            price,
            tags,
            Category:category,
            thumbnail : thumbnailImage.secure_url,
            

        })
        console.log("entry complete")
        console.log(newCourse);

        //add the new course into the user SChema of the instructor
        await User.findByIdAndUpdate({_id:userID},
            {
                $push:{
                    courses:newCourse._id,
                }
            },{new:true});

        //upadate the Category schema
            console.log("category ID", category)
        await Category.findByIdAndUpdate(category,
            {
                $push:{
                    course: newCourse._id

                }
            },
            {new:true});
        
        




        return res.status(200).json({
            success:true,
            message:"Courses created successfully"
        })


    }catch(error){
        console.log("error while creating the course"+error);
        return res.status(403).json({
            success:false,
            message:error.message
        })
        
    }
}


// get all Courses is remaining

exports.getCourseDetails = async (req,res)=>{
    try{
        const {courseId} = req.body;
        //to find course details
        const courseDetails = await Course.find({_id:courseId}).populate({
            path: "instructor",
            populate:{
                path:"additonalDetails",
            },
        }).populate("Category").populate("Rating_review")
        .populate({
            path:"courseContent",
            populate:{
                path:"SubSection"
            }
        }).exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find with the course with courseID"
            });

        }

        return res.status(200).json({
            success:true,
            message:"COurse detail fetch successfully",
            courseDetails
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });


    }
}