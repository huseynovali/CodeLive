
const User = require("../model/userSchema")
const userController = {
    getAllUser: async (req, res) => {
        try {
            const data = await User.find()
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "users not found !" })
            }
        }
        catch (error) {
            res.status(400).json(error)
        }

    },
    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    editUserInfo: async (req, res) => {
        const id = req.params.id;
        const { username, email, about } = req.body
        try {
            const user = await User.findById(id);
            if (user) {
                user.username=username
                user.email = email
                user.about = about
                user.save()
                res.status(200).json({ message: "User information updated successfully!" });


            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            res.status(500).json(error);
        }


    }

}


module.exports = userController