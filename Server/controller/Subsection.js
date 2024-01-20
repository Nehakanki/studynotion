const SubSection = require('../models/SubSection');
const Section = require('../models/Section');

const cloudinary = require('cloudinary').v2;

require('dotenv').config();


async function uploadToCloudinary(file,folder, quality){
    const options ={folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality= quality;
    }

    options.resource_type="auto"; //imp part
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.createSubsection = async (req,res)=>{
   try{
        const {title, timeDuration, description,section_id }= req.body;

        const video = req.files.video;

        //validation

        if(!title || !timeDuration || !description ||!section_id ){
            return res.json({
                success:false,
                message:'Enter  all the details specially section_Id'
            })
        }
        //upload video to cloudinary
        const uploadVideo = await uploadToCloudinary(video, process.env.FOLDER_NAME);

//create the subsection

    const newSubsection = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadVideo.secure_url ,                                                
    })

    //update into the section
    const updatedSection = await Section.findByIdAndUpdate(section_id,
        {
            $push:{
                SubSection:newSubsection._id,
            }
        },{new:true});

        console.log(updatedSection);
        
    return res.status(200).json({
        success:true,
        message:"subsection created successfully and section updated"
    })

   }catch(error){
        console.log("Error while creation of subsection", error);
        return res.status(500).json({
            success:false,
            message:"Erorr while creating subsection",
            error:error.message
        })

   }


}

//updating the subsection
exports.updateSubsection = async (req,res)=>{
    try{
        //to update the subsection ki id is required
        const {title, timeDuration, description,subsection_id }= req.body;
        const video = req.files.videoFiles;
        
        //validate
        if(!title || !timeDuration || !description ||!subsection_id ||!video){
            return res.json({
                success:false,
                message:'Enter  all the details specially section_Id'
            })
        }
        //upload video to cloudinary
        const uploadVideo = await uploadToCloudinary(video, process.env.FOLDER_NAME);

        //update the subsection

        const updatedSubsection = await Subsection.findByIdAndUpdate({_id:subsection_id},
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadVideo.secure_url ,
        
            },{new:true});
        console.log(updatedSubsection);
        return res.status(200).json({
            success:true,
            message:"subsection updated successfully",
            updatedCourseDetails

        })


    }catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Unable to update SUbSection ",
            error: error.message
           })


    }
}
//deleting the subsection Part


exports.deleteSubsection = async(req,res)=>{
    try{
            const {subsection_id}= req.body;
            //validate the section id
            if(!subsection_id){
                return res.status(403).json({
                    success:false,
                    message:"Enter valid Section id or Id is missing"
                })
            }
        await findByIdAndDelete(subsection_id,{new:true});

        //do we need to deleted the entry in the course [Testing]
        return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully"
            
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Unable to delete Section ",
            error: error.message
           })

    }
}