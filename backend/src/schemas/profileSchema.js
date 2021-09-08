const yup = require('yup');

const userSchema = yup.object().shape({
    description: yup.string(),
    whatsapp: yup.string().min(11),
    specialty: yup.string(),
    image: yup.mixed()
})

module.exports = userSchema