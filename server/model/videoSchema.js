const mongoose = require("mongoose");


const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likeBy:
        [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }
        ],
    comments:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoawsid:{
        type:String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        
    },
    price: {
        type: String
    },
    buyingBy:
        [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }
        ],


})

const Video = mongoose.model("Video",videoSchema)

module.exports = Video