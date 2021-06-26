import * as yup from 'yup'

export const ProfileSchema = yup.object().shape({
    description: yup.string().max(500,'Limite de  500 caracteres'),
    specialty: yup.string().max(100, 'Limite de 100 caracteres'),
    whatsapp: yup.string().min(11, 'minimo de 11 digitos').max(15, 'máximo de 15 dígitos').required("Este campo é obrigatório"),
})