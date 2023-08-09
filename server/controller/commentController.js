const Comment = require("../model/comentSchema");
const Video = require("../model/videoSchema");

const commentController = {
    getCommentsByVideo: async (req, res) => {
        const videoId = req.params.videoId;
        try {
            const comments = await Comment.find({ videoId });
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching the comments.", error: error.message });
        }
    },
    addComment: async (req, res) => {
        try {
            const { videoId, userId } = req.params;
            const text = req.body.text
           console.log(text);
            const video = await Video.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found!" });
            }


            const newComment = new Comment({
                videoId,
                author: userId,
                text,
            });

            await newComment.save();


            video.comments.push(newComment._id);
            await video.save();

            res.status(201).json({ message: "Comment added successfully!", newComment });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while adding the comment.", error: error.message });
        }
    },

    deleteComment: async (req, res) => {
        const commentId = req.params.id;

        try {
            const comment = await Comment.findByIdAndDelete(commentId);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found!" });
            }

            const video = await Video.findById(comment.videoId);
            if (video) {
                video.comments.pull(commentId);
                await video.save();
            }

            res.status(200).json({ message: "Comment deleted successfully!" });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while deleting the comment.", error: error.message });
        }
    },

    editComment: async (req, res) => {
        const commentId = req.params.id;
        const { text } = req.body;

        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found!" });
            }

           
            comment.text = text || comment.text;
            comment.createdAt = new Date()
            await comment.save();

            res.status(200).json({ message: "Comment updated successfully!", comment });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while updating the comment.", error: error.message });
        }
    },
};

module.exports = commentController;
