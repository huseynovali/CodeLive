const Video = require("../model/videoSchema");
const multer = require("multer");
const { uploadFile } = require("../config/s3.js");
const User = require("../model/userSchema");

const upload = multer({ dest: "upload/" }).single("video");

const VideoController = {
  addVideo: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Video upload failed." });
        }

        const { title, description, userid } = req.body;

        const file = req.file;
        const uploadedFile = await uploadFile(file);
        const lastPart = uploadedFile.Location.split("/").pop();

        const newVideo = new Video({
          title,
          description,
          userid,
          videoawsid: lastPart,
        });

        await newVideo.save();

        // Videonun ID'sini kullanıcının verilerine ekleyelim
        await User.findOneAndUpdate(
          { _id: userid },
          { $push: { videos: newVideo._id } }
        );

        res.status(201).json(newVideo);
      });
    } catch (err) {
      res.status(400).json({ mes: err.message });
    }
  },
};

module.exports = VideoController;
