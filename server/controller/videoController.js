const Video = require("../model/videoSchema");
const multer = require("multer");
const { uploadFile, getFile } = require("../config/s3.js");
const User = require("../model/userSchema");
const videoAndCoverImageUpload = multer({ dest: "upload/videos/" }).fields([
  { name: "video", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

const VideoController = {
  addVideo: async (req, res) => {
    try {
      videoAndCoverImageUpload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Video and cover image upload failed." });
        }

        const { title, description, userid } = req.body;

        const videoFile = req.files["video"][0];
        const uploadedVideo = await uploadFile(videoFile);
        const videoPath = uploadedVideo.Location.split("/").pop();

        const newVideo = new Video({
          title,
          description,
          userid,
          videoawsid: videoPath,
        });

        const coverImageFile = req.files["coverImage"][0];
        const uploadedImage = await uploadFile(coverImageFile);
        const imagePath = uploadedImage.Location.split("/").pop();

        newVideo.coverImageid = imagePath;

        await newVideo.save();

        res.status(201).json({ message: "Video and Cover Image added successfully!", newVideo });
      });
    } catch (err) {
      res.status(400).json({ mes: err.message });
    }
  },

  getVideo: async (req, res) => {
    const Key = req.params.key;
    const result = getFile(Key)
    result.pipe(res)
  },
};

module.exports = VideoController;
