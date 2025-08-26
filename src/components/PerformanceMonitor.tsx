'use client';

import { useEffect, useState } from 'react';
import { getMemoryUsage, getDeviceCapabilities, getOptimizedAnimationSettings } from '@/utils/performance';

interface PerformanceMetrics {
  memory: ReturnType<typeof getMemoryUsage>;
  capabilities: ReturnType<typeof getDeviceCapabilities>;
  animationSettings: ReturnType<typeof getOptimizedAnimationSettings>;
  timestamp: string;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      const memory = getMemoryUsage();
      const capabilities = getDeviceCapabilities();
      const animationSettings = getOptimizedAnimationSettings();

      setMetrics({
        memory,
        capabilities,
        animationSettings,
        timestamp: new Date().toLocaleTimeString(),
      });
    };

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, []);

  // Performance monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Core Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as FirstInputEntry;
          console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          console.log('CLS:', layoutShiftEntry.value);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch {
      console.log('PerformanceObserver not supported');
    }

    // Long task monitoring
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration, 'ms');
        }
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch {
      console.log('LongTask observer not supported');
    }

    return () => {
      observer.disconnect();
      longTaskObserver.disconnect();
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-4 text-xs text-white max-w-xs z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-cyan-400">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-400 hover:text-white"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      {isVisible && (
        <div className="space-y-2">
          <div>
            <span className="text-gray-400">Memory:</span>
            <div className="ml-2">
              <div>Used: {metrics.memory?.usedJSHeapSize} MB</div>
              <div>Total: {metrics.memory?.totalJSHeapSize} MB</div>
            </div>
          </div>
          
          <div>
            <span className="text-gray-400">Device:</span>
            <div className="ml-2">
              <div>Mobile: {metrics.capabilities.isMobile ? 'Yes' : 'No'}</div>
              <div>Low-end: {metrics.capabilities.isLowEnd ? 'Yes' : 'No'}</div>
              <div>WebGL: {metrics.capabilities.supportsWebGL ? 'Yes' : 'No'}</div>
            </div>
          </div>
          
          <div>
            <span className="text-gray-400">Optimizations:</span>
            <div className="ml-2">
              <div>3D: {metrics.animationSettings.disable3D ? 'Disabled' : 'Enabled'}</div>
              <div>Effects: {metrics.animationSettings.simplifiedEffects ? 'Simple' : 'Full'}</div>
            </div>
          </div>
          
          <div className="text-gray-500 text-xs">
            Updated: {metrics.timestamp}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
