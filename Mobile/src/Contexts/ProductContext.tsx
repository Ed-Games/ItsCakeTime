import React,{ ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { Navigate } from "../services/RootNavigation";

type ProductContext = {
    selectedProduct: Product| undefined,
    setSelectedProduct: (product: Product) => void,
    handleSelectProduct: (data: Product) => void,
}

type ProductContextProviderProps = {
    children: ReactNode
}

const ProductContext = createContext({} as ProductContext)

export function ProductContextProvider({children}: ProductContextProviderProps){
    const [selectedProduct, setSelectedProduct] = useState<Product>()

    function handleSelectProduct(data: Product){
        setSelectedProduct(data)
    }

    useEffect(()=>{
        Navigate('EditProduct', {})
    }, [selectedProduct])


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