import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import Languages from '../component/languages';
import { useLanguage } from '../context/LanguageContext';

const SignUp = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-20">
        <Languages 
          currentLanguage={currentLanguage} 
          onLanguageChange={changeLanguage} 
        />
      </div>
      <SignUpPage />
    </div>
  );
};

function SignUpPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!agreeTerms) {
      alert('Please agree to the terms of service and privacy policy');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate account creation process
    setTimeout(() => {
      console.log('Account creation attempted with:', formData);
      setIsLoading(false);
      // Add your actual registration logic here
    }, 2000);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    }
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { strength: 100, text: 'Strong', color: 'bg-green-500' };
    }
    return { strength: 60, text: 'Good', color: 'bg-blue-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen h-screen w-full  bg-blue-900  flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden fixed inset-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 sm:w-2 sm:h-2 bg-green-400/20 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main signup container */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          {/* Logo and branding */}
          <div className="text-left mb-6 sm:mb-8"> 
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-1 sm:mb-2">
              {t('createAccount') || 'Create an Account'}
            </h2> 
          </div>

          {/* Signup form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Full Name input */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="fullName" className="text-xs sm:text-sm font-medium text-white block text-left">
                {t('fullName') || 'Full Name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3  bg-white/10 border border-white/20 rounded-lg sm:rounded-xl  focus:ring-purple-500  text-white placeholder-gray-400  focus:outline-none focus:ring-2   focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  placeholder={t('enterFullName') || "John Doe"} 
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="email" className="text-xs sm:text-sm font-medium text-white block text-left">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3  bg-white/10 border border-white/20 rounded-lg sm:rounded-xl  text-white placeholder-gray-400   focus:outline-none focus:ring-2  focus:ring-purple-500   focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  placeholder={t('enterEmail') || "hello@example.com"}
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="password" className="text-xs sm:text-sm font-medium text-white block text-left">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3  bg-white/10 border border-white/20 rounded-lg sm:rounded-xl  focus:ring-purple-500  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  placeholder={t('enterPassword')}
                  required
                />
              </div>
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{t('passwordStrength') || 'Password strength'}</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength >= 75 ? 'text-green-400' :
                      passwordStrength.strength >= 50 ? 'text-yellow-400' :
                      'text-gray'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('passwordRequirement') || 'Password must be at least 8 characters long'}
                  </p>
                </div>
              )}
            </div>

            {/* Terms and conditions */}
             <label className="flex items-center space-x-2 sm:space-x-3">
  <input
    type="checkbox"
    checked={agreeTerms}
    onChange={e => setAgreeTerms(e.target.checked)}
    className="w-4 h-4 sm:w-5 sm:h-5 bg-white/10 border-white rounded focus:ring-2"
  />
     <span className="text-xs sm:text-sm text-gray-400 leading-relaxed">
     {t('agreeToTerms') || 'I agree to the'}{' '}
     <a href="#" className="text-white transition-colors duration-200">
       {t('termsOfService') || 'terms of service'}
     </a>
     {' '}{t('and') || 'and'}{' '}
     <a href="#" className="text-white transition-colors duration-200">
       {t('privacyPolicy') || 'privacy policy'}
     </a>
   </span>
</label>

            {/* Create Account button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !agreeTerms}
              className="w-full   bg-blue-600   text-white font-semibold  disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2   focus:ring-offset-2 focus:ring-offset-transparent relative overflow-hidden text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('creatingAccount') || 'Creating Account...'}</span>
                </div>
              ) : (
                <span>{t('createAccount') || 'Create Account'}</span>
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              {t('alreadyHaveAccount') || 'Already have an account?'}{' '}
              <a href="/login" className="font-medium text-white transition-colors duration-200">
                {t('signIn') || 'Sign in'}
              </a>
            </p>
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

export default SignUp;