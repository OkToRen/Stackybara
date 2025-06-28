import { useState, useEffect } from 'react';
import Logo from '@/assets/Logo.png';

export default function StackybaraLoadingPage({
  message = 'Loading Stackybara...',
  onComplete = null,
  autoComplete = true,
  duration = 4000,
}) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const features = [
    {
      icon: '🛡️',
      text: 'Securing blockchain transactions',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: '⚡',
      text: 'Optimizing smart contracts',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: '🌍',
      text: 'Connecting to decentralized network',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: '🛍️',
      text: 'Loading marketplace data',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: '🔗',
      text: 'Establishing peer connections',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: '💎',
      text: 'Verifying digital assets',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
  ];

  const brandName = 'Stackybara';

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          if (autoComplete && onComplete) {
            setTimeout(() => {}, 500);
          }
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [autoComplete, onComplete]);

  // Feature cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [features.length]);

  // Letter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLetter((prev) => (prev + 1) % (brandName.length + 1));
    }, 200);
    return () => clearInterval(interval);
  }, [brandName.length]);

  // Show content after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // CSS animations
  const animations = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes letterPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes featurePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    
    @keyframes iconSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes textPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes dotBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{animations}</style>
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-teal-50 flex items-center justify-center z-50 font-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-amber-500 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-[20%] w-20 h-20 bg-orange-400 rounded-full blur-3xl animate-float delay-4000"></div>
        </div>

        <div
          className={`text-center relative z-10 max-w-md mx-auto px-6 ${showContent ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-95 opacity-0'} transition-all duration-600 ease-out`}
        >
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-transparent border-t-emerald-500 border-r-amber-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-28 h-28 mx-auto border-2 border-emerald-500/30 rounded-full animate-pulse"></div>
            <div className="relative w-32 h-32 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce">
              <img
                src={Logo}
                alt="Stackybara"
                className="w-20 h-20 rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const next = (e.target as HTMLImageElement).nextSibling;
                  if (next && next instanceof HTMLElement) {
                    next.style.display = 'block';
                  }
                }}
              />
              <div className="hidden text-4xl text-emerald-500">🦫</div>
            </div>

            {/* Floating particles */}
            <div className="absolute top-[-16px] right-[-16px] w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-[-8px] left-[-8px] w-2 h-2 bg-amber-500 rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-1/2 right-[-24px] w-2 h-2 bg-orange-400 rounded-full animate-ping delay-1500"></div>
          </div>

          {/* Brand Name with Letter Animation */}
          <h1 className="text-5xl font-bold text-amber-900 mb-2 tracking-wider">
            {brandName.split('').map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all ease-out animate-letterPulse ${index <= currentLetter ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p className="text-amber-700 mb-8 text-lg font-medium">
            Decentralized Shopping Platform
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-2 bg-amber-500/20 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(currentProgress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-amber-700 mt-2">
              <span>{Math.round(currentProgress)}%</span>
              <span>Loading...</span>
            </div>
          </div>

          {/* Current Feature */}
          <div className="mb-8 min-h-[60px] flex items-center justify-center">
            <div
              className={`flex items-center gap-3 px-6 py-4 ${features[currentFeature]?.bgColor} rounded-xl transition-all duration-400 ease-out animate-featurePulse`}
            >
              <span
                className={`text-2xl animate-iconSpin ${features[currentFeature]?.color}`}
              >
                {features[currentFeature]?.icon}
              </span>
              <span
                className={`text-sm font-semibold ${features[currentFeature]?.color}`}
              >
                {features[currentFeature]?.text}
              </span>
            </div>
          </div>

          {/* Loading Message */}
          <p className="text-sm text-amber-700 mb-4 animate-textPulse">
            {message}
          </p>

          {/* Loading Dots */}
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-dotBounce"></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-dotBounce delay-200"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-dotBounce delay-400"></div>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-4 mt-6 ${currentProgress > 30 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-600 ease-out`}
          >
            <div className="text-center p-3 bg-white/70 rounded-lg backdrop-blur-sm">
              <span className="block text-xl font-bold text-emerald-500">
                50K+
              </span>
              <span className="text-[10px] text-amber-700 mt-1">Users</span>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg backdrop-blur-sm">
              <span className="block text-xl font-bold text-emerald-500">
                100K+
              </span>
              <span className="text-[10px] text-amber-700 mt-1">Orders</span>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg backdrop-blur-sm">
              <span className="block text-xl font-bold text-emerald-500">
                99.9%
              </span>
              <span className="text-[10px] text-amber-700 mt-1">Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
