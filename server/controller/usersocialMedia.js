const User = require("../model/userSchema");

const userSocial = {
    addSocial: async (req, res) => {
        const userid = req.params.userid;
        const { name, link } = req.body;
        try {
            const user = await User.findById(userid);
            if (user) {
                user.social.push({ name, link });
                await user.save();
                res.status(201).json(link);
            } else {
                res.status(404).json("user not found !!!");
            }
        } catch (error) {
            res.status(500).json("An error occurred!");
        }
    },
    deleteSocial: async (req, res) => {
        const userid = req.params.userid;
        const  name  = req.params.name;
        console.log("asd",name);
        try {
            const user = await User.findById(userid);
            if (user) {
                user.social = user.social.filter(item => Object.values(item)[0] !== name);
                await user.save();
                res.status(200).json("social Link Deleted !");
            } else {
                res.status(404).json("user not found !!!");
            }
        } catch (error) {
            res.status(500).json("An error occurred!");
        }
    },
    // editSocial: async (req, res) => {
    //     const userid = req.params.userid;
    //     const { name, link } = req.body;
    //     try {
    //         const user = await User.findById(userid);
    //         if (user) {
    //             console.log(user);
    //             const index = user.social.findIndex(item => Object.values(item)[0] === name);
    //                 user.social[index].name = name;    
    //                 console.log(user.social[index].link);
    //                 user.social[index].link=link
    //                  user.save()
    //                 res.status(200).json(user.social);
              
    //         } else {
    //             res.status(404).json("user not found !!!");
    //         }
    //     } catch (error) {
    //         res.status(500).json("An error occurred!");
    //     }
    // }
};

module.exports = userSocial;
