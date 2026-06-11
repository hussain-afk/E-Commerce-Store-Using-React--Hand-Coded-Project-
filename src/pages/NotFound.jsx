import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Background Matrix Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* Futuristic Blur Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-8 px-4">
        
        {/* Animated Error Code Graphic */}
        <div className="relative inline-block">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl animate-pulse" />
          <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h1 className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 font-mono">
              404
            </h1>
            <div className="absolute -top-3 -right-3 p-1.5 bg-blue-950 border border-blue-800 text-blue-400 rounded-lg shadow-lg">
              <HelpCircle size={16} />
            </div>
          </div>
        </div>

        {/* Messaging Block */}
        <div className="space-y-2.5">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">
            Route Node Unresolved
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            The requested asset endpoint does not exist or has been unindexed from our structural core. 
          </p>
        </div>

        {/* Tactical Action Redirect Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          
          {/* Main Action: Go Home */}
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-black text-white text-xs tracking-wider uppercase py-3.5 rounded-xl shadow-lg shadow-blue-950/50 transition-all active:scale-[0.98]"
          >
            <Home size={14} />
            <span>Return to Dashboard</span>
          </button>

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-xs font-bold text-slate-400 hover:text-white py-3 rounded-xl transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Go Back</span>
            </button>

            <button 
              onClick={() => navigate('/shop')}
              className="flex items-center justify-center gap-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-xs font-bold text-slate-400 hover:text-white py-3 rounded-xl transition-colors"
            >
              <ShoppingBag size={13} />
              <span>Shop Gear</span>
            </button>
          </div>

        </div>

        {/* Micro-System Footer Tag */}
        <div className="pt-4">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-600 bg-slate-900/30 border border-slate-900/60 px-3 py-1 rounded-md uppercase">
            Error Stack: SYS_MUTATION_FAILED
          </span>
        </div>

      </div>
    </div>
  );
}