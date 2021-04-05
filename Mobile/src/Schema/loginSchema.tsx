import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    user: yup.string().required("Nome de usuário é obrigatório").trim(),
    password: yup.string().required("Senha é obrigatória"),
})