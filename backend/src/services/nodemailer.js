const nodemailer = require('nodemailer')
const {google } = require('googleapis')
const { pugEngine } = require("nodemailer-pug-engine")
const ip = require('ip')
const path = require('path')
require('dotenv').config()
const prefix = process.env.PROJECT_MODE == 'production'? 'https://itscaketime-server.herokuapp.com': `http://${ip.address()}:3333/app/redirect`

module.exports = {
    async nodemailerSender(token, email){
        const CLIENT_ID= `${process.env.CLIENT_ID}`
        const CLIENT_SECRET= `${process.env.CLIENT_SECRET}`
        const REDIRECT_URI= `${process.env.REDIRECT_URI}`
        const REFRESH_TOKEN= `${process.env.REFRESH_TOKEN}`

        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

        async function sendMail(){
            try {
                const accessToken = await oAuth2Client.getAccessToken()

                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth : {
                        type: 'OAuth2',
                        user:'djangoguy2@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                })

                transport.use('compile',pugEngine({
                    templateDir: path.resolve(__dirname,'..', '..','resources', 'mail')
                }))

                const mailOptions = {
                    from:' DJANGO GUY | IT\'S CAKE TIME TEAM 🙂 <djangoguy2@gmail.com>',
                    to:[email],
                    subject:'Recuperação de senha ✔',
                    template: 'requestNewPasswd',
                        ctx: {
                            token,
                            email,
                            prefix
                        }
                    }

                const result = await transport.sendMail(mailOptions)
                return result

            } catch (error) {
                return error
            }
        }

        sendMail().then(result => console.log('Email Sent', result)).catch(error => console.log(error.message))
    }
}