'use client';

import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  memory: {
    used: number;
    total: number;
    limit: number;
  };
  fps: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fpsCount, setFpsCount] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  // FPS calculation
  const calculateFPS = useCallback((currentTime: number) => {
    if (lastTime > 0) {
      const deltaTime = currentTime - lastTime;
      const fps = Math.round(1000 / deltaTime);
      setFpsCount(fps);
    }
    setLastTime(currentTime);
  }, [lastTime]);

  // Performance observer for Core Web Vitals
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;

    let observer: PerformanceObserver | null = null;

    try {
      // First Contentful Paint
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({
              ...prev,
              fcp: Math.round(entry.startTime)
            } as PerformanceMetrics));
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'largest-contentful-paint') {
            setMetrics(prev => ({
              ...prev,
              lcp: Math.round(entry.startTime)
            } as PerformanceMetrics));
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            const firstInputEntry = entry as PerformanceEventTiming;
            setMetrics(prev => ({
              ...prev,
              fid: Math.round(firstInputEntry.processingStart - firstInputEntry.startTime)
            } as PerformanceMetrics));
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      observer = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as unknown as { hadRecentInput: boolean; value: number };
          if (layoutShiftEntry.hadRecentInput) continue;
          cls += layoutShiftEntry.value;
        }
        setMetrics(prev => ({
          ...prev,
          cls: Math.round(cls * 1000) / 1000
        } as PerformanceMetrics));
      });
      observer.observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              ttfb: Math.round(navEntry.responseStart - navEntry.requestStart)
            } as PerformanceMetrics));
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });

    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Memory monitoring
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;

    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        setMetrics(prev => ({
          ...prev,
          memory: {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
          }
        } as PerformanceMetrics));
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 2000);

    return () => clearInterval(interval);
  }, []);

  // FPS monitoring
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;

    let animationId: number;

    const animate = (currentTime: number) => {
      calculateFPS(currentTime);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [calculateFPS]);

  // Toggle visibility
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!metrics || !isVisible || process.env.NODE_ENV === 'production') return null;

  const getPerformanceColor = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.needsImprovement) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-md border border-gray-700 rounded-lg p-4 text-white text-sm font-mono z-50 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-cyan-400 font-semibold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getPerformanceColor(metrics.fcp || 0, { good: 1800, needsImprovement: 3000 })}>
            {metrics.fcp || 'N/A'}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getPerformanceColor(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}>
            {metrics.lcp || 'N/A'}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getPerformanceColor(metrics.fid || 0, { good: 100, needsImprovement: 300 })}>
            {metrics.fid || 'N/A'}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getPerformanceColor(metrics.cls || 0, { good: 0.1, needsImprovement: 0.25 })}>
            {metrics.cls || 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getPerformanceColor(metrics.ttfb || 0, { good: 800, needsImprovement: 1800 })}>
            {metrics.ttfb || 'N/A'}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={fpsCount >= 50 ? 'text-green-400' : fpsCount >= 30 ? 'text-yellow-400' : 'text-red-400'}>
            {fpsCount}
          </span>
        </div>
        
        {metrics.memory && (
          <>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className="text-blue-400">
                {metrics.memory.used}MB / {metrics.memory.total}MB
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(metrics.memory.used / metrics.memory.limit) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        Press Ctrl+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
