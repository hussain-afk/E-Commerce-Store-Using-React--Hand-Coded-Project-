import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContext } from './ToastContext.jsx'

export const ProductContext = createContext()
function productProvider({ children }) {
    
    const { showToast } = useContext(ToastContext)
   
    const [products, setProducts] = useState(null)

    // other global states and functions can be added here
    const [auth, setAuth] = useState('Sign In')
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    // cart Counting
    const [cart, setCart] = useState(0)
    // url name for profile page
    const [profileUrl, setProfileUrl] = useState(null)
    // toast
    // const [toast, setToast] = useState({ show: false, message: '', type: '' })


    

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

    function refreshProducts() {
        getProducts()
        showToast('Products refreshed successfully!', 'success')
    }
    return (
        <>
            <ProductContext.Provider value={{ products, auth, setAuth, user, setUser, loading, cart, setCart, userData, setUserData, refreshProducts, profileUrl, setProfileUrl }}>
                {children}
            </ProductContext.Provider>

            {/* toast element */}
            
        </>

    )


}
export default productProvider
