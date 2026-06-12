import React, { useContext, useState } from 'react';
import { ProductContext } from '../utils/context/ProductApi';
import { ShoppingBag, Star, Heart, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function ProdCard() {
  const { products, setCart } = useContext(ProductContext);

  // Track unique wishlisted item state nodes dynamically
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 py-12 text-slate-400">

      {/* RESPONSIVE DESIGN CLUSTER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">

        {products && products.map((product) => {
          // Dynamic price markdown calculations based on incoming API data fields
          const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
          const originalPrice = hasDiscount
            ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
            : null;

          return (
            <div
              key={product.id}
              className="w-full max-w-[340px] bg-gradient-to-b from-slate-900/60 to-slate-950/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-3.5 transition-all duration-300 group relative flex flex-col justify-between shadow-xl shadow-black/20"
            >
              <NavLink to={`/products/${product.id}`}>

              {/* 1. VISUAL LAYER: THUMBNAIL STORAGE DEPOT */}
              <div className="w-full aspect-square bg-slate-950 rounded-xl border border-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:border-slate-800/40 transition-colors">

                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black text-[10px] tracking-tight px-2 py-0.5 rounded-md z-10">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}

                {/* Heart Toggle Switch */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800/60 text-slate-400 hover:text-red-400 transition-all z-10 active:scale-90 focus:outline-none"
                  aria-label="Toggle Registry Favorites"
                >
                  <Heart
                    size={13}
                    className={wishlist[product.id] ? 'fill-red-500 text-red-500' : 'transition-colors'}
                  />
                </button>

                {/* Product Media Source Rendering */}
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-40 h-40 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 z-10"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-center shadow-inner">
                    <ShoppingBag size={20} className="text-slate-700" />
                  </div>
                )}

                {/* Aesthetic vector wireframe mesh ring */}
                <div className="absolute inset-0 border border-slate-900/20 rounded-full scale-75 animate-[spin_120s_linear_infinite]" />
              </div>

              {/* 2. SPECIFICATIONS LAYER: STRATIFIED TEXT FIELDS */}
              <div className="pt-4 px-1 space-y-3.5 flex-1 flex flex-col justify-between">

                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block">
                    {product.category || product.brand || 'System Node'}
                  </span>

                  <h3 className="font-bold text-sm text-white tracking-tight group-hover:text-blue-400 transition-colors leading-tight line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[32px]">
                    {product.description}
                  </p>
                </div>

                {/* FINANCIAL & EVALUATION METRICS METADATA ROW */}
                <div className="flex items-center justify-between border-t border-slate-900/60 pt-3">

                  {/* Prices Columns */}
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

                  {/* Stock Alert Bounds Switching */}
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

                {/* 3. TRANSACTION CTA INTERACTION ELEMENT */}
                <button onClick={() => setCart((prev) => prev + 1)} className="w-full mt-0.5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 font-bold py-2 rounded-xl text-[11px] tracking-wide text-slate-300 hover:text-white transition-all active:scale-[0.98] group/btn shadow-md shadow-black/10">
                  <ShoppingBag size={12} className="text-slate-500 group-hover/btn:text-white transition-colors" />
                  <span>Add to System Cart</span>
                  <ArrowRight size={10} className="text-slate-600 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all ml-0.5" />
                </button>

              </div>
              </NavLink>
            </div>
            
          );
        })}

      </div>

    </div>
  );
}

export default ProdCard;