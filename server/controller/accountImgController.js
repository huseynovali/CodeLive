const { getFile, deleteFile, uploadFile } = require("../config/s3")
const User = require("../model/userSchema")
const multer = require("multer");
const upload = multer({ dest: "upload/" }).single("image");
const accountImgController = {

    addAccoundImg: async (req, res) => {
        const userId = req.params.userId;
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: "Image upload failed." });
                }
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }

                const file = req.file;
                const uploadedFile = await uploadFile(file);
                const lastPart = uploadedFile.Location.split("/").pop();

                // Kullanıcının veritabanındaki eski hesap resmi dosya anahtarını alalım
                const oldFileKey = user.image;

                // Eğer kullanıcının veritabanında daha önce hesap resmi varsa, eski hesap resmini S3'den silmek için "deleteFile" fonksiyonunu çağırabilirsiniz.
                if (oldFileKey) {
                    await deleteFile(oldFileKey);
                    res.status(200).json({ message: "Photo Edit" });
                } else {
                    res.status(201).json({ message: "Photo Added" });
                }

                // Kullanıcının veritabanındaki hesap resmi alanını güncelleyelim
                user.image = lastPart;
                await user.save();
            });
        } catch (err) {
            res.status(400).json({ mes: err.message });
        }
    },


    getAccoundImg: async (req, res) => {
        const Key = req.params.key;
        const result = getFile(Key)
        result.pipe(res)

    },
    deleteAccoundImg: async (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            const fileKey = user.image;
            if (!fileKey) {
                return res.status(404).json({ message: "Account image not found!" });
            }
            await deleteFile(fileKey);
            user.image = undefined;
            await user.save();
            res.status(200).json({ message: "Account image deleted successfully!" });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while deleting account image.", error: error.message });
        }
    },


}


module.exports = accountImgController