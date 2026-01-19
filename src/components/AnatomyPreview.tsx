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

    // Determine centering classes based on direction
    const centeringClasses = isVertical
        ? "left-1/2 -translate-x-1/2"
        : "top-1/2 -translate-y-1/2";

    return (
        <div
            className={cn(
                "absolute flex items-center justify-center z-20 transition-[opacity,filter] duration-300",
                isDimmed ? "opacity-20 blur-[0.5px] grayscale" : "opacity-100",
                centeringClasses,
                className
            )}
            data-measure-ignore="true"
            style={{
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: '100%',
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0,
                pointerEvents: 'auto',
                transformOrigin: direction === 'top' ? 'top' : direction === 'bottom' ? 'bottom' : direction === 'left' ? 'left' : 'right'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => e.stopPropagation()}
        >
            {/* The Line */}
            <motion.div
                className={cn(
                    "origin-[inherit]",
                    isActive ? "bg-blue-700" : "bg-blue-600/80"
                )}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0
                }}
                initial={{
                    scaleX: isVertical ? 1 : 0,
                    scaleY: isVertical ? 0 : 1
                }}
                animate={{
                    scaleX: isVertical ? 1 : (isActive ? 1 : 0),
                    scaleY: isVertical ? (isActive ? 1 : 0) : 1
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* The Label Badge */}
            <div className={cn(
                "flex items-center justify-center px-2 py-1 rounded-md text-white text-[10px] font-bold shadow-sm whitespace-nowrap transition-colors duration-300",
                isActive ? "bg-blue-700" : "bg-blue-600",
                direction === 'top' || direction === 'left' ? "order-1" : "order-1"
            )}
                style={{ whiteSpace: 'nowrap' }}>
                {label}
            </div>
        </div>
    );
};

// Color Label Component for showing color tokens
const ColorLabel = ({
    tokenName,
    colorValue,
    direction = 'top',
    length = 24,
    isActive = false,
    isDimmed = false,
    onMouseEnter,
    onMouseLeave,
    className
}: {
    tokenName: string;
    colorValue: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    length?: number;
    isActive?: boolean;
    isDimmed?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
}) => {
    const isVertical = direction === 'top' || direction === 'bottom';

    return (
        <div
            className={cn(
                "absolute flex items-center justify-center z-20 transition-[opacity,filter] duration-300",
                isDimmed ? "opacity-20 blur-[0.5px] grayscale" : "opacity-100",
                className
            )}
            data-measure-ignore="true"
            style={{
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: '100%',
                ...(isVertical
                    ? { left: '50%', transform: 'translateX(-50%)' }
                    : { top: '50%', transform: 'translateY(-50%)' }
                ),
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0,
                pointerEvents: 'auto',
                transformOrigin: direction === 'top' ? 'top' : direction === 'bottom' ? 'bottom' : direction === 'left' ? 'left' : 'right'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => e.stopPropagation()}
        >
            {/* The Line */}
            <motion.div
                className={cn(
                    "origin-[inherit]",
                    isActive ? "bg-violet-600" : "bg-violet-500/80"
                )}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0
                }}
                initial={{
                    scaleX: isVertical ? 1 : 0,
                    scaleY: isVertical ? 0 : 1
                }}
                animate={{
                    scaleX: isVertical ? 1 : (isActive ? 1 : 0),
                    scaleY: isVertical ? (isActive ? 1 : 0) : 1
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* The Color Badge */}
            <div className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-white text-[10px] font-medium shadow-sm whitespace-nowrap transition-colors duration-300",
                isActive ? "bg-violet-600" : "bg-violet-500",
                direction === 'top' || direction === 'left' ? "order-1" : "order-1"
            )}
                style={{ whiteSpace: 'nowrap' }}>
                <div
                    className="w-3 h-3 rounded-sm border border-white/30"
                    style={{ backgroundColor: colorValue }}
                />
                <span>{tokenName}</span>
            </div>
        </div>
    );
};

// Color token data with hex values
export const colorTokenData: Record<string, { hex: string; rgb: string; hsl: string; usage: string }> = {
    'bg-muted': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'hsl(240 5% 96%)', usage: '컨테이너 배경' },
    'bg-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0 0% 100%)', usage: '활성 트리거 배경' },
    'text-foreground': { hex: '#09090B', rgb: 'rgb(9, 9, 11)', hsl: 'hsl(240 10% 4%)', usage: '기본 텍스트' },
    'text-muted-foreground': { hex: '#71717A', rgb: 'rgb(113, 113, 122)', hsl: 'hsl(240 4% 46%)', usage: '보조 텍스트 (비활성)' },
};

