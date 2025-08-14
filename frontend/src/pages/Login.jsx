import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Video, MessageCircle, Sparkles } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempted with:', formData);
      setIsLoading(false);
      // Add your actual login logic here
    }, 2000);
  };

  return (
    <div className="w-full  bg-blue-900  flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <div className="flex items-center space-x-1">
                <Video className="w-6 h-6 text-white" />
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Connect</span>
            </h1>
            <p className="text-gray-300 text-sm">Connect, Chat, Stream Together</p>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            {/* User ID input */}
            <div className="space-y-2">
              <label htmlFor="userId" className="text-sm font-medium text-gray-200 block text-left">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your user ID"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200 block text-left">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                /> 
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4  bg-white/10 border-white/20 rounded focus:ring-2"
                />
                <span className="ml-2 text-sm text-white">Remember me</span>
              </label>
              <a href="#" className="text-sm text-white transition-colors duration-200">
                {t('forgotPassword') || 'Forgot password?'}
              </a>
            </div>

            {/* Login button */}
            <button
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full bg-blue-600   text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('signingIn') || 'Signing in...'}</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>{t('login')}</span>
                  <Sparkles className="w-4 h-4" />
                </span>
              )}
              
              {/* Button shine effect */}
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative"> 
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white">{t('orContinueWith') || 'Or continue with'}</span>
              </div>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              {t('dontHaveAccount') || "Don't have an account?"}{' '}
              <a href="/signup" className="font-medium text-white transition-colors duration-200">
                {t('createAccount') || 'Create a New Account'}
              </a>
            </p>
          </div>
        </div>

        {/* Features showcase */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">HD Streaming</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <MessageCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">Live Chat</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Sparkles className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">Premium Quality</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}