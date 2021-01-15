require('dotenv').config()

const password = ""+process.env.EMAIL_PASS_WD

module.exports = {
    host: "smtp.gmail.com",
    port:587,
    user: "djangoguy2@gmail.com",
    password:password
}