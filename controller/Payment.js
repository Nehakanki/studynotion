const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/nodemailer')


//capture the paymnet and initaite the Razorpay order

exports.capturePayment = async(req, res)=>{
    //get courseId and UserId
    const {course_id}= req.body;
    const userId = req.user.id;
    //validation
    if(!course_id){
        return res.json({
            success:false,
            message:"Please provide the valid course Id"
        })
    }
    //valid course
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"Could not find the course"
            });
        }
        //user aldready pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.StudentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:error.message
            })
        }

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })


    }


    //create Order
    const amount = course.price;
    const currency ="INR";

    const options={
        amount : amount*100,
        currency,
        receipt : Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId
        }
    };

    try{
        //initiate the paymnet
        const paymentResponse = await instance.orders.create(options);

        console.log(paymnetResponse);
        return res.status(200).json({
            success:true,
            courseName :course.courseName,
            courseDescription: course.courseDescription,
            thumbail:course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,

            
        });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

//verify Signature of Razorpay and server

//matching of server secret & razorpay webhook secret

exports.verifySignature = async(res,req)=>{
    const webhookSecret = "12345678";
    const signature = req.body.headers("x-razorpay-signature");//after the successfull paymnet razorpay will send this

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is authorized")

         //get userID and courseid from Notes

    const {courseId, userId} = req.body.payload.payment.entity.notes;
    try{
        //find course and enroll student into it
        const enrolledCourse = await Course.findByIdAndUpdate(
            {_id:courseId},{$push:{StudentEnrolled:userId}},{new:true}
        )
        if(!enrolledCourse){
            return res.status(404).json({
                success:false,
                message:"No course available"
            })
        }

        console.log(enrolledCourse);

        //find the student and the course to thier list enrolled course me (Students's courses array must be updated)

        const enrolledStudent = await User.findByIdAndUpdate(
            {_id:userId},
            {
                $push:{courses:courseId},
            },
            {new:true})

            console.log(enrolledStudent);

            //send confirmation Email
        

            const emailResponse = await mailSender(enrolledStudent.email,
                "Congratulations from studynotion",
                "congratulation, you are onboraded into new Course"
                );

                console.log(emailResponse)

                return res.status(200).json({
                    success:true,
                    message:"Signature verified and course added"
                })

        }catch(error)
            {
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }

    
    }

    else{
        return res.status(400).json({
            success:false,
            message:"Invalid secret signature"
        })
    }

   





}


