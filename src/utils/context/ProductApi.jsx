import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()
function productProvider({ children }) {

    const [products, setProducts] = useState(null)

    const getProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            setProducts(data.products)
            // console.log(data.products)
        } catch (error) {

        }
    }
    useEffect(() => {
        getProducts()
    }, [])
  
    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    )


}
export default productProvider
