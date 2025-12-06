// controllers/uploadController.js
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = req.file.path; // Cloudinary returns the URL on req.file.path

    res.json({
      message: "Upload successful",
      url: fileUrl,
    });
  } catch (err) {
    res.status(500).json({
      error: "Upload failed",
      details: err.message,
    });
  }
};
