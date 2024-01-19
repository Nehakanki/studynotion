// const cloudinary = require('cloudinary').v2;


// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//     const options = {folder}; // Create an empty options object
   
//     if (folder) {
//         options.folder = folder;
//     }

//     if (height) {
//         options.height = height;
//     }

//     if (quality) {
//         options.quality = quality;
//     }

//     options.resource_type = "auto";

//     try {

// //       if (!file || !file.tempFilePath) {
// //   console.error("Invalid or missing file object.");
// //   // Handle the error or return early
// //   return; 
// // }
//         const result = await cloudinary.uploader.upload(file, options);
//         return result;
//     } catch (error) {
//         console.error("Error uploading image to Cloudinary:", error);
//         throw error;
//     }
// };
