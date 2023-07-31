const { sendEmail } = require("../services/sendingEmail");

const forgotPassword = {
    sendConfirmMessage: async (req, res) => {
        const { email } = req.body;
        try {
            userModel.findOne({ email })
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'User not found!' });
                        return;
                    }
                 
                    sendEmail(email, user_id)


                    res.send("hello")
                })
        }

        catch (err) {
            res.status(500).json(err);
        }
    }
}