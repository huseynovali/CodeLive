const bcrypt = require("bcrypt");
const User = require("../model/userSchema.js");
const multer = require("multer");
const { uploadFile } = require("../services/s3.js");




const upload = multer({ dest: "upload/" }).single("image");
const register = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Image upload failed." });
            }

            const { username, about, email, password } = req.body;
            const checkUseremail = await User.findOne({ email });

            if (checkUseremail) {
                return res.status(400).json({ message: "This email already exists !" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);


            const file = req.file;
            console.log(file);
            let uploadedFile = ""
            if (file) {
                uploadedFile = await uploadFile(file);

            }
            const lastPart = uploadedFile?.Location?.split("/").pop();
            const newUser = new User({
                username,
                about,
                email,
                password: hashedPassword,
                image: lastPart || "",
            });

            await newUser.save();
            res.status(201).json(newUser);
        });
    } catch (err) {
        res.status(400).json({ mes: err.message });
    }
};

module.exports = register;
