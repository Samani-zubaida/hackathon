

import Post from "../models/UserPost.js";
import cloudinary from "../lib/config.js" // your cloudinary config

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id; // coming from JWT middleware

    if (!title || !description || !req.body.image)
      return res.status(400).json({ message: "All fields are required" });

    // Upload image to Cloudinary
    let imageUrl;
    if (req.body.image) {
      const uploadRes = await cloudinary.uploader.upload(req.body.image, {
        folder: "posts", // folder in Cloudinary
      });
      imageUrl = uploadRes.secure_url;
    }

    // Save post in DB
    const newPost = await Post.create({
      user: userId,
      title,
      description,
      image: imageUrl,
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts
