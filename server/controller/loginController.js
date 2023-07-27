const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(500).json({ message: "The password is incorrect!" });
        } else {
  
            let token = jwt.sign(req.body.email, process.env.ACCESS_KEY)
            user.token = token;
            user.save()

            res.json({ "token": token, "user": user })
         
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = login
