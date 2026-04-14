import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';

const ParticleBackground = lazy(() =>
  import('./ParticleBackground').then((module) => ({ default: module.ParticleBackground }))
);

interface DeferredParticleBackgroundProps {
  focusState: 'none' | 'id' | 'password';
  className?: string;
  delayMs?: number;
}

export const DeferredParticleBackground: React.FC<DeferredParticleBackgroundProps> = ({
  focusState,
  className,
  delayMs = 300,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const mountBackground = () => {
      timeoutId = window.setTimeout(() => {
        setShouldMount(true);
      }, delayMs);
    };

    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(() => {
        mountBackground();
      });
    } else {
      mountBackground();
    }

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      if (idleId !== null && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleId);
      }
    };
  }, [delayMs, isVisible]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className ?? ''}`}>
      <Suspense fallback={null}>
        {shouldMount ? <ParticleBackground focusState={focusState} className="absolute inset-0" /> : null}
      </Suspense>
    </div>
  );
};

export default DeferredParticleBackground;
