
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

            const user = await User.findById(id)

                .populate(
                    {
                        path: "videos",
                        select: "coverImageid uploadDate videoawsid title"
                    },
                )
                .populate(
                    {
                        path: "follow",
                        select: "username image"
                    }
                )
                .populate(
                    {
                        path: "followers",
                        select: "username image"
                    }
                )
                .populate(
                    {
                        path: "favoritevideo",
                        select: "coverImageid uploadDate title",
                        populate:{
                            path:"categoryId",
                            select:"name"
                        }
                        
                    },
                )
            if (user) {
                if (token == user.token) {
                    res.status(200).json(user);
                } else {
                    res.status(400).json({ message: "you don't have permission !!!" })
                }


            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUserByIdGlobal: async (req, res) => {

        const id = req.params.id;
        console.log(id);
        try {
            const user = await User.findById(id)
                .select('username videos followers follow about image')
            if (user) {
                console.log(user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            res.status(500).json("asd");
        }
    },
    editUserInfo: async (req, res) => {
        const id = req.params.id;
        const { username, email, about } = req.body;
        try {
            const user = await User.findById(id);
            if (user) {
                user.username = username;
                user.about = about;
    
                // E-posta adresinin değişip değişmediğini kontrol ediyoruz
                if (user.email !== email) {
                    const emailCheck = await User.findOne({ email });
                    if (emailCheck) {
                        return res.status(400).json({ message: "This email already exists!" });
                    }
                    user.email = email;
                }
    
                user.save();
                return res.status(200).json({ message: "User information updated successfully!" });
            } else {
                return res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            return res.status(500).json(error);
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