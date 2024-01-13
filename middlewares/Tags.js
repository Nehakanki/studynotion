const Tag = require('../models/Tag');

exports.createTag = async(req, res)=>{
    try{
        const {name, description} = req.body;
        //validate

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message:"Enter all required feilds"
            })
        }

        //create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails)

        //return response
        return res.status(200).json({
            success:true,
            message:"Tag created Successfully"
        })

    }catch(error){
        console.log(error ,"Error occured");
        return res.status(400).json({
            success: false,
            message:error.message
        })
        

    }
}

//get all tags
exports.showAlltags = async (req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description:true});
        console.log(allTags)

        res.status(200).json({
            success:true,
            message:"Tags returned Successfully"
        });

    }catch(error){
        console.log(error ,"Error occured");
        return res.status(400).json({
            success: false,
            message:error.message
        })
    
    };
    
}
