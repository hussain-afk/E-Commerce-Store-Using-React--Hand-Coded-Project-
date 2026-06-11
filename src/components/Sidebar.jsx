import React from 'react';
import { 
  Home, Grid, Flame, Heart, History, User, 
  Settings, HelpCircle, LogOut, ArrowRight, X 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/context/ProductApi';

export default function Sidebar({ isOpen, onClose }) {
  
  // Custom navigation structure divided into semantic sections
  const discoverLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Browse Shop', href: '/shop', icon: Grid },
    { name: 'New Drops', href: '/new', icon: Flame, badge: 'Hot' },
    { name: 'My Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Order History', href: '/orders', icon: History },
  ];

  const accountLinks = [
    { name: 'Profile Settings', href: '/profile', icon: User },
    { name: 'Preferences', href: '/preferences', icon: Settings },
    { name: 'Help & Support', href: '/support', icon: HelpCircle },
  ];
  const { auth,setAuth,setUser } = useContext(ProductContext);

  // Helper check to determine which link route is currently active
  const currentPath = window.location.pathname;
  
  const navigate = useNavigate();
  const handleSignOut = () => {
    setAuth('Sign In');
    setUser(null);
    navigate('/');
  }


  return (
    <>
      {/* 1. MOBILE BACKDROP OVERLAY */}
      {/* Dimmed backdrop layer that closes the drawer when clicked outside */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. MAIN SIDEBAR DRAWER PANEL */}
      {/* // Inside your Sidebar.jsx component file: */}
<aside className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out
  lg:relative lg:translate-x-0 lg:h-full
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
        
        {/* TOP BLOCK: Mobile header section wrapper */}
        <div>
          

          {/* MIDDLE BLOCK: Scrollable links layout lists */}
          <div className="p-4 space-y-7 overflow-y-auto max-h-[calc(100vh-140px)]">
            
            {/* SECTION A: Discover Core Actions */}
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Discover</p>
              <nav className="space-y-1">
                {discoverLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'} />
                        <span>{link.name}</span>
                      </div>
                      
                      {/* Optional text asset highlight label item status */}
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md font-black bg-blue-500/20 text-sky-400 uppercase tracking-wide">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* SECTION B: User Configurations Area */}
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Account Management</p>
              <nav className="space-y-1">
                {accountLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'} />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

          </div>
        </div>

        {/* 3. BOTTOM FOOTER FOOTPRINT CARD BANNER */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/20">
          
          {/* Subtle Premium User Promo Badge Card */}
          {/* <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-3 mb-3 relative overflow-hidden group hidden lg:block">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-blue-600/10 rounded-full blur-xl group-hover:bg-blue-600/20 transition-all" />
            <p className="text-[11px] font-bold text-white mb-1 flex items-center gap-1">
              Nexus Elite Status
            </p>
            <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">Unlock access to free tracking & return benefits.</p>
            <a href="/upgrade" className="text-[10px] text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1 transition-colors">
              Learn More <ArrowRight size={10} />
            </a>
          </div> */}

          {/* Core App Session Break Trigger */}
          <NavLink to ="/auth">
            <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-950/20 rounded-xl transition-all"
          >
            <LogOut size={16} />
            <span>{auth}</span>
          </button>
          </NavLink>

        </div>

      </aside>
    </>
  );
}