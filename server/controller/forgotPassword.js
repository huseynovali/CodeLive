const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { sendEmail } = require("../services/sendingEmail");

const forgotPassword = {
    sendConfirmMessage: async (req, res) => {
        const { email } = req.body;
        console.log(email);
        try {
            User.findOne( {email} )
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'User not found!' });
                        return 0;
                    }
                     
                    sendEmail(email, user._id)
                    let token = jwt.sign(req.body.email, process.env.ACCESS_KEY)

                    res.json({token})
                })
        }

        catch (err) {
            res.status(500).json(err);
        }
    },

    resetPassword: (req, res) => {
        const { userId, password, confirmPassword } = req.body;
        if (!userId || !password || password !== confirmPassword) {
            res.status(400).json({ message: 'Invalid request!' });
            return;
        }
        try {
            userModel.findById(userId)
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'User not found!' });
                        return;
                    }

                    user.password = password;

                    user.save()
                        .then(() => {
                            res.json({ message: 'change password !',user });
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } catch (error) {
            res.status(400).json({ message: 'Invalid token!' });
        }
    }

}

module.exports = forgotPassword