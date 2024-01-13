const Section = require('../models/Section');
const Course = require('../models/Course');
const { findByIdAndUpdate, findByIdAndDelete } = require('../models/User');

exports.createSection = async (req, res)=>{
    try{
        const {sectionName, courseId} = req.body;
        //1. data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing section name OR courseId"

            })
        }
        //2. Create the section
        const newSection = await Section.create({sectionName});

        //3.update course with the section Object ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            
            
            },{new:true});

        //this above code will return the courseDetail id but if we want the whole course?

        //return res

        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updatedCourseDetails

        })


    }catch(error){
        console.log(error)
       return res.status(400).json({
        success:false,
        message:"Unable to create Section ",
        error: error.message
       })
    }
}

exports.updateSection = async (req, res)=>{
    try{
        //1. fetch data
        const {sectionName, sectionId} =req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Enter SectionName and SectionID first"
            })
        }
        const updatedSection = await findByIdAndUpdate({sectionId},{sectionName},{new:true});
        
        console.log(updatedSection)
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            updatedCourseDetails

        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Unable to update Section ",
            error: error.message
           })

    }
}

exports.deleteSection =async (req,res)=>{
    try{
        //fetch the section Id
        const {sectionId} = req.body;
        //validate the section id
        if(!sectionId){
            return res.status(403).json({
                success:false,
                message:"Enter valid Section id or Id is missing"
            })
        }
        await findByIdAndDelete(sectionId,{new:true});
        //do we need to deleted the entry in the course [Testing]
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
            
        })



    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Unable to delete Section ",
            error: error.message
           })

    }
}