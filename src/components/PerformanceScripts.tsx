'use client';

import { useEffect } from 'react';

const PerformanceScripts = () => {
  useEffect(() => {
    // Performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
          }
        }, 0);
      });
    }

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Intersection Observer polyfill for older browsers
    if (!('IntersectionObserver' in window)) {
      console.log('IntersectionObserver not supported, loading polyfill...');
      
      // Load polyfill from CDN
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
      script.async = true;
      script.onload = () => {
        console.log('IntersectionObserver polyfill loaded successfully');
      };
      script.onerror = () => {
        console.warn('Failed to load IntersectionObserver polyfill');
      };
      document.head.appendChild(script);
    }

    // Performance budget monitoring
    const performanceBudget = {
      fcp: 1800,
      lcp: 2500,
      fid: 100,
      cls: 0.1
    };

    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              const fcp = entry.startTime;
              if (fcp > performanceBudget.fcp) {
                console.warn('FCP exceeded budget:', fcp, 'ms');
              }
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Performance monitoring failed:', e);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceScripts;
