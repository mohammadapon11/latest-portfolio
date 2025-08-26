'use client';

import { useEffect } from 'react';

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType: string;
    saveData: boolean;
  };
}

interface WindowWithWorkbox extends Window {
  workbox?: unknown;
}

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      (window as WindowWithWorkbox).workbox === undefined
    ) {
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update prompt
                  if (confirm('New content is available! Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // Handle offline/online events
      window.addEventListener('online', () => {
        console.log('App is online');
        document.body.classList.remove('offline');
      });

      window.addEventListener('offline', () => {
        console.log('App is offline');
        document.body.classList.add('offline');
      });

      // Preload critical resources
      if ('connection' in navigator) {
        const connection = (navigator as NavigatorWithConnection).connection;
        if (connection?.effectiveType === '4g' && !connection?.saveData) {
          // Preload important resources on fast connections
          preloadCriticalResources();
        }
      }
    }
  }, []);

  const preloadCriticalResources = () => {
    const criticalResources = [
      '/static/js/bundle.js',
      '/static/css/main.css',
      // Add other critical resources here
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.js') ? 'script' : 'style';
      document.head.appendChild(link);
    });
  };

  return null; // This component doesn't render anything
};

export default ServiceWorkerRegistration;
