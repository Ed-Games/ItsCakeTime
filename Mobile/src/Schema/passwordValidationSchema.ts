import * as yup from 'yup'

export const passwordValidationSchema = yup.object().shape({
    password: yup.string().required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas não combinam").required("obrigatório"),
})