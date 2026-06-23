import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './reducers/CartSlice'
import WishlistSlice from './reducers/wishlistSlice'

const store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
})

export default store