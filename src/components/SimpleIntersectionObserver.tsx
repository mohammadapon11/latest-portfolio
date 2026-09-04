'use client';

import { useEffect, useState } from 'react';

interface SimpleIntersectionObserverProps {
  children: React.ReactNode;
  onIntersect?: (isIntersecting: boolean) => void;
  className?: string;
  delay?: number;
}

// Simple fallback component that shows content after delay
const SimpleIntersectionObserver = ({
  children,
  onIntersect,
  className = '',
  delay = 0,
}: SimpleIntersectionObserverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onIntersect?.(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [onIntersect, delay]);

  return (
    <div className={`min-h-screen ${className}`}>
      {isVisible ? children : null}
    </div>
  );
};

export default SimpleIntersectionObserver;
