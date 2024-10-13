import { v2 as cloudinary } from "cloudinary";

async function CloudinaryConfig(FilePath) {
  cloudinary.config({
    cloud_name: "GetMeAChai",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  const uploadResult = await cloudinary.uploader.upload(FilePath, {
    resource_type: "image",
    quality: "auto",
  });

  return uploadResult.secure_url;
}
export default CloudinaryConfig;
