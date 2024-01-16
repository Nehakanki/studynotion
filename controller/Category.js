const Category = require('../models/Category');

exports.createCategory = async(req,res)=>{
    try{    
        const {name, description}= req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }
        const CategoryDetails = await Category.create({
            name:name,
            description:description
        })
        console.log(CategoryDetails);
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        });

    }catch(error){
        console.log("Error"+error)
        return res.status(500).json({
            success:true,
            message:error.message
        })

    }
}

exports.showAllCategories = async(req, res)=>{
        try{
            const allCategories = await Category.find({},
                {name:true, description:true}
                );

                res.status(200).json({
                    success:true,
                    data:allCategories
                })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })

        }
};

exports.categoryPageDetails = async (req,res) =>{
    try{
        const {categoryId} = req.body

        //get courses for the speciafied category

        const selectedCategory = await Category.findById(categoryId).populate("Category").exec();
        console.log(selectedCategory);
        //handle the case when the category is not found

        if(!selectedCategory){
            console.log("Category not found");

            return res.status(500).json({
                success:false,
                message:"Category not found"
            })

        }
        //Handle the case when there are no courses
        if(selectedCategory.course.length === 0){
            console.log("No Course is Found for the selected Category");
            return res.status(404).json({
                success:false,
                message:"No course found for selected courss"
            })
        }
        const selectedCourses = selectedCategory.course;

        //get courses for other Categories
    const categoriesExpectedSelected = await Category.find({
        _id:{$ne:categoryId},
    }).populate("course");
    let differentCourses =[];
    for(const category of categoriesExpectedSelected){
        differentCourses.push(...category.course);
    }

    //get top-selling courses across all categories
    const allCategories = await Category.find().populate("course");
    const allCourses = allCategories.flatMap((category)=>category.course);
    const mostSellingCourses = allCourses.sort((a,b)=>b.sold -a.sold).slice((0,10));
        
    res.status(200).json({
        selectedCourses :selectedCourses,
        differentCourses:differentCourses,
        mostSellingCourses:mostSellingCourses
    })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internet server Error",
            error:error.message
        });
    };
};