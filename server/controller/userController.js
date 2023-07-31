
const User = require("../model/userSchema")
const userController = {

    getAllUser: async (req, res) => {
        const id = req.params.userid
        try {
            const data = await User.find()
                .select('username videos followers follow about image')
            if (data.length > 0) {
                const userdata = data.filter(user => user.id !== id)
                res.status(200).json(userdata)
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
        const token = req.params.token;
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
    getUserByIdGlobal: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id)
                .select('username videos followers follow about image')
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
                user.username = username
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


    },
    toggleFollowUser: async (req, res) => {
        const userId = req.params.userId;
        const followUserId = req.params.followUserId;

        try {
            const user = await User.findById(userId);
            const followUser = await User.findById(followUserId);

            if (!user || !followUser) {
                return res.status(404).json({ message: "User not found!" });
            }


            if (user.follow.includes(followUserId)) {

                user.follow = user.follow.filter((id) => id.toString() !== followUserId);
                followUser.followers = followUser.followers.filter((id) => id.toString() !== userId);
            } else {

                user.follow.push(followUserId);
                followUser.followers.push(userId);
            }

            await user.save();
            await followUser.save();

            res.status(200).json({ message: "Toggle follow status successfully!", user });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while toggling follow status.", error: error.message });
        }
    },

}


module.exports = userController