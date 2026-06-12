import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart, Bell, Flame, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../utils/context/ProductApi';

export default function EnhancedToggleHeader({ onMenuToggle, cartCount = 3 }) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- SEARCH STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { products, user, cart } = useContext(ProductContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // --- HANDLE SEARCH FILTERING ---
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = products?.filter(product =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    setSearchResults(filtered.slice(0, 5));
  }, [searchQuery, products]);

  // --- CLOSE DROPDOWN ON CLICK OUTSIDE ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (productId) => {
    setSearchQuery('');
    setShowDropdown(false);
    setIsMobileSearchOpen(false);
    navigate(`/products/${productId}`);
  };

  const mobileLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'New Drops', href: '/new' },
    { name: 'The Vault', href: '/vault' },
    { name: 'Clearance Sale', href: '/sale', highlight: true }
  ];

  return (
    <div className="w-full sticky top-0 z-50">
      
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 text-white text-xs py-2 px-4 flex items-center justify-center gap-2 font-medium tracking-wide border-b border-blue-600/20 shadow-inner">
        <Flame size={14} className="text-amber-400 animate-bounce" />
        <span>Summer Drop Is Live! Use code <span className="font-bold underline tracking-widest text-sky-200">NAVY26</span> for 15% off</span>
        <ArrowRight size={12} className="hidden sm:inline opacity-80" />
      </div>

      {/* 2. MAIN GLASSMORPHISM NAV BAR */}
      <header className="h-16 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
        <div className="h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* MOBILE NAV TOGGLE & BRAND LOGO */}
          <div className={`items-center gap-2 ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden rounded-xl hover:bg-slate-800/40 transition-all focus:outline-none"
              aria-label="Toggle Navigation links"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} className="text-sky-400" /> : <Menu size={22} />}
            </button>
            
            <a href="/" className="text-xl font-black tracking-tight text-white flex items-center gap-2 group select-none">
              <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-md shadow-blue-500/20 tracking-wider">
                MHM.DEV
              </span>
              <span className="hidden xs:block font-sans tracking-wide">
                NEXUS<span className="text-blue-500 font-extrabold">.</span>
              </span>
            </a>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-400">
            <div 
              className="relative py-5"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              {/* MEGA MENU DROP CONTAINER */}
              {isMegaMenuOpen && (
                <div className="absolute top-[60px] -left-12 w-[540px] bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl shadow-black/80 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Zap size={12}/> Apparel Hardware
                    </h4>
                    <div className="space-y-2 text-slate-300">
                      <a href="/shop/outerwear" className="block text-sm hover:text-white transition-all">Heavy Jackets</a>
                      <a href="/shop/hoodies" className="block text-sm hover:text-white transition-all">Tech Hoodies</a>
                      <a href="/shop/tees" className="block text-sm hover:text-white transition-all">Oversized Tees</a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ShieldCheck size={12}/> Curated Gear
                    </h4>
                    <div className="space-y-2 text-slate-300">
                      <a href="/shop/bags" className="block text-sm hover:text-white transition-all">Waterproof Bags</a>
                      <a href="/shop/footwear" className="block text-sm hover:text-white transition-all">Modular Trainers</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/new" className="hover:text-white transition-colors">New Drops</a>
            <a href="/vault" className="hover:text-white transition-colors">The Vault</a>
            <a href="/sale" className="text-red-400 hover:text-red-300 font-semibold transition-colors">Clearance</a>
          </nav>

          {/* --- INTERACTIVE DESKTOP SEARCH --- */}
          <div ref={dropdownRef} className="hidden md:flex flex-1 max-w-sm lg:max-w-md relative mx-2">
            <div className="relative flex items-center w-full rounded-xl border border-slate-800 bg-slate-950 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all duration-200 group">
              <Search className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search premium products..." 
                className="w-full bg-transparent py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none rounded-xl"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 text-slate-500 hover:text-slate-300">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* DESKTOP SEARCH DROPDOWN RESULTS */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-950/95 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md z-50 max-h-80 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-800/60 cursor-pointer transition-colors border-b border-slate-900 last:border-0"
                  >
                    {product.image && (
                      <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-lg bg-slate-900" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{product.title}</p>
                      <p className="text-[10px] text-blue-400 font-medium uppercase mt-0.5">{product.category}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-300">${product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- INTERACTIVE MOBILE SEARCH FULL DRAWER --- */}
          {isMobileSearchOpen && (
            <div className="absolute inset-x-4 md:hidden flex items-center gap-2 bg-slate-900/95 backdrop-blur-md h-full animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 text-slate-500 top-1/2 -translate-y-1/2" size={16} />
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="w-full bg-transparent border border-slate-800 bg-slate-950 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X size={16} />
              </button>

              {/* MOBILE SEARCH RESULTS DROPDOWN */}
              {searchResults.length > 0 && (
                <div className="absolute top-[60px] left-0 w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleResultClick(product.id)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-800 cursor-pointer border-b border-slate-900 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">{product.title}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400">${product.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* UTILITY CORE ACTIONS & QUICK ACCOUNTS */}
          <div className={`items-center gap-1 sm:gap-2.5 ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            
            <button 
              onClick={() => {
                setIsMobileSearchOpen(true);
                setIsMobileMenuOpen(false); 
              }}
              className="p-2 text-slate-400 hover:text-white rounded-xl md:hidden hover:bg-slate-800/40" 
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button className="p-2 text-slate-400 hover:text-white rounded-xl relative hidden xs:block hover:bg-slate-800/40 transition-colors" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </button>

            <button className="p-2 text-slate-400 hover:text-white rounded-xl hidden sm:block hover:bg-slate-800/40 transition-colors" aria-label="Favorites">
              <Heart size={18} />
            </button>

            <NavLink to='/auth'>
              <button className="p-1 text-slate-400 hover:text-white rounded-full flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950 pr-3 pl-1 h-9 transition-all" aria-label="User profile config">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                  {user ? user.charAt(0).toUpperCase() : 'A'}
                </div>
                {/* CHANGED HERE: Removed hidden xl:block and added max-w constraint + truncate */}
                <span className="text-xs font-semibold text-slate-300 block max-w-[70px] truncate select-none">
                  {user}
                </span>
              </button>
            </NavLink>

            <div className="h-5 w-px bg-slate-800 mx-0.5 hidden sm:block" />

            <button 
              className="flex items-center gap-2 bg-gradient-to-b from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 h-9 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={15} className="transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline font-medium">Cart</span>
              <span className="bg-slate-950/40 text-white text-[10px] px-1.5 py-0.5 rounded-md font-black min-w-[18px]">
                {cart}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. MOBILE MENU PANEL CONTAINER */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900 border-slate-800 ${
          isMobileMenuOpen ? 'max-h-80 border-b px-4 py-3 shadow-2xl' : 'max-h-0'
        }`}
      >
        <div className="space-y-1">
          {mobileLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                link.highlight
                  ? 'bg-red-950/20 text-red-400 hover:bg-red-950/40'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between px-4 text-xs text-slate-400">
            <a href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white">
              <Heart size={14} /> Saved Items
            </a>
            <a href="/support" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">
              Customer Support
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}