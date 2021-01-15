const nodemailer = require('nodemailer')

const SMTP_CONFIG = require('./smtp')


module.exports= async function sendMail(email){
    const transporter = await nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user:SMTP_CONFIG.user,
            pass: SMTP_CONFIG.password,
        },
    
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    async function run() {
        const mailSent = await transporter.sendMail({
            text: 'Esse é um teste',
            subject: 'Email teste no nodemailer',
            from:'Django guy <djangoguy2@gmail.com>',
            to: [email],
            html: "<h1>HELLO WORLD</h1>"
        }) 
    
        console.log(mailSent)
    }
    
    
    try {
        await run()
        console.log("enviado")
    } catch (error) {
        console.log("erro, envio não efetuado")
        console.log(error)
    }
}