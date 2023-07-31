
    const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//Öncelikle mail konfigürasyonumu yazıyorum
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
const sendEmail = (userEMail,token)=>{
    transporter.sendMail({
        from: 'c8657545@gmail.com',
        to: userEMail,
        subject: "Confirm Code",
        html: `<p>Parolanızı sıfırlamak için <a href=${"http://localhost:3000/resetpassword/"+token}>buraya tıklayın</a>.</p>`
    });
}


module.exports = {
    sendEmail
}
