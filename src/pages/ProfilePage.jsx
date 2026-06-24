import React, { memo, useContext } from 'react'
import { ProductContext } from '../utils/context/ProductApi'
import { replace, useNavigate, useParams } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const { userData , setAuth, setUser, profileUrl, setProfileUrl } = useContext(ProductContext)

  const handleSignOut = () => {
    setAuth('Sign In');
    setUser(null);
    setProfileUrl(null);
    navigate('/');
  }
  // const { displayName } = useParams();

  // 💎 BEAST MODE SKELETON LOADING STATE
  if (!userData) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center p-5 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-[420px] bg-slate-900/40 backdrop-blur-xl border border-white/[0.03] rounded-3xl p-8 flex flex-col items-center animate-pulse">
          <div className="w-[120px] h-[120px] rounded-full bg-slate-800 border-4 border-slate-900 shadow-inner mb-5" />
          <div className="h-6 w-48 bg-slate-800 rounded-lg mb-3" />
          <div className="h-4 w-32 bg-slate-800 rounded-md mb-8" />
          <div className="w-full space-y-4 mb-8">
            <div className="h-12 bg-slate-800/60 rounded-xl w-full" />
            <div className="h-12 bg-slate-800/60 rounded-xl w-full" />
          </div>
          <div className="h-4 w-40 bg-slate-800/40 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full  flex justify-center items-center font-sans p-5 relative overflow-hidden select-none">
      
      {/* 🔮 Ambient Cyberpunk Backdrops */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* 🃏 Main Profile Card */}
      <div className="w-full max-w-[420px] bg-slate-900/60 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group">
        
        {/* Dynamic Abstract Header */}
        <div className="h-[150px] bg-gradient-to-tr from-[#0f1123] via-[#1a1333] to-[#25143a] flex justify-end p-5 relative overflow-hidden border-b border-white/[0.02]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <span className="self-start relative z-10 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black px-3.5 py-1.5 rounded-full tracking-widest shadow-sm uppercase backdrop-blur-sm">
            ⚡ PREMIUM MEMBER
          </span>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-8 flex flex-col items-center relative">
          
          {/* Avatar Area */}
          <div className="relative -mt-[75px] mb-4 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            {userData.photoURL ? (
              <img 
                src={userData.photoURL} 
                alt="Customer Profile" 
                className="w-[125px] h-[125px] rounded-full border-[6px] border-[#0e1320] shadow-2xl object-cover relative z-10" 
              />
            ) : (
              <div className="w-[125px] h-[125px] rounded-full border-[6px] border-[#0e1320] bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex justify-center items-center text-4xl font-extrabold shadow-2xl relative z-10">
                {userData.displayName ? userData.displayName[0].toUpperCase() : 'C'}
              </div>
            )}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-[3px] border-[#0e1320] rounded-full z-20 shadow-md animate-pulse" />
          </div>

          {/* Customer Metadata */}
          <h1 className="text-2xl font-black text-white mb-1.5 text-center tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
            {userData.displayName || 'Valued Customer'}
          </h1>
          <p className="text-[11px] text-slate-500 font-mono tracking-widest mb-6 bg-slate-950/40 px-3 py-1 rounded-md border border-white/[0.02]">
            UID: {userData.uid ? userData.uid.substring(0, 10).toUpperCase() : 'N/A'}
          </p>

          {/* Quick Shopping Stats Row */}
          <div className="flex w-full gap-3 mb-6">
            <div className="flex-1 bg-gradient-to-b from-slate-950/60 to-slate-950/20 border border-white/[0.03] rounded-2xl p-3.5 flex flex-col items-center backdrop-blur-md">
              <span className="text-base font-extrabold text-emerald-400 tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Active
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Cart Status</span>
            </div>
            <div className="flex-1 bg-gradient-to-b from-slate-950/60 to-slate-950/20 border border-white/[0.03] rounded-2xl p-3.5 flex flex-col items-center backdrop-blur-md">
              <span className="text-xl font-black text-slate-100 font-mono">0</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Orders Placed</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-5" />

          {/* Account Details Section */}
          <div className="w-full mb-6 space-y-1">
            <div className="flex justify-between items-center py-3 px-1 rounded-xl hover:bg-white/[0.02] transition-colors duration-200">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Email Address</span>
              <span className="text-sm font-medium text-slate-200 truncate max-w-[200px]">{userData.email || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 px-1 rounded-xl hover:bg-white/[0.02] transition-colors duration-200">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Tier Rank</span>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-wider uppercase flex items-center gap-1">
                🏆 Gold VIP Buyer
              </span>
            </div>
          </div>

          {/* E-Commerce Actions Grid */}
          <div className="w-full flex gap-3.5 mt-2">
            <button 
              className="flex-[2] py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl text-xs font-black tracking-widest uppercase cursor-pointer transition-all duration-300 active:scale-[0.98] shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.3)]"
              onClick={() => alert('Redirecting to your orders panel...')}
            >
              My Orders
            </button>
            
            <button 
              className="flex-[1] py-4 bg-slate-950/40 border border-slate-800 text-slate-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 rounded-2xl text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 active:scale-[0.98]"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default memo(ProfilePage)