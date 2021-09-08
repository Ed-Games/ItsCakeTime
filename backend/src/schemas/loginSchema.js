const yup = require('yup');

const loginSchema = yup.object().shape({
    user: yup.string().required("user is required").trim(),
    password: yup.string().required("password is required"),
})

module.exports = loginSchema