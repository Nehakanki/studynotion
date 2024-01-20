const User = require('../models/User')
const  Rating_Review = require('../models/Rating_Review');
const Course = require('../models/Course');
const { UpdateProfile } = require('./Profile');
const { default: mongoose } = require('mongoose');

exports.createRating_review = async(req,res)=>{
    try{
        //1. get UserId (user is logged in)
        //2. fetchData from req body
        //3. check if the user is enrolled aur not
        //4. check user aldready did rating and review or not
        //5. create
        //6. return

        const uid = req.user.id; //userId we passed in the token (AUTH middleware)

        const {rating, review, courseId} = req.body

       const courseDetails = await Course.findOne({
        _id:courseId,
        StudentEnrolled :{$eleMatch :{$eq :uid}},
       })

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled into the Course"

            })
        }

        const StudentInRating_review = await Rating_Review.find({user:uid,
                    course:courseId,
        });
        if(StudentInRating_review){
            return res.status(404).json({
                success:false,
                message:"User have aldready reviewed and rated"
            })
        }
            
        const  newRating_review = await Rating_Review.create({
            user:uid,
           rating,
           review,
           course:courseId

        })
        console.log(newRating_review);

       const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
            {
                $push: {
                    Rating_review :newRating_review._id,
                }
            },
            {new:true}
            )

            console.log(updatedCourseDetails)
        return res.status(200).json({
            success:true,
            message:"rating and Review Created Successfully"
        })

       
    }catch(error){
        console.log(error);
     return  res.status(404).json({
            success:false,
            message:error.message

        })


    }
}

exports.getAverageRating = async(req, res)=>{
    try{
        //get courseId
        const courseId = req.body.courseId;

        //calculate avg rating
         const result = await Rating_Review.aggregate([
          {
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            }
          },
          {
            $group:{
                _id:null,//all id
                averageRating : {$avg :"$rating"}

            }
          }
         ])

         if(result.length >0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
         }
        
         //if no rating/review exist
         return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no rating is given till now",
            averageRating: 0
         })
        //return res

    }catch(error){

        console.log(error);
        return  res.status(404).json({
               success:false,
               message:error.message
   
           })
    }
}

//get all Rating
exports.getAllRating = async(req,res)=>{
    try{
        
      const allRating_Review = await Rating_Review.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstname lastname email image",
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"Got all the courses",
            data:allRating_Review
        });






    }catch(error){
        return res.status(404).json({
            success:false,
            message: error.message
        })

    }
}


