// Performance optimization utilities

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if element is in viewport
export const isInViewport = (element: Element): boolean => {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Preload component when needed
export const preloadComponent = (importFn: () => Promise<unknown>) => {
  return () => {
    // This function returns a component loader function
    // The actual component loading should be handled by the calling component
    return importFn();
  };
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') {
    fn();
    return;
  }

  const start = performance.now();
  fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start} milliseconds`);
  }
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }

  const memory = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100,
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100,
    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100,
  };
};

// Check device capabilities for performance optimization
export const getDeviceCapabilities = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEnd: false,
      supportsWebGL: false,
      supportsWebGL2: false,
    };
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;

  let supportsWebGL = false;
  let supportsWebGL2 = false;

  try {
    const canvas = document.createElement('canvas');
    supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    supportsWebGL2 = !!canvas.getContext('webgl2');
  } catch {
    // WebGL not supported
  }

  return {
    isMobile,
    isLowEnd,
    supportsWebGL,
    supportsWebGL2,
  };
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationSettings = () => {
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.isLowEnd || capabilities.isMobile) {
    return {
      reducedMotion: true,
      simplifiedEffects: true,
      lowerFPS: true,
      disable3D: true,
    };
  }

  return {
    reducedMotion: false,
    simplifiedEffects: false,
    lowerFPS: false,
    disable3D: false,
  };
};
