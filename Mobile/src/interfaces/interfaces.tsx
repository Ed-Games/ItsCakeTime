interface Product{
    id: number,
    name: string,
    detail: string,
    category: string,
    image: string,
    price: number,
    user_id: number,
    whatsapp?: string,
    email?: string,
}

interface Profile {
    id: number,
    description: string,
    whatsapp?: string,
    user_id: number,
    image: string,
    imageUrl?: string,
    specialty: string,
    userName: string,
    email?: string,
}