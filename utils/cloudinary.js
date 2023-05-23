const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
      folder: "Gifs",
    });
  };
  
  const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
  };


module.exports = { uploadImage,  deleteImage };