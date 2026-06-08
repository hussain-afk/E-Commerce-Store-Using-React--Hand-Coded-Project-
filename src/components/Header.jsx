import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart, Bell, Flame, ArrowRight, ShieldCheck, Zap, ChevronDown } from 'lucide-react';

export default function EnhancedToggleHeader({ onMenuToggle, cartCount = 3 }) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  // New state to manage showing/hiding links on mobile screens
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                NX
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
              {/* <button className={`hover:text-white transition-colors flex items-center gap-1 ${isMegaMenuOpen ? 'text-white' : ''}`}>
                Categories
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button> */}

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

          {/* ADVANCED INTEGRATED DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md relative mx-2">
            <div className="relative flex items-center w-full rounded-xl border border-slate-800 bg-slate-950 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all duration-200 group">
              <Search className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="w-full bg-transparent py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none rounded-xl"
              />
            </div>
          </div>

          {/* DYNAMIC MOBILE SEARCH FULL DRAWER */}
          {isMobileSearchOpen && (
            <div className="absolute inset-x-4 md:hidden flex items-center gap-2 bg-slate-900/95 backdrop-blur-md h-full animate-in fade-in zoom-in-95 duration-150">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 text-slate-500 top-1/2 -translate-y-1/2" size={16} />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search products..." 
                  className="w-full bg-transparent border border-slate-800 bg-slate-950 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* UTILITY CORE ACTIONS & QUICK ACCOUNTS */}
          <div className={`items-center gap-1 sm:gap-2.5 ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            
            <button 
              onClick={() => {
                setIsMobileSearchOpen(true);
                setIsMobileMenuOpen(false); // close links panel if searching
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

            <button className="p-1 text-slate-400 hover:text-white rounded-full flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-950 pr-3 pl-1 h-9 transition-all" aria-label="User profile config">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                A
              </div>
              <span className="text-xs font-semibold text-slate-300 hidden xl:block">Alex M.</span>
            </button>

            <div className="h-5 w-px bg-slate-800 mx-0.5 hidden sm:block" />

            <button 
              className="flex items-center gap-2 bg-gradient-to-b from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 h-9 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={15} className="transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline font-medium">Cart</span>
              <span className="bg-slate-950/40 text-white text-[10px] px-1.5 py-0.5 rounded-md font-black min-w-[18px]">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. MOBILE MENU PANEL CONTAINER */}
      {/* Toggles open smoothly via Tailwind CSS Max-Height transitions */}
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