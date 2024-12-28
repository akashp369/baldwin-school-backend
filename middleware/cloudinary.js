const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (file) => {
  
  try {
    console.log("before clound", file);
    const data = await cloudinary.uploader.upload(file.path, {
      folder: "Websitecms", // Specify the folder name
    });
    console.log(data, "<<<thsis is data in cloudinary ");
    return data?.secure_url;
  } catch (error) {
    console.log(error.message);
  }
  // try {
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: serviceAccountKeyPath,
  //     scopes: 'https://www.googleapis.com/auth/drive',
  //   });

  //   const drive = google.drive({ version: 'v3', auth });

  //   const requestBody = {
  //     name: file.originalname,
  //   };
  //   const media = {
  //     mimeType: file.mimetype,
  //     body: fs.createReadStream(file.path),
  //   };

  //   const response = await drive.files.create({
  //     requestBody,
  //     media: media,
  //     fields: 'id,webViewLink', 
  //   });

  //   fs.unlinkSync(file.path);

  //   const fileId = response.data.id;
  //   let webViewLink = response.data.webViewLink; 
  //   // webViewLink = webViewLink.replace('/view?usp=drivesdk', '/preview');

  //   console.log('File uploaded successfully. File ID:', fileId);
  //   console.log('WebView Link:', webViewLink);

  //   await drive.permissions.create({
  //     fileId: fileId, 
  //     requestBody: {
  //       role: 'reader',
  //       type: 'anyone'
  //     }
  //   });
  //   console.log('File permissions set to make it publicly accessible.');
  //   if(!fileId){
  //     throw new Error("File ID is undefined.");
  //   }
  //   let str = `https://drive.google.com/thumbnail?id=${fileId}&sz=w250`
  //   return str 
  // } catch (error) {
  //   console.error('Error uploading file to Google Drive:', error);
  //   throw error;
  // }
  
};
const deleteFromCloudinary = async (url) =>{
  try {
    const deleteResult = await cloudinary.uploader.destroy(url);
    console.log('Image deleted successfully:');
    console.log(deleteResult);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}


// const uploadPdf = async (file) => {
//   try {
//     console.log("before clound", file);
//     const data = await cloudinary.uploader.upload(file.path);
//     console.log(data, "<<<thsis is data incloudinary");
//     return data.secure_url;
//   } catch (error) {
//     console.log(error.message);
//   }
// };



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

module.exports = {uploadOnCloudinary,deleteFromCloudinary};