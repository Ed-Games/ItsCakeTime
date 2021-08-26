import React,{ ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type ProductContext = {
    selectedProduct: Product| undefined,
    setSelectedProduct: (product: Product) => void,
    handleSelectProduct: (data: Product) => Promise<void>,
}

type ProductContextProviderProps = {
    children: ReactNode
}

const ProductContext = createContext({} as ProductContext)

export function ProductContextProvider({children}: ProductContextProviderProps){
    const [selectedProduct, setSelectedProduct] = useState<Product>()

    async function handleSelectProduct(data: Product){
        console.log('1 - product data is been copied')
        setSelectedProduct(data)
        console.log('2 - product data is now selected')
    }


    return(
        <ProductContext.Provider
        value={{
            selectedProduct,
            setSelectedProduct,
            handleSelectProduct
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)