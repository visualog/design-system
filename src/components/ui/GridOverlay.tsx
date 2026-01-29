import React from 'react';

export const GridOverlay: React.FC = () => {
    return (
        <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden h-full">
            {/* 
              Outer Container:
              - Acts as the 'Margin' visualizer (horizontal padding creates the margins)
              - bg-indigo-500/10 highlights the margin areas (and remaining space due to max-width)
            */}
            <div className="w-full h-full px-6 md:px-8 lg:px-12 mx-auto bg-orange-500/10 relative">
                {/* Margin Labels */}
                <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 lg:w-12 flex items-center justify-center border-r border-orange-500/30">
                    <span className="text-[10px] font-mono text-orange-600 font-medium rotate-[-90deg] whitespace-nowrap">
                        <span className="md:hidden">24px</span>
                        <span className="hidden md:inline lg:hidden">32px</span>
                        <span className="hidden lg:inline">48px</span>
                    </span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-6 md:w-8 lg:w-12 flex items-center justify-center border-l border-orange-500/30">
                    <span className="text-[10px] font-mono text-orange-600 font-medium rotate-90 whitespace-nowrap">
                        <span className="md:hidden">24px</span>
                        <span className="hidden md:inline lg:hidden">32px</span>
                        <span className="hidden lg:inline">48px</span>
                    </span>
                </div>
                {/* 
                  Inner Container:
                  - Defines the Grid System
                  - bg-teal-500/10 acts as the 'Gutter' visualizer (visible through grid gaps)
                */}
                <div className="w-full max-w-[1200px] h-full mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5 bg-violet-500/25">
                    {Array.from({ length: 12 }).map((_, i) => {
                        let visibilityClass = '';
                        if (i >= 8) {
                            visibilityClass = 'hidden lg:block';
                        } else if (i >= 4) {
                            visibilityClass = 'hidden md:block';
                        }

                        return (
                            <div
                                key={i}
                                className={`h-full bg-blue-500/20 border-x border-blue-500/10 ${visibilityClass}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
