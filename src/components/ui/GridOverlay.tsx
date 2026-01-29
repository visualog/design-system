import React, { useEffect, useRef, useState } from 'react';

export const GridOverlay: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        // Initial measure
        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="absolute inset-0 z-[100] pointer-events-none h-full">
            {/* 
              Outer Container:
              - Acts as the 'Margin' visualizer (horizontal padding creates the margins)
              - bg-orange-500/10 highlights the margin areas (and remaining space due to max-width)
            */}
            <div className="w-full h-full px-6 md:px-8 lg:px-12 mx-auto bg-orange-500/10 relative">
                {/* Margin Labels */}
                <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 lg:w-12 border-r border-orange-500/30">
                    <div className="sticky top-[50vh] flex items-center justify-center w-full -translate-y-1/2">
                        <span className="text-[10px] font-mono text-orange-600 font-medium rotate-[-90deg] whitespace-nowrap bg-orange-50/50 px-1 rounded-sm">
                            <span className="md:hidden">24px</span>
                            <span className="hidden md:inline lg:hidden">32px</span>
                            <span className="hidden lg:inline">48px</span>
                        </span>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-6 md:w-8 lg:w-12 border-l border-orange-500/30">
                    <div className="sticky top-[50vh] flex items-center justify-center w-full -translate-y-1/2">
                        <span className="text-[10px] font-mono text-orange-600 font-medium rotate-90 whitespace-nowrap bg-orange-50/50 px-1 rounded-sm">
                            <span className="md:hidden">24px</span>
                            <span className="hidden md:inline lg:hidden">32px</span>
                            <span className="hidden lg:inline">48px</span>
                        </span>
                    </div>
                </div>
                {/* 
                  Inner Container:
                  - Defines the Grid System
                  - bg-violet-500/25 acts as the 'Gutter' visualizer (visible through grid gaps)
                */}
                <div
                    ref={containerRef}
                    className="w-full max-w-[1200px] h-full mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5 bg-violet-500/25 relative"
                >
                    {/* Width Label - Sticky at top */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center h-full pointer-events-none">
                        <div className="sticky top-4 h-min z-50">
                            <span className="bg-blue-600/90 text-white text-[10px] font-mono px-2 py-1 rounded-full shadow-sm backdrop-blur-sm shadow-blue-900/20">
                                {Math.round(width)}px
                            </span>
                        </div>
                    </div>

                    {Array.from({ length: 12 }).map((_, i) => {
                        let visibilityClass = '';
                        if (i >= 8) {
                            visibilityClass = 'hidden lg:block';
                        } else if (i >= 4) {
                            visibilityClass = 'hidden md:block';
                        }

                        // Gutter Label Visibility Logic
                        // Hide label if it's the last column of the current breakpoint
                        let gutterLabelClass = 'flex';
                        if (i === 3) gutterLabelClass = 'hidden md:flex';         // Hide on Mobile (last col)
                        if (i === 7) gutterLabelClass = 'flex md:hidden lg:flex'; // Hide on Tablet (last col)
                        if (i === 11) gutterLabelClass = 'hidden';                // Hide on Desktop (last col)

                        return (
                            <div
                                key={i}
                                className={`relative h-full bg-blue-500/20 border-x border-blue-500/10 ${visibilityClass}`}
                            >
                                {/* Gutter Label - Absolute wrapper to prevent layout shift, with internal sticky positioning */}
                                <div className={`absolute top-0 right-0 translate-x-full h-full w-3 md:w-4 lg:w-5 ${gutterLabelClass} justify-center`}>
                                    <div className="sticky top-[50vh] h-min flex items-center justify-center -translate-y-1/2">
                                        <span className="text-[9px] leading-none font-mono text-violet-700 font-medium bg-violet-50/80 px-0.5 rounded-sm">
                                            <span className="md:hidden">12</span>
                                            <span className="hidden md:inline lg:hidden">16</span>
                                            <span className="hidden lg:inline">20</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
