import React, { useState, useEffect, memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProductContext } from '../utils/context/ProductApi';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../utils/firebase';

function EnhancedAuthPage() {
  const navigate = useNavigate();
  const { setAuth, setUser, userData, setUserData, setProfileUrl } = useContext(ProductContext);

  // Form & Component States
  const [authMode, setAuthMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Google Authentication Handler (Sign Up View Only)
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setAuthError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      setProfileUrl(user.displayName);
      setAuth('Sign Out');
      setUser(user.email?.includes('@') ? user.email.split('@')[0] : user.email);
      setUserData(user);
      
      navigate('/');
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setAuthError('Request already in progress.');
      } else {
        setAuthError(error.message || 'Failed to sign in with Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Sign Up Handler
  const handleSignUp = async () => {
    setIsLoading(true);
    setAuthError('');
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log('Signed up:', userCredential.user.email);
        navigate('/');
        setAuth('Sign Out');
        setUser(userCredential.user.email.search('@') > -1 ? userCredential.user.email.split('@')[0] : userCredential.user.email);
      })
      .catch((error) => {
        console.error('Sign up error:', error);
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Email/Password Sign In Handler
  const handleSignIn = async () => {
    setIsLoading(true);
    setAuthError('');
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log('Signed in:', userCredential.user.email);
        navigate('/');
        setAuth('Sign Out');
        setUser(userCredential.user.email.search('@') > -1 ? userCredential.user.email.split('@')[0] : userCredential.user.email);
      })
      .catch((error) => {
        console.error('Sign in error:', error);
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Form Submission Router
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (authMode === 'signin') {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30">
      
      {/* Main Asymmetric Split Panel Container */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 min-h-[600px] transition-all duration-300">
        
        {/* LEFT PANEL: Premium Immersive Brand / Value Prop */}
        <div className="hidden md:flex flex-col justify-between p-10 lg:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 relative overflow-hidden border-r border-slate-800/50">
          {/* Ambient Glow Elements */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />

          {/* Brand Identity Header */}
          <div className="flex items-center gap-3 select-none z-10">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <ShoppingBag size={18} className="animate-pulse" />
            </div>
            <span className="text-sm font-black tracking-widest text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              MHM.DEV.
            </span>
          </div>

          {/* Central Contextual Pitch */}
          <div className="space-y-6 my-auto z-10 max-w-sm">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-400 backdrop-blur-md">
              <Sparkles size={12} className="text-blue-400 animate-spin-slow" />
              <span>{authMode === 'signin' ? 'Welcome Back Friend' : 'Join Next Gen Retail'}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {authMode === 'signin'
                ? 'Access your premium curated workspace.'
                : 'Start collecting tomorrow’s design hardware.'}
            </h1>

            <ul className="space-y-4 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Next-day priority distribution routes globally.</span>
              </li>
              <li className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Encrypted single-tap checkout configuration.</span>
              </li>
            </ul>
          </div>

          {/* Legal Stamp */}
          <p className="text-[11px] text-slate-500 font-medium z-10 tracking-wide">
            © {new Date().getFullYear()} Mhm.Dev Inc. All rights protected under international encryption laws.
          </p>
        </div>

        {/* RIGHT PANEL: Authentication Form Operations */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 bg-slate-900/20 relative">
          
          {/* Header Block */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {authMode === 'signin' 
                ? 'Welcome back! Enter your credentials to access your dashboard.' 
                : 'Register seamlessly with your primary email or external account.'}
            </p>
          </div>

          {/* View Toggle Control Slider */}
          <div className="relative bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 mb-6 flex items-center shadow-inner">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md transition-transform duration-300 ease-out ${
                authMode === 'signup' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode('signin'); setAuthError(''); }}
              className={`w-1/2 py-2 text-xs font-bold tracking-wide rounded-lg z-10 transition-all duration-200 ${
                authMode === 'signin' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              } disabled:opacity-50`}
            >
              Sign In
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode('signup'); setAuthError(''); }}
              className={`w-1/2 py-2 text-xs font-bold tracking-wide rounded-lg z-10 transition-all duration-200 ${
                authMode === 'signup' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              } disabled:opacity-50`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback/Error Banner */}
          {authError && (
            <div className="mb-5 p-3.5 bg-red-950/30 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium leading-relaxed animate-fadeIn">
              {authError}
            </div>
          )}

          {/* Google SSO Button Alternative */}
          {authMode === 'signup' && (
            <>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wide transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.423 1.921 15.56 1 12.24 1 5.966 1 1 5.966 1 12.24s4.966 11.24 11.24 11.24c6.543 0 10.89-4.604 10.89-11.104 0-.747-.077-1.32-.176-1.891H12.24z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative my-6 flex items-center justify-center select-none">
                <div className="absolute inset-x-0 h-px bg-slate-800/50" />
                <span className="relative bg-slate-900 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">or</span>
              </div>
            </>
          )}

          {/* Interactive Form System */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Element: Identity Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative flex items-center group">
                <Mail className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all disabled:opacity-50 shadow-inner"
                />
              </div>
            </div>

            {/* Input Element: Security Credential Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {authMode === 'signin' && (
                  <a href="#forgot" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors font-medium">Forgot?</a>
                )}
              </div>
              <div className="relative flex items-center group">
                <Lock className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-2.5 pl-11 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all disabled:opacity-50 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Form Primary Action Trigger */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full !mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wide shadow-xl shadow-blue-950/50 hover:shadow-blue-900/60 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>
                {isLoading
                  ? 'Processing authentication...'
                  : authMode === 'signin' ? 'Sign In to Dashboard' : 'Generate New Account'}
              </span>
              {!isLoading && <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          {/* Form Footer View Toggle Helper */}
          <p className="text-center text-xs text-slate-500 mt-6 font-medium tracking-wide">
            {authMode === 'signin' ? "New to the platform? " : "Already registered before? "}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setAuthError(''); }}
              className="text-blue-400 font-bold hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              {authMode === 'signin' ? 'Sign Up Free' : 'Access Account'}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}

export default memo(EnhancedAuthPage);