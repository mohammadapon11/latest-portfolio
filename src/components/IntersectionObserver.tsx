'use client';

import React, { useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
  onIntersect?: (isIntersecting: boolean) => void;
  className?: string;
  delay?: number;
  id?: string;
}

const IntersectionObserver = ({
  children,
  threshold = [0, 0.1, 0.5, 1],
  rootMargin = '100px',
  onIntersect,
  className = '',
  delay = 0,
  id,
}: IntersectionObserverProps) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasIntersected) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setHasIntersected(true);
      onIntersect?.(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setHasIntersected(true);
              onIntersect?.(true);
            }, delay);
          } else {
            setHasIntersected(true);
            onIntersect?.(true);
          }
          observer.unobserve(element);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, onIntersect, delay, hasIntersected]);

  // Extract target section ID from children if not explicitly provided
  let targetId: string | undefined = id;
  if (!targetId && React.isValidElement(children)) {
    const inner = (children.props as { children?: React.ReactNode })?.children;
    if (inner && React.isValidElement(inner) && (inner.props as { id?: string })?.id) {
      targetId = (inner.props as { id?: string }).id;
    } else if ((children.props as { id?: string })?.id) {
      targetId = (children.props as { id?: string }).id;
    }
  }

  return (
    <div
      ref={elementRef}
      id={!hasIntersected ? targetId : undefined}
      className={`min-h-screen ${className}`}
    >
      {hasIntersected ? children : null}
    </div>
  );
};

export default IntersectionObserver;

