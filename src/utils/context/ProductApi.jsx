import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()
function productProvider({ children }) {

    const [products, setProducts] = useState(null)

    // other global states and functions can be added here
    const [auth, setAuth] = useState('Sign In')
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState(0)
    


    const getProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            setProducts(data.products)
            setLoading(false)
            // console.log(data.products)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
  
    return (
        <ProductContext.Provider value={{ products, auth, setAuth, user, setUser, loading, cart, setCart, userData, setUserData }}>
            {children}
        </ProductContext.Provider>
    )


}
export default productProvider
