'use client';

import { useEffect, useState } from 'react';

const LoadingIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Hide loading indicator after page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Small delay for smooth transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) return null;

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <div 
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" 
          style={{animationDirection: 'reverse', animationDuration: '1.5s'}}
        ></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
