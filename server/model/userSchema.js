const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
   
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
    ,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    follow: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    favoritevideo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    purchasedVideos:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
    answers:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    token: {
        type: String,

    },
    confirmNum: {
        type: String
    },
    // cardAddress:[
    //     {

    //     }
    // ]
    about: {
        type: String
    },
    //status
    image: {
        type: String
    },
    social:[]
})


const User = mongoose.model("User", UserSchema);
 
module.exports = User