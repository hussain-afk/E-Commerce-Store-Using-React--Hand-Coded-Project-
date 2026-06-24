// import React from 'react';
import { memo, useContext } from 'react';
import { ProductContext } from '../utils/context/ProductApi';
import { ToastContext } from '../utils/context/ToastContext';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../store/reducers/wishlistSlice';
import { NavLink, useParams } from 'react-router-dom';
// Assuming you have a cart slice to handle "Move to Cart"
import { addToCart } from '../store/reducers/CartSlice';

function WishListPage() {
    const { setCart, setWishlist } = useContext(ProductContext);
    const { showToast } = useContext(ToastContext);
    const { id } = useParams();
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const dispatch = useDispatch();

    const handleMoveToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
        setCart(prev => prev +1); // Increment cart count in context
        setWishlist((prev) => prev - 1); // Decrement wishlist count in context
        showToast('Item moved to cart!', 'success');
    };
    const handleRemoveFromWishlist = (itemId) => {
        dispatch(removeFromWishlist(itemId));
        setWishlist((prev) => prev - 1);
        showToast('Item removed from wishlist.', 'info');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">My Wishlist</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        You have <span className="font-semibold text-indigo-400">{wishlist.length}</span> {wishlist.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>

                {wishlist.length > 0 && (
                    <button
                        onClick={() => dispatch(clearWishlist())}
                        className="text-sm font-medium text-red-400 hover:text-red-300 hover:underline transition duration-150"
                    >
                        Clear All Items
                    </button>
                )}
            </div>

            {/* Main Content */}
            {wishlist.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-800">
                    {/* <div className="text-5xl mb-4"></div> */}
                    <h2 className="text-xl font-semibold text-slate-200">Your wishlist is empty</h2>
                    <p className="text-slate-400 mt-2 max-w-sm mx-auto">
                        Explore our shop and tap the heart icon on items you want to keep an eye on!
                    </p>
                    <NavLink
                        to="/"
                        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
                    >
                        Continue Shopping
                    </NavLink>
                </div>
            ) : (
                // 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        // <NavLink to={`/wishlist/${item.id}`} className="block">
                            <div
                                key={item.id}
                                className="group relative border border-slate-800 rounded-xl overflow-hidden bg-slate-900 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/50 transition-all duration-300 flex flex-col"
                            >
                                {/* Product Image Holder */}
                            
                            <div className="aspect-square w-full bg-slate-950 relative overflow-hidden">
                                <img
                                    src={item.thumbnail || 'https://via.placeholder.com/300'}
                                    alt={item.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                                />

                                {/* Delete Shortcut Overlay */}
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-400 transition shadow-md backdrop-blur-xs border border-slate-800"
                                    title="Remove item"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-bold text-white mt-1">${item.price.toFixed(2)}</p>
                                    {item.inStock === false && (
                                        <span className="inline-block mt-1 text-xs text-red-400 font-medium">Out of stock</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        disabled={item.inStock === false}
                                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition shadow-md shadow-indigo-600/10 flex justify-center items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        
                        </div>
                        // {/* </NavLink> */}
                    ))}
                </div>
                // </NavLink>
            )}
        </div>
    );
}

export default memo(WishListPage);