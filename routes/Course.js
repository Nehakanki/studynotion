

const express = require('express');

const router = express.Router();

const {auth, isInstructor , isStudent , isAdmin} = require('../middlewares/auth');

///------------CATEGORY-------------//
const {createCategory ,showAllCategories, categoryPageDetails} = require('../controller/Category');

router.get('/showAllCategories',showAllCategories );

router.post('/createCategory',auth,isAdmin,createCategory)
//2 routes remaing


/// -----------Section------------//
const {deleteSection, updateSection, createSection } = require('../controller/Section')

router.post("/addSection", auth, isInstructor,createSection);
router.post("/deleteSection", auth, isInstructor,deleteSection);
router.post("/updateSection",auth , isInstructor, updateSection);



// -------Subsection ------------//
const {createSubsection,updateSubsection,deleteSubsection} = require('../controller/Subsection')

router.post("/addSubSection",auth, isInstructor, createSubsection);
router.post("/updateSubSection",auth , isInstructor, updateSubsection);
router.post("/deleteSubSection", auth, isInstructor,deleteSubsection);


//-----Course -----------//
const {createCourse,getCourseDetails } = require('../controller/Course')

router.post('/createCourse', auth , isInstructor, createCourse);







//Rating and review///

const {getAllRating, getAverageRating , createRating_review} = require('../controller/Rating&Review')

router.post('/createRating', auth, isStudent,createRating_review);
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews', getAllRating);




module.exports = router;


