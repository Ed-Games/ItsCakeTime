import React,{ ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type ProductContext = {
    selectedProduct: Product| undefined,
    setSelectedProduct: (product: Product) => void,
}

type ProductContextProviderProps = {
    children: ReactNode
}

const ProductContext = createContext({} as ProductContext)

export function ProductContextProvider({children}: ProductContextProviderProps){
    const [selectedProduct, setSelectedProduct] = useState<Product>()

    return(
        <ProductContext.Provider
        value={{
            selectedProduct,
            setSelectedProduct
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)