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
                pointerEvents: 'auto', // Allow pointer events on the wrapper to catch hover
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
            )}>
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
            )}>
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




const TabsAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null) => void }) => {
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

    return (
        <div className="relative w-full max-w-[320px] mx-auto p-4 select-none flex flex-col gap-4">

            {/* Tabs List Area */}
            <div
                className="relative inline-flex items-center gap-1 p-1 bg-muted rounded-lg group"
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'bg-muted' ? '2px solid #7c3aed' : 'none'),
                    transition: 'outline 0s 0.2s',
                }}
            >
                {/* 1. Container Label */}
                {showLabels && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <AnatomyLabel
                            label="컨테이너"
                            direction="left"
                            length={32}
                            isActive={hoveredPart === 'Container'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                            onMouseEnter={() => handleHoverChange('Container')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    </div>
                )}

                {/* Container Color Label */}
                {showColorInfo && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <ColorLabel
                            tokenName="컨테이너 배경"
                            colorValue={colorTokenData['bg-muted'].hsl}
                            direction="left"
                            length={32}
                            isActive={hoveredColor === 'bg-muted'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                            onMouseEnter={() => handleColorHoverChange('bg-muted')}
                            onMouseLeave={() => handleColorHoverChange(null)}
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
                        outline: ((hoveredPart === 'ActiveTrigger' && activeTab === 'tab1') || (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab1')) ? '2px solid #2563eb' : ((hoveredColor === 'bg-background' && activeTab === 'tab1') ? '2px solid #7c3aed' : 'none'),
                        transition: 'outline 0s 0.2s',
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
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (((hoveredColor === 'text-foreground' && activeTab === 'tab1') || (hoveredColor === 'text-muted-foreground' && activeTab !== 'tab1')) ? '2px solid #7c3aed' : 'none'),
                            transition: 'outline 0s 0.2s',
                        }}
                    >
                        탭 1
                        {/* Active: Label Anatomy & Color */}
                        {activeTab === 'tab1' && (
                            <>
                                {showLabels && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 20 }}>
                                        <div className="pointer-events-auto">
                                            <AnatomyLabel
                                                label="레이블"
                                                direction="top"
                                                length={20}
                                                isActive={hoveredPart === 'Label'}
                                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                                onMouseEnter={() => handleHoverChange('Label')}
                                                onMouseLeave={() => handleHoverChange(null)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {showColorInfo && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                        <ColorLabel
                                            tokenName="기본 텍스트"
                                            colorValue={colorTokenData['text-foreground'].hsl}
                                            direction="top"
                                            length={20}
                                            isActive={hoveredColor === 'text-foreground'}
                                            isDimmed={hoveredColor !== null && hoveredColor !== 'text-foreground'}
                                            onMouseEnter={() => handleColorHoverChange('text-foreground')}
                                            onMouseLeave={() => handleColorHoverChange(null)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        {/* Inactive: Text Color */}
                        {activeTab !== 'tab1' && showColorInfo && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                <ColorLabel
                                    tokenName="비활성 텍스트"
                                    colorValue={colorTokenData['text-muted-foreground'].hsl}
                                    direction="top"
                                    length={20}
                                    isActive={hoveredColor === 'text-muted-foreground'}
                                    isDimmed={hoveredColor !== null && hoveredColor !== 'text-muted-foreground'}
                                    onMouseEnter={() => handleColorHoverChange('text-muted-foreground')}
                                    onMouseLeave={() => handleColorHoverChange(null)}
                                />
                            </div>
                        )}
                    </span>
                    {/* Active: Trigger Anatomy & Color */}
                    {activeTab === 'tab1' && (
                        <>
                            {showLabels && (
                                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <AnatomyLabel
                                            label="활성 트리거"
                                            direction="bottom"
                                            length={24}
                                            isActive={hoveredPart === 'ActiveTrigger'}
                                            isDimmed={hoveredPart !== null && hoveredPart !== 'ActiveTrigger'}
                                            onMouseEnter={() => handleHoverChange('ActiveTrigger')}
                                            onMouseLeave={() => handleHoverChange(null)}
                                        />
                                    </div>
                                </div>
                            )}
                            {showColorInfo && (
                                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2">
                                    <ColorLabel
                                        tokenName="트리거 배경"
                                        colorValue={colorTokenData['bg-background'].hsl}
                                        direction="bottom"
                                        length={24}
                                        isActive={hoveredColor === 'bg-background'}
                                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                                        onMouseEnter={() => handleColorHoverChange('bg-background')}
                                        onMouseLeave={() => handleColorHoverChange(null)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* Inactive: Trigger Anatomy */}
                    {activeTab !== 'tab1' && showLabels && (
                        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                            <div className="pointer-events-auto">
                                <AnatomyLabel
                                    label="비활성 트리거"
                                    direction="bottom"
                                    length={24}
                                    isActive={hoveredPart === 'InactiveTrigger'}
                                    isDimmed={hoveredPart !== null && hoveredPart !== 'InactiveTrigger'}
                                    onMouseEnter={() => handleHoverChange('InactiveTrigger')}
                                    onMouseLeave={() => handleHoverChange(null)}
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
                    style={{
                        outline: ((hoveredPart === 'ActiveTrigger' && activeTab === 'tab2') || (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab2')) ? '2px solid #2563eb' : ((hoveredColor === 'bg-background' && activeTab === 'tab2') ? '2px solid #7c3aed' : 'none'),
                        transition: 'outline 0s 0.2s',
                    }}
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
                    <span
                        className="relative z-10 w-full text-center rounded"
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (((hoveredColor === 'text-foreground' && activeTab === 'tab2') || (hoveredColor === 'text-muted-foreground' && activeTab !== 'tab2')) ? '2px solid #7c3aed' : 'none'),
                            transition: 'outline 0s 0.2s',
                        }}
                    >
                        탭 2
                        {/* Inactive: Text Color */}
                        {activeTab !== 'tab2' && showColorInfo && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                <ColorLabel
                                    tokenName="비활성 텍스트"
                                    colorValue={colorTokenData['text-muted-foreground'].hsl}
                                    direction="top"
                                    length={20}
                                    isActive={hoveredColor === 'text-muted-foreground'}
                                    isDimmed={hoveredColor !== null && hoveredColor !== 'text-muted-foreground'}
                                    onMouseEnter={() => handleColorHoverChange('text-muted-foreground')}
                                    onMouseLeave={() => handleColorHoverChange(null)}
                                />
                            </div>
                        )}
                        {/* Active: Label Anatomy & Color */}
                        {activeTab === 'tab2' && (
                            <>
                                {showLabels && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 20 }}>
                                        <div className="pointer-events-auto">
                                            <AnatomyLabel
                                                label="레이블"
                                                direction="top"
                                                length={20}
                                                isActive={hoveredPart === 'Label'}
                                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                                onMouseEnter={() => handleHoverChange('Label')}
                                                onMouseLeave={() => handleHoverChange(null)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {showColorInfo && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                        <ColorLabel
                                            tokenName="기본 텍스트"
                                            colorValue={colorTokenData['text-foreground'].hsl}
                                            direction="top"
                                            length={20}
                                            isActive={hoveredColor === 'text-foreground'}
                                            isDimmed={hoveredColor !== null && hoveredColor !== 'text-foreground'}
                                            onMouseEnter={() => handleColorHoverChange('text-foreground')}
                                            onMouseLeave={() => handleColorHoverChange(null)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </span>
                    {/* Active: Trigger Anatomy & Color */}
                    {activeTab === 'tab2' && (
                        <>
                            {showLabels && (
                                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <AnatomyLabel
                                            label="활성 트리거"
                                            direction="bottom"
                                            length={24}
                                            isActive={hoveredPart === 'ActiveTrigger'}
                                            isDimmed={hoveredPart !== null && hoveredPart !== 'ActiveTrigger'}
                                            onMouseEnter={() => handleHoverChange('ActiveTrigger')}
                                            onMouseLeave={() => handleHoverChange(null)}
                                        />
                                    </div>
                                </div>
                            )}
                            {showColorInfo && (
                                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2">
                                    <ColorLabel
                                        tokenName="트리거 배경"
                                        colorValue={colorTokenData['bg-background'].hsl}
                                        direction="bottom"
                                        length={24}
                                        isActive={hoveredColor === 'bg-background'}
                                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                                        onMouseEnter={() => handleColorHoverChange('bg-background')}
                                        onMouseLeave={() => handleColorHoverChange(null)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* Inactive: Trigger Anatomy */}
                    {activeTab !== 'tab2' && showLabels && (
                        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                            <div className="pointer-events-auto">
                                <AnatomyLabel
                                    label="비활성 트리거"
                                    direction="bottom"
                                    length={24}
                                    isActive={hoveredPart === 'InactiveTrigger'}
                                    isDimmed={hoveredPart !== null && hoveredPart !== 'InactiveTrigger'}
                                    onMouseEnter={() => handleHoverChange('InactiveTrigger')}
                                    onMouseLeave={() => handleHoverChange(null)}
                                />
                            </div>
                        </div>
                    )}
                </button>
            </div >

        </div >
    );
};

const AnatomyPreview: React.FC<{ componentName: string; isMeasureMode?: boolean; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null) => void }> = ({ componentName, isMeasureMode = false, showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const name = componentName.toLowerCase();

    let content = null;
    if (name === 'tabs') {
        content = <TabsAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else {
        content = (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-xl border-dashed border-2">
                <div className="mb-2">No anatomy diagram available</div>
                <div className="text-xs opacity-50">개발 노트: {componentName}에 대한 아나토미 구현 필요</div>
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
