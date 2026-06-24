import React, { useState } from 'react';
import { ShoppingBag, Send, ShieldCheck, Truck, RefreshCw, HelpCircle, ArrowUpRight } from 'lucide-react';

export default React.memo(function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed newsletter entry:', email);
    setEmail('');
  };

  const footerLinks = {
    collections: [
      { name: 'Heavy Jackets', href: '/shop/outerwear' },
      { name: 'Tech Hoodies', href: '/shop/hoodies' },
      { name: 'Oversized Tees', href: '/shop/tees' },
      { name: 'Modular Trainers', href: '/shop/footwear' },
    ],
    support: [
      { name: 'Order Tracking', href: '/orders' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Sizing Guides', href: '/sizing' },
      { name: 'Help Center', href: '/support' },
    ],
    company: [
      { name: 'About Nexus', href: '/about' },
      { name: 'Sustainability', href: '/eco' },
      { name: 'Careers', href: '/careers' },
      { name: 'Retail Locations', href: '/stores' },
    ]
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      
      {/* 1. TOP VALUE PROPOSITION BAR */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900/60 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-slate-900 rounded-xl text-blue-500 border border-slate-800/50">
            <Truck size={16} />
          </div>
          <div>
            <h4 className="font-bold text-slate-200">Global Shipping</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Priority express channels</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-slate-900 rounded-xl text-indigo-500 border border-slate-800/50">
            <RefreshCw size={16} />
          </div>
          <div>
            <h4 className="font-bold text-slate-200">30-Day Returns</h4>
            <p className="text-[11px] text-slate-500 mt-0.5"> Hassle-free drop offs</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-slate-900 rounded-xl text-emerald-500 border border-slate-800/50">
            <ShieldCheck size={16} />
          </div>
          <div>
            <h4 className="font-bold text-slate-200">Secure Vault</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Fully encrypted checkout</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-slate-900 rounded-xl text-amber-500 border border-slate-800/50">
            <HelpCircle size={16} />
          </div>
          <div>
            <h4 className="font-bold text-slate-200">24/7 Concierge</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Live developer assistance</p>
          </div>
        </div>
      </div>

      {/* 2. CORE DIRECTORIES GRAPH GRID */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Brand Information & Newsletter Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 select-none">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 rounded-xl text-xs font-black shadow-md shadow-blue-500/10">
              MHM.DEV
            </div>
            {/* <span className="text-base font-black tracking-wider text-white">NEXUS.</span> */}
          </div>
          
          <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
            Curating high-performance design hardware and technical garments engineered for modern distribution pipelines.
          </p>

          {/* Integrated Newsletter Form Capture */}
          <div className="max-w-sm">
            <p className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-2.5">Subscribe to the loop</p>
            <form onSubmit={handleSubscribe} className="relative flex items-center group">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your system email..." 
                className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl py-2.5 pl-4 pr-12 text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95"
                aria-label="Submit newsletter"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Dynamic Nav Columns */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Collections</h5>
            <ul className="space-y-2.5">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors flex items-center gap-0.5 group">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Support Channels</h5>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h5 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">System</h5>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* 3. BASELINE TERMS & COMPLIANCE LINE */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-medium">
          
          {/* Copyright block */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Mhm.Dev Inc.</span>
            <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Infrastructure</a>
            <a href="/terms" className="hover:text-slate-400 transition-colors">Terms of Operations</a>
          </div>

          {/* Localized Dropdown Stubs (Visual layout helpers) */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300 transition-colors">
              <span>United States (USD $)</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300 transition-colors">
              <span>English (EN)</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
});