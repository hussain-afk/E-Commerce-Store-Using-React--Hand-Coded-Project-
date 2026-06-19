import { createSlice } from '@reduxjs/toolkit'
import {useContext} from 'react'
import { ProductContext } from '../../utils/context/ProductApi'
// const { setCart } = useContext(ProductContext)
const initialState = {
    cart: [],
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cart.find((x) => x.id === item.id)
            if (existItem) {
                existItem.qty += 1;
            } else {
                state.cart.push({ ...item, qty: 1 });
            }
        },
        // --- FIXED REDUCER ---
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find((prod) => prod.id === id);
            if (item) {
                item.qty = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.cart = state.cart.filter((x) => x.id !== itemId)
        }
    },
})

export const { addToCart, updateQuantity, removeFromCart } = CartSlice.actions
export default CartSlice.reducer