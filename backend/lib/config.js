import { v2 as cloudinary } from "cloudinary";

// 🔹 Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Function to upload images
export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

// 🔹 Function to upload videos
export const uploadVideo = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // 👈 Important for videos
      folder: "videos", // Optional: organize uploads
    });
    return result.secure_url;
  } catch (error) {
    console.error("Video upload failed:", error);
    throw error;
  }
};

export default cloudinary;

