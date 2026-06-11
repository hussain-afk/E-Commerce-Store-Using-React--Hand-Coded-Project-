import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../utils/context/ProductApi';
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
// Added GoogleAuthProvider and signInWithPopup from your firebase package
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from '../utils/firebase';

export default function EnhancedAuthPage() {
  const [authMode, setAuthMode] = useState('signin');
  // other states related to form handling and authentication feedback
  const { setAuth, setUser } = useContext(ProductContext);


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Google Authentication Handler (Only for Sign Up)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User successfully signed up/in via the redirect route
          console.log('Google Redirect Auth Successful:', result.user);
          navigate('/');
          setAuth('Sign Out'); // Update auth state to reflect signed-in status
          setUser(result.user.email.search('@') > -1 ? result.user.email.split('@')[0] : result.user.email); // Update user state with the authenticated user
        }
      })
      .catch((error) => {
        console.error('Google Redirect Error:', error);
        setAuthError(error.message || 'Failed to finish Google authentication.');
      });
  }, [navigate]);

  // 3. Rewrite the Google button handler to fire a redirect instead of a popup
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setAuthError('');
    const provider = new GoogleAuthProvider();

    try {
      // Bypasses the COOP security block entirely
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google Initialization Error:', error);
      setAuthError(error.message || 'Failed to initialize Google login.');
      setIsLoading(false);
    }
  };

  // Firebase Authentication Handlers
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
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950">

      {/* Container holding the asymmetric Split Panel Grid */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 min-h-[580px]">

        {/* LEFT COLUMN: Premium Immersive Brand / Marketing Panel */}
        <div className="hidden md:flex flex-col justify-between p-8 lg:p-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden border-r border-slate-800">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />

          {/* Top Brand Indicator */}
          <div className="flex items-center gap-2 select-none z-10">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
              <ShoppingBag size={18} />
            </div>
            <span className="text-sm font-black tracking-wider text-white">NEXUS.</span>
          </div>

          {/* Dynamic Value Propositions */}
          <div className="space-y-6 my-auto z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-400">
              <Sparkles size={12} />
              <span>{authMode === 'signin' ? 'Welcome Back Friend' : 'Join Next Gen Retail'}</span>
            </div>

            <h1 className="text-3xl font-black text-white leading-tight tracking-tight">
              {authMode === 'signin'
                ? 'Access your premium curated workspace.'
                : 'Start collecting tomorrow’s design hardware.'}
            </h1>

            <ul className="space-y-3.5 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Next-day priority distribution routes globally.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Encrypted single-tap checkout configuration.</span>
              </li>
            </ul>
          </div>

          {/* Bottom Stamp */}
          <p className="text-[11px] text-slate-500 font-medium z-10">
            © {new Date().getFullYear()} Nexus Inc. All rights protected under international encryption laws.
          </p>
        </div>

        {/* RIGHT COLUMN: Highly Focused Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-slate-900 relative">

          {/* Form Content Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-xs text-slate-400 mt-1.5">
              {authMode === 'signin' ? 'Welcome back! Enter your login details.' : 'Register seamlessly with your primary email or external account.'}
            </p>
          </div>

          {/* SWITCH CONTROLLER ACTION SLIDER */}
          <div className="relative bg-slate-950 p-1 rounded-xl border border-slate-850 mb-6 flex">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-blue-600 rounded-lg transition-transform duration-300 ease-out ${authMode === 'signup' ? 'translate-x-full' : 'translate-x-0'
                }`}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode('signin'); setAuthError(''); }}
              className={`w-1/2 py-2 text-xs font-bold tracking-wide rounded-lg z-10 transition-colors ${authMode === 'signin' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                } disabled:opacity-50`}
            >
              Sign In
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode('signup'); setAuthError(''); }}
              className={`w-1/2 py-2 text-xs font-bold tracking-wide rounded-lg z-10 transition-colors ${authMode === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                } disabled:opacity-50`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Feed Display */}
          {authError && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-400 font-medium leading-relaxed">
              {authError}
            </div>
          )}

          {/* GOOGLE SIGN UP ACTION BUTTON (Conditional for Sign Up View Only) */}
          {authMode === 'signup' && (
            <>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wide transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.423 1.921 15.56 1 12.24 1 5.966 1 1 5.966 1 12.24s4.966 11.24 11.24 11.24c6.543 0 10.89-4.604 10.89-11.104 0-.747-.077-1.32-.176-1.891H12.24z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative my-5 flex items-center justify-center select-none">
                <div className="absolute inset-x-0 h-px bg-slate-800/80" />
                <span className="relative bg-slate-900 px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">or</span>
              </div>
            </>
          )}

          {/* INPUT FORM BLOCK */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Input 1: Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative flex items-center group">
                <Mail className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {authMode === 'signin' && (
                  <a href="#forgot" className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline font-medium">Forgot?</a>
                )}
              </div>
              <div className="relative flex items-center group">
                <Lock className="absolute left-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl py-2.5 pl-11 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Form CTA Trigger Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full !mt-6 flex items-center justify-center gap-2 bg-gradient-to-b from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wide shadow-xl shadow-blue-900/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>
                {isLoading
                  ? 'Processing authentication...'
                  : authMode === 'signin' ? 'Sign In to Dashboard' : 'Generate New Account'}
              </span>
              {!isLoading && <ArrowRight size={14} />}
            </button>

          </form>

          {/* Secondary Alternative Navigation Helper Text */}
          <p className="text-center text-xs text-slate-500 mt-6 font-medium">
            {authMode === 'signin' ? "New to the platform? " : "Already registered before? "}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setAuthError(''); }}
              className="text-blue-400 font-bold hover:text-blue-300 hover:underline disabled:opacity-50"
            >
              {authMode === 'signin' ? 'Sign Up Free' : 'Access Account'}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}