const TabsAnatomy = ({ style = 'segmented', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'segmented' | 'pill' | 'line'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null) => void }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    // Notify parent when hoveredPart changes
    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };

    // Notify parent when hoveredColor changes
    const handleColorHoverChange = (color: string | null) => {
        setHoveredColor(color);
        onColorHoverChange?.(color);
    };

    // Style Definitions
    const containerClasses = {
        segmented: "bg-muted p-1 rounded-lg gap-1",
        pill: "bg-transparent p-0 gap-2",
        line: "bg-transparent p-0 gap-6 border-b border-border w-full justify-start rounded-none"
    };

    const triggerBaseClasses = "relative flex-1 flex items-center justify-center h-9 px-3 text-sm font-medium outline-none transition-colors";

    const triggerInactiveClasses = {
        segmented: "text-muted-foreground hover:bg-muted/50 rounded-md",
        pill: "text-muted-foreground hover:bg-muted bg-transparent border border-transparent rounded-full",
        line: "text-muted-foreground hover:text-foreground rounded-none"
    };

    const triggerActiveClasses = {
        segmented: "text-foreground rounded-md",
        pill: "text-primary-foreground rounded-full",
        line: "text-foreground rounded-none"
    };

    return (
        <div className="relative flex flex-col items-center gap-8 select-none mx-auto w-72">
            {/* Tabs List Area */}
            <div
                className={cn(
                    "relative flex items-center w-full group transition-all duration-300",
                    containerClasses[style]
                )}
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'bg-muted' && style === 'segmented' ? '2px solid #7c3aed' : 'none'),
                    transition: 'outline 0s 0.2s',
                }}
            >
                {/* 1. Container Label - Only relevant for Segmented mainly */}
                {showLabels && style === 'segmented' && (
                    <AnatomyLabel
                        label="컨테이너"
                        direction="left"
                        length={32}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                        onMouseEnter={() => handleHoverChange('Container')}
                        onMouseLeave={() => handleHoverChange(null)}
                        className="top-1/2 -translate-y-1/2"
                    />
                )}
                {/* Container Label for Line (Border) */}
                {showLabels && style === 'line' && (
                    <AnatomyLabel
                        label="보더 (Container)"
                        direction="left"
                        length={10}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                        onMouseEnter={() => handleHoverChange('Container')}
                        onMouseLeave={() => handleHoverChange(null)}
                        className="top-full translate-y-2 translate-x-[-10px]"
                    />
                )}

                {/* Container Color Label (Only Segmented has bg-muted visible) */}
                {showColorInfo && style === 'segmented' && (
                    <ColorLabel
                        tokenName="컨테이너 배경"
                        colorValue={colorTokenData['bg-muted'].hsl}
                        direction="left"
                        length={32}
                        isActive={hoveredColor === 'bg-muted'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                        onMouseEnter={() => handleColorHoverChange('bg-muted')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                        className="top-1/2 -translate-y-1/2"
                    />
                )}

                {/* Tab 1 */}
                <button
                    onClick={() => setActiveTab('tab1')}
                    className={cn(
                        triggerBaseClasses,
                        activeTab === 'tab1' ? triggerActiveClasses[style] : triggerInactiveClasses[style]
                    )}
                    style={{
                        outline: ((hoveredPart === 'ActiveTrigger' && activeTab === 'tab1') || (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab1')) ? '2px solid #2563eb' : ((hoveredColor === 'bg-background' && activeTab === 'tab1' && style === 'segmented') ? '2px solid #7c3aed' : 'none'),
                        transition: 'outline 0s 0.2s',
                    }}
                >
                    {activeTab === 'tab1' && (
                        <motion.div
                            layoutId="activeTab"
                            className={cn(
                                "absolute inset-0 transition-shadow duration-200",
                                style === 'segmented' && cn(
                                    "bg-background rounded-md",
                                    isAnimating ? "shadow-[0_0_3px_rgba(0,0,0,0.1)]" : "group-hover:shadow-[0_0_3px_rgba(0,0,0,0.1)]"
                                ),
                                style === 'pill' && "bg-foreground rounded-full shadow-sm",
                                style === 'line' && "bg-transparent border-b-2 border-foreground bottom-[-1px] rounded-none inset-x-0 h-full"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onLayoutAnimationStart={() => setIsAnimating(true)}
                            onLayoutAnimationComplete={() => setIsAnimating(false)}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10 w-full text-center",
                            style === 'pill' && activeTab === 'tab1' && "text-background"
                        )}
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (((hoveredColor === 'text-foreground' && activeTab === 'tab1') || (hoveredColor === 'text-muted-foreground' && activeTab !== 'tab1')) ? '2px solid #7c3aed' : 'none'),
                        }}
                    >
                        탭 1
                        {/* Label annotation - inside span for text-relative positioning */}
                        {activeTab === 'tab1' && showLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={style === 'line' ? 30 : 20}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                onMouseEnter={() => handleHoverChange('Label')}
                                onMouseLeave={() => handleHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                            />
                        )}
                    </span>
                    {/* Active Trigger Label - outside span for button-relative positioning */}
                    {activeTab === 'tab1' && showLabels && (
                        <AnatomyLabel
                            label={style === 'line' ? '인디케이터' : '활성 트리거'}
                            direction="bottom"
                            length={style === 'line' ? 14 : 24}
                            isActive={hoveredPart === 'ActiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'ActiveTrigger'}
                            onMouseEnter={() => handleHoverChange('ActiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                            className="left-1/2 -translate-x-1/2"
                        />
                    )}
                </button>

                {/* Tab 2 */}
                <button
                    onClick={() => setActiveTab('tab2')}
                    className={cn(
                        triggerBaseClasses,
                        activeTab === 'tab2' ? triggerActiveClasses[style] : triggerInactiveClasses[style]
                    )}
                    style={{
                        outline: ((hoveredPart === 'ActiveTrigger' && activeTab === 'tab2') || (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab2')) ? '2px solid #2563eb' : 'none'
                    }}
                >
                    {activeTab === 'tab2' && (
                        <motion.div
                            layoutId="activeTab"
                            className={cn(
                                "absolute inset-0 transition-shadow duration-200",
                                style === 'segmented' && cn(
                                    "bg-background rounded-md",
                                    isAnimating ? "shadow-[0_0_3px_rgba(0,0,0,0.1)]" : "group-hover:shadow-[0_0_3px_rgba(0,0,0,0.1)]"
                                ),
                                style === 'pill' && "bg-foreground rounded-full shadow-sm",
                                style === 'line' && "bg-transparent border-b-2 border-foreground bottom-[-1px] rounded-none inset-x-0 h-full"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10 w-full text-center",
                            style === 'pill' && activeTab === 'tab2' && "text-background"
                        )}
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : 'none'
                        }}
                    >
                        탭 2
                        {/* Label annotation - inside span for text-relative positioning */}
                        {activeTab === 'tab2' && showLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={style === 'line' ? 30 : 20}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                onMouseEnter={() => handleHoverChange('Label')}
                                onMouseLeave={() => handleHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                            />
                        )}
                    </span>
                    {/* Inactive Trigger Label - outside span for button-relative positioning */}
                    {activeTab !== 'tab2' && showLabels && (
                        <AnatomyLabel
                            label="비활성 트리거"
                            direction="bottom"
                            length={24}
                            isActive={hoveredPart === 'InactiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'InactiveTrigger'}
                            onMouseEnter={() => handleHoverChange('InactiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                            className="left-1/2 -translate-x-1/2"
                        />
                    )}
                </button>
            </div >
        </div >
    );
};

interface AnatomyPreviewProps {
    componentName: string;
    isMeasureMode?: boolean;
    showLabels?: boolean;
    showColorInfo?: boolean;
    style?: string;
    onHoverChange?: (part: string | null) => void;
    onColorHoverChange?: (color: string | null) => void;
}

// Helper function to get variants for a component
export const getAnatomyVariants = (componentName: string): string[] => {
    const name = componentName.toLowerCase();
    if (name === 'tabs') return ['segmented', 'pill', 'line'];
    return [];
};

const AnatomyPreview: React.FC<AnatomyPreviewProps> = ({
    componentName,
    isMeasureMode = false,
    showLabels = true,
    showColorInfo = false,
    style = 'segmented',
    onHoverChange,
    onColorHoverChange,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const name = componentName.toLowerCase();

    let content = null;
    if (name === 'tabs') {
        content = <TabsAnatomy style={style as any} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else {
        content = (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-xl border-dashed border-2">
                <div className="mb-2">No anatomy diagram available</div>
                <div className="text-xs opacity-50">개발 노트: {componentName}에 대한 아나토미 구현 필요</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {content}
            {isMeasureMode && <MeasureOverlay targetRef={containerRef as React.RefObject<HTMLElement>} />}
        </div>
    );
};

export default AnatomyPreview;

