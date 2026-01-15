import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import MeasureOverlay from '@/components/ui/MeasureOverlay';

// Anatomy Label Component with connecting line
const AnatomyLabel = ({
    label,
    direction = 'top',
    length = 24,
    className,
    isDimmed = false,
    isActive = false,
    onMouseEnter,
    onMouseLeave
}: {
    label: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    length?: number;
    className?: string;
    isDimmed?: boolean;
    isActive?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}) => {
    const isVertical = direction === 'top' || direction === 'bottom';

    return (
        <div
            className={cn(
                "absolute flex items-center justify-center z-20 transition-[opacity,filter] duration-300",
                isDimmed ? "opacity-20 blur-[0.5px] grayscale" : "opacity-100",
                className
            )}
            style={{
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: '100%',
                // Center on the cross-axis
                ...(isVertical
                    ? { left: '50%', transform: 'translateX(-50%)' }
                    : { top: '50%', transform: 'translateY(-50%)' }
                ),
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0,
                pointerEvents: 'auto' // Allow pointer events on the wrapper to catch hover
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* The Line */}
            <div
                className={cn(
                    "transition-colors duration-300",
                    isActive ? "bg-blue-700" : "bg-blue-600/80"
                )}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0
                }}
            />

            {/* The Label Badge */}
            <div className={cn(
                "flex items-center justify-center px-2 py-1 rounded-md text-white text-[10px] font-bold shadow-sm whitespace-nowrap transition-colors duration-300 cursor-help",
                isActive ? "bg-blue-700" : "bg-blue-600",
                direction === 'top' || direction === 'left' ? "order-1" : "order-1"
            )}>
                {label}
            </div>
        </div>
    );
};




const TabsAnatomy = ({ showLabels = true }: { showLabels?: boolean }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-[320px] mx-auto p-4 select-none flex flex-col gap-4">

            {/* Tabs List Area */}
            <div
                className="relative inline-flex items-center gap-1 p-1 bg-muted rounded-lg group"
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : 'none'
                }}
            >
                {/* 1. Container Label */}
                {showLabels && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <AnatomyLabel
                            label="Container"
                            direction="left"
                            length={32}
                            isActive={hoveredPart === 'Container'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                            onMouseEnter={() => setHoveredPart('Container')}
                            onMouseLeave={() => setHoveredPart(null)}
                        />
                    </div>
                )}

                <button
                    onClick={() => setActiveTab('tab1')}
                    className={cn(
                        "relative flex-1 flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium outline-none",
                        activeTab === 'tab1' ? "text-foreground" : "text-muted-foreground hover:bg-muted/50"
                    )}
                    style={{
                        outline: hoveredPart === 'Trigger' && activeTab === 'tab1' ? '2px solid #2563eb' : 'none'
                    }}
                >
                    {activeTab === 'tab1' && (
                        <motion.div
                            layoutId="activeTab"
                            className={cn(
                                "absolute inset-0 bg-background rounded-md transition-shadow duration-200",
                                isAnimating ? "shadow-[0_0_3px_rgba(0,0,0,0.1)]" : "group-hover:shadow-[0_0_3px_rgba(0,0,0,0.1)]"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onLayoutAnimationStart={() => setIsAnimating(true)}
                            onLayoutAnimationComplete={() => setIsAnimating(false)}
                        />
                    )}
                    <span
                        className="relative z-10 w-full text-center rounded"
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : 'none'
                        }}
                    >
                        Tab 1
                        {/* 3. Text Label */}
                        {showLabels && (
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none"> {/* Keep pointer-events-none wrapper for positioning, but pass events to Label */}
                                <div className="pointer-events-auto"> {/* Re-enable pointer events for the label itself */}
                                    <AnatomyLabel
                                        label="Label"
                                        direction="top"
                                        length={20}
                                        isActive={hoveredPart === 'Label'}
                                        isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                        onMouseEnter={() => setHoveredPart('Label')}
                                        onMouseLeave={() => setHoveredPart(null)}
                                    />
                                </div>
                            </div>
                        )}
                    </span>
                    {/* 2. Trigger Label */}
                    {showLabels && (
                        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                            <div className="pointer-events-auto">
                                <AnatomyLabel
                                    label="Trigger"
                                    direction="bottom"
                                    length={24}
                                    isActive={hoveredPart === 'Trigger'}
                                    isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'}
                                    onMouseEnter={() => setHoveredPart('Trigger')}
                                    onMouseLeave={() => setHoveredPart(null)}
                                />
                            </div>
                        </div>
                    )}
                </button>

                {/* Trigger 2 */}
                <button
                    onClick={() => setActiveTab('tab2')}
                    className={cn(
                        "relative flex-1 flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium transition-colors outline-none",
                        activeTab === 'tab2' ? "text-foreground" : "text-muted-foreground hover:bg-muted/50"
                    )}
                >
                    {activeTab === 'tab2' && (
                        <motion.div
                            layoutId="activeTab"
                            className={cn(
                                "absolute inset-0 bg-background rounded-md transition-shadow duration-200",
                                isAnimating ? "shadow-sm" : "group-hover:shadow-sm"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onLayoutAnimationStart={() => setIsAnimating(true)}
                            onLayoutAnimationComplete={() => setIsAnimating(false)}
                        />
                    )}
                    <span className="relative z-10 w-full text-center">Tab 2</span>
                </button>
            </div>

        </div>
    );
};

const AnatomyPreview: React.FC<{ componentName: string; isMeasureMode?: boolean; showLabels?: boolean }> = ({ componentName, isMeasureMode = false, showLabels = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const name = componentName.toLowerCase();

    let content = null;
    if (name === 'tabs') {
        content = <TabsAnatomy showLabels={showLabels} />;
    } else {
        content = (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-xl border-dashed border-2">
                <div className="mb-2">No anatomy diagram available</div>
                <div className="text-xs opacity-50">dev note: implement anatomy for {componentName}</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Content Wrapper for Measurement */}
            <div ref={containerRef} className="w-full">
                {content}
            </div>

            {/* Measurement Overlay */}
            {isMeasureMode && <MeasureOverlay targetRef={containerRef as React.RefObject<HTMLElement>} />}
        </div>
    );
};

export default AnatomyPreview;
