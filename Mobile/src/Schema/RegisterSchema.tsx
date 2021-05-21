import * as yup from 'yup'

export const Registervalidation = yup.object().shape({
    name: yup.string().required("Nome de usuário é obrigatório").trim(),
    email:yup.string().email().required("Um email é obrigatório").trim(),
    password: yup.string().required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas não combinam").required("obrigatório"),
    whatsapp:yup.string().required("Um número de Whatsapp é necessário")
})