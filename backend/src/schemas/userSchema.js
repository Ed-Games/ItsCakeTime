const yup = require('yup');

const userSchema = yup.object().shape({
    user: yup.string().required("user is required").trim(),
    password: yup.string().required("password is required"),
    email: yup.string().email().required("email is required"),
    whatsapp: yup.string().min(11).required("whatsapp is required")
})

module.exports = userSchema