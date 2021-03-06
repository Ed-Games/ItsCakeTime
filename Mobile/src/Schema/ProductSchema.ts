import * as yup from 'yup'

export const ProductSchema = yup.object().shape({
    name: yup.string().required("Um nome é necessário"),
    details: yup.string().required("Adicione uma descrição"),
    category: yup.string().required("Adicione uma categoria"),
    price: yup.string().required("seu produto precisa ter um preço"),
    image: yup.string().required('Uma imagem é necessária')
})