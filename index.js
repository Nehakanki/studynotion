const express = require('express');
const app = express();

require('dotenv').config();

//define Port
PORT = process.env.PORT || 4000


//routes

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const courseRoute = require("./routes/Course")




//middle ware to parse json
app.use(express.json());



// Use cookie-parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//corcs for the interaction between the front end and backend
const cors = require('cors');

app.use(
    cors({
        origin:"https://localhost:3000",
        credentials :true,
    })
)
const connectDb = require('./config/database');
connectDb.connect();



const fileUpload = require('express-fileupload');

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir :"/tmp"
    })
)


// const {cloudinaryConnect} = require("./utils/imageUploader");
// cloudinaryConnect();
const { uploadImageToCloudinary } = require("./utils/imageUploader");
uploadImageToCloudinary();


app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course',courseRoute );
app.use('/api/v1/payment',paymentRoute);

//default server

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and Running"
        
        
        
    })
})


 
app.listen(PORT, ()=>{
    console.log(`App listen at ${PORT} port`);
})
