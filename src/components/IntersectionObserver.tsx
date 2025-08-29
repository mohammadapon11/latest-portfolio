'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
  onIntersect?: (isIntersecting: boolean) => void;
  className?: string;
  delay?: number;
}

const IntersectionObserver = ({
  children,
  threshold = [0, 0.1, 0.5, 1],
  rootMargin = '0px 0px -100px 0px',
  onIntersect,
  className = '',
  delay = 0
}: IntersectionObserverProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if IntersectionObserver is supported
  useEffect(() => {
    setIsSupported('IntersectionObserver' in window);
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const intersecting = entry.isIntersecting;

    setIsIntersecting(intersecting);

    if (intersecting && !isVisible) {
      setTimeout(() => {
        setIsVisible(true);
        onIntersect?.(true);
      }, delay);
    } else if (!intersecting && isVisible) {
      setIsVisible(false);
      onIntersect?.(false);
    }
  }, [isVisible, onIntersect, delay]);

  useEffect(() => {
    // If IntersectionObserver is not supported, show content immediately
    if (!isSupported) {
      setIsVisible(true);
      onIntersect?.(true);
      return;
    }

    let observer: globalThis.IntersectionObserver | null = null;

    try {
      observer = new globalThis.IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
    } catch (error) {
      console.warn('IntersectionObserver failed:', error);
      // Fallback: show content immediately
      setIsVisible(true);
      onIntersect?.(true);
    }

    return () => {
      if (observer) {
        try {
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      }
    };
  }, [handleIntersection, threshold, rootMargin, isSupported, onIntersect]);

  // If IntersectionObserver is not supported, render children immediately
  if (!isSupported) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default IntersectionObserver;
