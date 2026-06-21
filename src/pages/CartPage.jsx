import React, { useState, useContext } from 'react'
import { ProductContext } from '../utils/context/ProductApi'
import { ToastContext } from '../utils/context/ToastContext'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity } from '../store/reducers/CartSlice' 
import { NavLink } from 'react-router-dom';

function CartPage() {
  const cart = useSelector((state) => state.cart.cart) || [];
  const dispatch = useDispatch()
  
  // Promo Code States
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  // context
  const { setCart } = useContext(ProductContext);
  const { showToast } = useContext(ToastContext);

  // --- FIXED: Calculated using item.qty ---
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = cart.reduce((total, item) => total + item.price * (item.qty || 1), 0);
  
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10; 
  const tax = (subtotal - discount) * 0.08; 
  const finalTotal = Math.max(0, subtotal - discount + shipping + tax);

  // Promo Code Handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "SAVE10"');
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  function handleRemoveItem(id) {
    dispatch(removeFromCart(id));
    setCart(prev => Math.max(0, prev - 1));
    showToast('Item removed from your system cart.', 'info');
  }

  // Empty State Guard
  if (cart.length === 0) {
    return (
      <div className="scroll-behavior-none min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
            <span className="text-2xl text-slate-400">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Your cart feels a bit light</h2>
          <p className="text-slate-400 mb-6 text-sm">Looks like you haven't added anything to your cart yet. Let's find some favorites!</p>
          <NavLink to="/">
            <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-900/40 transform hover:-translate-y-0.5">
              Continue Shopping
            </button>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Shopping Cart</h1>
            {/* --- FIXED: Uses totalItemsCount variable --- */}
            <p className="text-xs text-slate-400 mt-1">Review your items ({totalItemsCount} items)</p>
          </div>
          {/* --- FIXED: Wrapped in NavLink for working navigation --- */}
          <NavLink to="/" className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 group">
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Back to Store
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Item List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-black/30 hover:border-slate-700 transition-colors duration-200"
              >
                {/* Product Detail Info */}
                <div className="flex items-center space-x-4">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                      NO IMG
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm sm:text-base line-clamp-2 leading-snug">{item.title}</h3>
                    <p className="text-indigo-400 font-bold text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Actions & Adjustments */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-800/60 sm:border-t-0 pt-3 sm:pt-0">
                  {/* Quantity Toggles */}
                  <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950 p-0.5 overflow-hidden shadow-inner">
                    <button 
                      /* --- FIXED: Dispatches with item.qty --- */
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.qty - 1) }))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-900 font-medium text-slate-400 hover:text-slate-200 rounded-lg transition"
                    >
                      −
                    </button>
                    {/* --- FIXED: Displays item.qty --- */}
                    <span className="w-8 text-center text-sm font-bold text-slate-200">{item.qty}</span>
                    <button 
                      /* --- FIXED: Dispatches with item.qty --- */
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.qty + 1 }))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-900 font-medium text-slate-400 hover:text-slate-200 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Absolute Deletion */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 p-2 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Checkout & Summary Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Promo Code Card */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (SAVE10)" 
                  disabled={promoApplied}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold px-4 rounded-xl transition-all"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-xs text-rose-400 mt-2 pl-1">{promoError}</p>}
              {promoApplied && (
                <p className="text-xs text-emerald-400 mt-2 pl-1 flex items-center gap-1">
                  ✓ Code applied successfully! ($10.00 saved)
                </p>
              )}
            </div>

            {/* Totals Summary Panel */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg shadow-black/30">
              <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>
              
              <div className="space-y-3.5 pb-4 border-b border-slate-800/80 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-md text-xs">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-200">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="text-base font-bold text-slate-300">Order Total</span>
                <span className="text-2xl font-extrabold text-white tracking-tight">${finalTotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-950/50 text-center text-sm transform hover:-translate-y-0.5">
                Proceed to Secure Checkout
              </button>
              
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-center">
                  <p className="text-xs text-slate-400">
                    Add <span className="font-bold text-indigo-400">${(100 - subtotal).toFixed(2)}</span> more to unlock <span className="text-emerald-400 font-bold">FREE shipping</span>!
                  </p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default CartPage