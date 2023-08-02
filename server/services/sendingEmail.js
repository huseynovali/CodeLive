const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: "c8657545@gmail.com",
        pass: "bcozssymjajpqicg",
    },
});
const sendEmail = (userEMail,userId)=>{
    transporter.sendMail({
        from: 'c8657545@gmail.com',
        to: userEMail,
        subject: "Confirm Code",
        html: `<p>Parolanızı sıfırlamak için <a href=${"http://localhost:3000/resetpassword/"+userId}>buraya tıklayın</a>.</p>`
    });
}


module.exports = {
    sendEmail
}
