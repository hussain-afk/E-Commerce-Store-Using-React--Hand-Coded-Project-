import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/context/ProductApi';
import { ShoppingBag, Star, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

function ProdDeatailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cartData, setCartData } = useContext(ProductContext);

  // Track selected active image from the product's image directory array
  const [activeImg, setActiveImg] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products?.find((item) => item.id === Number(id));

  

  // Sync active image once the context data structure loads successfully
  useEffect(() => {
    if (product?.thumbnail) {
      setActiveImg(product.thumbnail);
    }
  }, [product]);

  // Handle the initial context pipeline downloading layout state
  if (!products) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
        <div className="animate-spin rounded-full h-7 w-7 border-2 border-blue-500/20 border-t-blue-500 mr-3" />
        <span className="tracking-wide text-xs font-mono">LOADING SYSTEM REGISTRY...</span>
      </div>
    );
  }

  // Handle wrong routing paths or bad parameters
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <p className="text-xs font-mono bg-red-950/40 border border-red-900/30 text-red-400 px-4 py-2 rounded-xl">
          Error: Asset Node ID [{id}] is missing or unindexed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={12} /> Go Back
        </button>
      </div>
    );
  }

  // Calculate markdown adjustments dynamically based on API attributes
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-6 lg:p-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* TOP UTILITY ACTION INTERACTION PANEL */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white px-3.5 py-2 rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Catalog</span>
          </button>

          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-600 bg-slate-900/40 border border-slate-900 px-3 py-1 rounded-md">
            SKU-{product.id}00{Math.floor(product.rating * 10)}
          </span>
        </div>

        {/* MAIN DISPLAY HUB SPLIT MASTER PANEL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-slate-900/60 to-slate-950/40 border border-slate-900 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/40">

          {/* LEFT COMPARTMENT COLUMN: GALLERY VIEWPORTS (5 COLS) */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            {/* Primary Center Viewport Box */}
            <div className="w-full aspect-square bg-slate-950 rounded-2xl border border-slate-900/60 flex items-center justify-center p-6 relative overflow-hidden group">
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black text-[10px] tracking-tight px-2.5 py-0.5 rounded-md z-10">
                  SAVE {Math.round(product.discountPercentage)}%
                </span>
              )}

              <img
                src={activeImg || product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500 z-10"
              />

              <div className="absolute inset-0 border border-slate-900/10 rounded-full scale-90 animate-[spin_180s_linear_infinite]" />
            </div>

            {/* Segmented Image Row (Alternative Sub-images mapping if available) */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`w-20 h-20 shrink-0 bg-slate-950 rounded-xl border p-2 flex items-center justify-center transition-all ${activeImg === imgUrl
                        ? 'border-blue-500 bg-blue-950/10 shadow-lg shadow-blue-500/5'
                        : 'border-slate-900 hover:border-slate-800'
                      }`}
                  >
                    <img src={imgUrl} alt="Thumbnail preview" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COMPARTMENT COLUMN: DATA ENTRY METADATA FRAME (6 COLS) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">

            <div className="space-y-4">
              {/* Category Breadcrumbs Tracker Tag */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-md uppercase tracking-widest">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    by {product.brand}
                  </span>
                )}
              </div>

              {/* Product Title Headliner */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none">
                {product.title}
              </h1>

              {/* Ratings and Stock Analytics Line */}
              <div className="flex flex-wrap items-center gap-4 border-b border-slate-900/60 pb-4">
                <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-900 font-mono text-xs font-black text-amber-400">
                  <Star size={13} className="fill-amber-400" />
                  <span>{Number(product.rating).toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium">
                  {product.stock <= 5 ? (
                    <span className="text-red-400 font-bold bg-red-950/30 border border-red-900/20 px-2 py-0.5 rounded-md animate-pulse">
                      Critical Stock: Only {product.stock} remaining
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-semibold bg-emerald-950/30 border border-emerald-900/20 px-2 py-0.5 rounded-md">
                      In Stock Available ({product.stock})
                    </span>
                  )}
                </div>
              </div>

              {/* Core Paragraph Block */}
              <div className="space-y-1 text-left">
                <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Overview</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Trust Badge Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-[10px] font-bold text-slate-500 tracking-wide uppercase">
                <div className="bg-slate-900/40 border border-slate-900 p-2.5 rounded-xl flex flex-col gap-1">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span>Secure Node Checkout</span>
                </div>
                <div className="bg-slate-900/40 border border-slate-900 p-2.5 rounded-xl flex flex-col gap-1">
                  <Truck size={14} className="text-purple-500" />
                  <span>Global Dispatch</span>
                </div>
                <div className="bg-slate-900/40 border border-slate-900 p-2.5 rounded-xl flex flex-col gap-1">
                  <RefreshCw size={14} className="text-emerald-500" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>

            {/* CHECKOUT CONFIGURATION AND CONTROLLER BAR */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">

              {/* Financial Breakdown Node */}
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Valuation</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-mono text-3xl font-black text-white tracking-tight">
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="font-mono text-xs text-slate-600 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Operation CTA Button Stack */}
              <div className="flex items-center gap-2.5 sm:w-auto w-full">
                {/* Wishlist Icon Button */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-red-400 rounded-xl transition-all active:scale-95"
                  aria-label="Save product element"
                >
                  <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                </button>

                {/* Primary Add To Cart Submission Component */}
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-b from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-black text-white text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl shadow-xl shadow-blue-950/50 transition-all active:scale-[0.98]">
                  <ShoppingBag size={14} />
                  <span>Deploy to Cart</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProdDeatailPage;