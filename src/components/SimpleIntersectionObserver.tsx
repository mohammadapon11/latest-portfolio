'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface SimpleIntersectionObserverProps {
  children: React.ReactNode;
  onIntersect?: (isIntersecting: boolean) => void;
  className?: string;
  delay?: number;
}

// Simple fallback component that shows content immediately
const SimpleIntersectionObserver = ({
  children,
  onIntersect,
  className = '',
  delay = 0
}: SimpleIntersectionObserverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show content immediately with optional delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      onIntersect?.(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [onIntersect, delay]);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SimpleIntersectionObserver;
