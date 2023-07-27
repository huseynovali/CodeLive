const mongoose = require("mongoose");


const languageSchema = mongoose.Schema({
    name: {
        type: String,
    }

})



const Language = mongoose.model("Language",languageSchema);


module.exports = Language