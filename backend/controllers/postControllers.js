import cloudinary from "../lib/config.js";
import UserPost from "../models/UserPost.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, image, video } = req.body;
    const userId = req.user._id; // from JWT middleware

    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" });

    if (!image && !video)
      return res.status(400).json({ message: "Please upload an image or a video" });

    // Upload image (if provided)
    let imageUrl = null;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image, {
        folder: "posts/images",
        resource_type: "image",
      });
      imageUrl = uploadImage.secure_url;
    }

    // Upload video (if provided)
    let videoUrl = null;
    if (video) {
      const uploadVideo = await cloudinary.uploader.upload(video, {
        folder: "posts/videos",
        resource_type: "video",
      });
      videoUrl = uploadVideo.secure_url;
    }

    // Save post in MongoDB
    const newPost = await Post.create({
      user: userId,
      title,
      description,
      image: imageUrl,
      video: videoUrl,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error while creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

