const nodemailer = require('nodemailer')
const {google } = require('googleapis')
const { pugEngine } = require("nodemailer-pug-engine")
const path = require('path')

module.exports = {
    async nodemailerSender(token, email){
        const CLIENT_ID='968046093660-nm13sppr60ge45brefuffg44chuu4216.apps.googleusercontent.com'
        const CLIENT_SECRET='TWZs-0oFEH-q2JQh09jJNalV'
        const REDIRECT_URI='https://developers.google.com/oauthplayground'
        const REFRESH_TOKEN='1//04roGNCdLM1NOCgYIARAAGAQSNwF-L9Ir49slxPlXmg8jLjlnMsxwlJRCw2O0AOKbP1LfOyTxLsIsm7dvYS0cjfnxZAs4eyYoVKU'

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
                            email
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