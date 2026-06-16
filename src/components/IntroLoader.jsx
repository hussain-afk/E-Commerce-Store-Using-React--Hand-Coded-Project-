// import React, { useEffect, useState } from 'react';

// export default function IntroLoader({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     // 1. Simulate tactical system registry load
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         // Varied increments for a realistic pipeline feel
//         const increment = Math.floor(Math.random() * 15) + 5;
//         return Math.min(prev + increment, 100);
//       });
//     }, 120);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (progress === 100) {
//       // 2. Trigger exit animation slightly after reaching 100%
//       const exitTimeout = setTimeout(() => {
//         setIsExiting(true);
//       }, 400);

//       // 3. Completely unmount from parent layout
//       const unmountTimeout = setTimeout(() => {
//         onComplete?.();
//       }, 1000); // Matches the transition duration-600 + delay below

//       return () => {
//         clearTimeout(exitTimeout);
//         clearTimeout(unmountTimeout);
//       };
//     }
//   }, [progress, onComplete]);

//   return (
//     <div 
//       className={`fixed inset-0 z-[99999] bg-slate-950 text-white flex flex-col items-center justify-center font-sans select-none transition-all duration-700 ease-in-out ${
//         isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
//       }`}
//     >
//       {/* Background Matrix Grid Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
      
//       {/* Radial Gradient Ambient Core Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

//       {/* Main Content Assembly */}
//       <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        
//         {/* Futuristic Brand Logo & Title Node */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-center gap-2 mb-1">
//             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
//             <span className="text-[10px] font-mono tracking-[0.3em] font-black text-slate-500 uppercase">
//               Loinding...
//             </span>
//           </div>
          
//           <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase">
//             MHM<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">.DEV</span>
//           </h1>
//         </div>

//         {/* Tactical Progress Bar Framework */}
//         <div className="w-56 space-y-2">
//           {/* Outer Track */}
//           <div className="h-[3px] w-full bg-slate-900 border border-slate-800/40 rounded-full overflow-hidden relative">
//             {/* Moving Indicator Track Line */}
//             <div 
//               className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           {/* Status Meta Data Readout */}
//           <div className="flex items-center justify-between font-mono text-[9px] font-bold text-slate-500 tracking-wide">
//             <span>FETCH_CORE_ASSETS</span>
//             <span className="text-slate-300 w-8 text-right">{progress}%</span>
//           </div>
//         </div>

//       </div>

//       {/* Micro Status Footer */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
//         <span className="text-[8px] font-mono font-bold tracking-widest text-slate-700 uppercase bg-slate-900/20 border border-slate-900/60 px-3 py-1 rounded-md">
//           SECURE STACK V4.12 // ACTIVE
//         </span>
//       </div>
//     </div>
//   );
// }