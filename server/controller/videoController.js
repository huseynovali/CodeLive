const Video = require("../model/videoSchema");
const multer = require("multer");
const { uploadFile, getFile, deleteFile } = require("../config/s3.js");
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
        const user = await User.findById(userid);
        if (!user) {
          return res.status(404).json({ message: "User not found!" });
        }


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


        user.videos.push(newVideo._id);
        await user.save();


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
  deleteVideo : async (req, res) => {
    const videoId = req.params.videoId;
  
    try {

      const video = await Video.findByIdAndDelete(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found!" });
      }
  
      const videoFileKey = video.videoawsid;
      const coverimgFileKey = video.coverImageid;
      if (videoFileKey) {
        await deleteFile(videoFileKey);
      }
      if (coverimgFileKey) {
        await deleteFile(coverimgFileKey);
      }
      await User.findByIdAndUpdate(video.userid, { $pull: { videos: video._id } });
      res.status(200).json({ message: "Video deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the video.", error: error.message });
    }
  },
  
  videoEdit: async (req, res) => {
    const videoId = req.params.videoId;
    const { title, description } = req.body;

    try {
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found!" });
      }

      video.title = title || video.title; 
      video.description = description || video.description; 
    
      await video.save();

      res.status(200).json({ message: "Video updated successfully!", video });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the video.", error: error.message });
    }
  },



};

module.exports = VideoController;
