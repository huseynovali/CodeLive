const Video = require("../model/videoSchema");
const multer = require("multer");
const User = require("../model/userSchema");
const Comment = require("../model/comentSchema");
const moment = require('moment');

const { uploadFile, deleteFile, getFile } = require("../services/s3");
const videoAndCoverImageUpload = multer({ dest: "upload/videos/" }).fields([
  { name: "video", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

const VideoController = {
  getAllVideoContent: async (req, res) => {
    try {
      const videos = await Video.find()
        .populate("categoryId")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
        })
        .populate("languageId")
        .populate("userid", "username")

      res.status(200).json(videos)
    } catch (error) {

    }

  },
  getVideoContentById: async (req, res) => {
    const id = req.params.id
 
    try {
      const videos = await Video.findById(id)
        .populate("categoryId")
        .populate("languageId")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
        })
        .populate("userid", "username")

      res.status(200).json(videos)
    } catch (error) {

    }

  },

  addVideo: async (req, res) => {
    try {
      console.log("asd");
      videoAndCoverImageUpload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Video and cover image upload failed." });
        }
        const { title, description, categoryId } = req.body;
        const userid = req.params.userid
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
          categoryId,
          videoawsid: videoPath,
          uploadDate: moment().format()
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
  deleteVideo: async (req, res) => {
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
      await Comment.deleteMany({ videoId });

      await User.findByIdAndUpdate(video.userid, { $pull: { videos: video._id } });
      res.status(200).json({ message: "Video deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the video.", error: error.message });
    }
  },

  videoEdit: async (req, res) => {
    const videoId = req.params.videoId;
    const { title, description } = req.body;
     console.log(title);
     console.log(videoId);
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

  likeVideo: async (req, res) => {
    const videoId = req.params.videoId;
    const userId = req.params.userId;
console.log(userId);
    try {
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found!" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      if (user.favoritevideo.includes(videoId)) {
        user.favoritevideo = user.favoritevideo.filter((id) => id.toString() !== videoId);
        video.likeBy = video.likeBy.filter((id) => id.toString() !== userId);
      } else {
        // If the user doesn't like the video yet, add the like
        user.favoritevideo.push(videoId);
        video.likeBy.push(userId);
      }

      await user.save();
      await video.save();

      res.status(200).json({ message: "Video liked/unliked successfully!", user });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while liking/unliking the video.", error: error.message });
    }
  },
  buyVideo: async (req, res) => {
    const videoId = req.params.videoId;
    const userId = req.params.userId;

    try {
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found!" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      user.purchasedVideos.push(video._id)
      video.buyingBy.push(user._id)


      await user.save();
      await video.save();

      res.status(200).json({ message: "Video buy successfully!", user });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while buying the video.", error: error.message });
    }
  },


};

module.exports = VideoController;
