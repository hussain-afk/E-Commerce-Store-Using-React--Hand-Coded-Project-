import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    wishlist: [],
};

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;
            const existItem = state.wishlist.find((x) => x.id === item.id);
            if (!existItem) {
                state.wishlist.push(item);
            }
        },
        removeFromWishlist: (state, action) => {
            const itemId = action.payload;
            state.wishlist = state.wishlist.filter((x) => x.id !== itemId);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;