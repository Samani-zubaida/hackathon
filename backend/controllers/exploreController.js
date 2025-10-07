import Post from "../models/UserPost.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// // Update post
export const updatePost = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const post = await Post.findById(req.params.id);

//     if (!post) return res.status(404).json({ message: "Post not found" });
//     if (post.user.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not authorized" });

//     if (req.file) {
//       // delete old image
//       if (fs.existsSync(post.image)) fs.unlinkSync(post.image);
//       post.image = req.file.path;
//     }

//     post.title = title || post.title;
//     post.description = description || post.description;

//     const updatedPost = await post.save();
//     res.json({ message: "Post updated successfully", updatedPost });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post" });
//   }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // if (fs.existsSync(post.image)) fs.unlinkSync(post.image);
//pending
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};