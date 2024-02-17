const express = require('express');
const app = express();

require('dotenv').config();

// Define Port
const PORT = process.env.PORT || 4000;

// fetch routes from the main  Routes folder
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const courseRoute = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

// Middleware to parse JSON
app.use(express.json());

// Use cookie-parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Cors for the interaction between the front end and backend
const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// File Upload configuration
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        useTempFiles: true, 
        tempFileDir: "/tmp",
    })
);

// Cloudinary configuration
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// Connect to the database
const connectDb = require('./config/database');
connectDb.connect();

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/payment', paymentRoute);
app.use("/api/v1/reach", contactUsRoute);


// Default server response
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and Running",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});
