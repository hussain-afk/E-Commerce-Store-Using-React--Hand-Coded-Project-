import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/context/ProductApi';
import { ShoppingBag, Star, Heart, ArrowRight, Check } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/reducers/CartSlice';

function ProdCard() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { products, refreshProducts, setCart, user } = useContext(ProductContext);

  // Dynamic local state nodes for clean UI feedback mechanics
  const [wishlist, setWishlist] = useState({});
  const [addingId, setAddingId] = useState(null);

  const toggleWishlist = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
    setCart(prev => prev + 1);
    // Provide isolated micro-feedback animation node on click
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 1200);
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 py-12 text-slate-400">
      
      {/* SYSTEM HEADER & REFRESH CONTROL BLOCK */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-slate-900 pb-6">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight uppercase">
            System Catalog
          </h2>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Querying active database modules
          </p>
        </div>
        
        <button 
          type="button"
          className="relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 font-mono text-xs font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500/50 py-2.5 px-5 rounded-xl transition-all duration-200 shadow-lg active:scale-95 group flex items-center gap-2"
          onClick={() => {
            const icon = document.getElementById('refresh-icon');
            icon?.classList.add('animate-spin');
            refreshProducts?.();
            setTimeout(() => icon?.classList.remove('animate-spin'), 800);
          }}
        >
          {/* Tactical inline SVG refresh node */}
          <svg 
            id="refresh-icon"
            className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors duration-200" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>

          <span>Execute Refresh</span>
          
          {/* Dynamic bottom laser bar anchor */}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
      </div>

      {/* RESPONSIVE DESIGN CLUSTER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products && products.map((product) => {
          const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
          const originalPrice = hasDiscount
            ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
            : null;
          const isAdding = addingId === product.id;

          return (
            <div
              key={product.id}
              className="w-full max-w-[340px] bg-gradient-to-b from-slate-950/80 to-slate-950/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-4 transition-all duration-300 group relative flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-950/10 hover:-translate-y-1"
            >
              {/* MAIN METADATA LINK WRAPPER */}
              <NavLink to={`/products/${product.id}`} className="block flex-1 flex flex-col no-underline">
                
                {/* 1. VISUAL LAYER: THUMBNAIL STORAGE DEPOT */}
                <div className="w-full aspect-square bg-slate-950 rounded-xl border border-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:border-slate-800/60 transition-colors">
                  
                  {/* Digital backdrop grid ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black text-[10px] tracking-tight px-2 py-0.5 rounded-md z-10">
                      -{Math.round(product.discountPercentage)}% OFF
                    </span>
                  )}

                  {/* Heart Toggle Switch (Isolated Event Bubbling) */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(e, product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800/60 text-slate-400 hover:text-red-400 transition-all z-20 active:scale-90 focus:outline-none"
                    aria-label="Toggle Registry Favorites"
                  >
                    <Heart
                      size={13}
                      className={wishlist[product.id] ? 'fill-red-500 text-red-500 scale-110 transition-transform' : 'transition-colors'}
                    />
                  </button>

                  {/* Product Media Processing */}
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-40 h-40 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500 z-10"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-center shadow-inner z-10">
                      <ShoppingBag size={20} className="text-slate-700" />
                    </div>
                  )}
                </div>

                {/* 2. SPECIFICATIONS LAYER: STRATIFIED TEXT FIELDS */}
                <div className="pt-4 px-1 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block font-mono">
                      {product.category || product.brand || 'System Node'}
                    </span>

                    <h3 className="font-bold text-sm text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
                      {product.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[32px]">
                      {product.description}
                    </p>
                  </div>

                  {/* METRICS ROW ARRAY */}
                  <div className="flex items-center justify-between border-t border-slate-900/60 pt-3 mt-auto">
                    <div className="flex items-baseline gap-2 text-left">
                      <span className="font-mono text-base font-black text-white tracking-tight">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="font-mono text-[10px] text-slate-600 line-through">
                          ${originalPrice}
                        </span>
                      )}
                    </div>

                    {product.stock <= 5 ? (
                      <span className="text-[9px] font-black bg-red-950/40 border border-red-900/30 text-red-400 px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                        Low Stock
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-black font-mono">
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        <span>{Number(product.rating || 4.5).toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </NavLink>

              {/* ACTION DISPATCH TRIGGER (OUTSIDE NAVIGATION LINK) */}
              <div className="mt-4">
                <button 
                  type="button"
                  onClick={user ? (e) => handleAddToCart(e, product) : undefined} 
                  disabled={isAdding}
                  className={`w-full flex items-center justify-center gap-2 border font-bold py-2.5 rounded-xl text-[11px] tracking-wide transition-all active:scale-[0.98] group/btn shadow-md ${
                    isAdding 
                      ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" 
                      : "bg-slate-900 hover:bg-blue-600 border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white"
                  }`}
                >
                  { user && isAdding ? (
                    <>
                      <Check size={12} className="text-emerald-400 animate-bounce" />
                      <span>Added to Core System</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={12} className="text-slate-500 group-hover/btn:text-white transition-colors" />
                      <span>Add to System Cart</span>
                      <ArrowRight size={10} className="text-slate-600 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all ml-0.5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProdCard;