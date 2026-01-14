import React, { useRef, useEffect } from 'react';
import Breadcrumb from './ui/Breadcrumb';
import ProposalNotification from './ui/ProposalNotification';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Animation loop for smooth interpolation (Lerp)
    const animate = () => {
      // Linear interpolation: current + (target - current) * factor
      // Factor 0.1 provides a nice smooth "catch-up" effect
      const diff = targetProgress.current - currentProgress.current;

      // If difference is significant, update
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.1;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentProgress.current * 100}%`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Start the loop
    rafId.current = requestAnimationFrame(animate);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (windowHeight > 0) {
        targetProgress.current = Math.min(1, Math.max(0, totalScroll / windowHeight));
      }

      // Show progress bar on scroll
      if (progressBarRef.current) {
        progressBarRef.current.style.opacity = '1';
      }

      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Set timeout to hide after 1 second of inactivity
      hideTimeoutRef.current = setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.opacity = '0';
        }
      }, 1000);
      // Show/hide border based on scroll position
      if (headerRef.current) {
        if (totalScroll > 0) {
          headerRef.current.classList.add('border-b', 'border-border');
        } else {
          headerRef.current.classList.remove('border-b', 'border-border');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <main className="flex-1">
      {/* Sticky Header with Breadcrumb */}
      <div
        ref={headerRef}
        className="sticky top-14 md:top-0 z-50 w-full bg-background/80 backdrop-blur-md px-6 md:px-8 lg:px-12 pt-6 pb-4 relative transition-colors duration-200"
      >
        <div className="max-w-[760px] mx-auto flex items-center justify-between">
          <Breadcrumb />
          <ProposalNotification />
        </div>

        {/* Scroll Progress Indicator */}
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 h-[2px] bg-primary transition-opacity duration-500 ease-out opacity-0"
          style={{ width: '0%', willChange: 'width, opacity' }}
        />
      </div>

      {/* Main Scrollable Content */}
      <div className="px-6 pb-6 md:px-8 md:pb-8 lg:px-12 lg:pb-12 pt-4">
        <article className="max-w-[760px] mx-auto flex flex-col gap-4">
          {children}
        </article>
      </div>
    </main>
  );
};

export default MainContent;