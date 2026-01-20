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
    onMouseLeave,
    offset = 0
}: {
    label: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    length?: number;
    className?: string;
    isDimmed?: boolean;
    isActive?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    offset?: number;
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
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: `calc(100% - ${offset}px)`,
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0,
                pointerEvents: 'auto',
                transformOrigin: direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => e.stopPropagation()}
        >
            {/* The Line */}
            <motion.div
                className={cn(
                    isActive ? "bg-blue-700" : "bg-blue-600/80"
                )}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0,
                    transformOrigin: direction === 'top' ? 'top' : direction === 'bottom' ? 'bottom' : direction === 'left' ? 'left' : 'right'
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
                direction === 'top' || direction === 'left' ? "order-1" : "order-2"
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
    className,
    offset = 0,
    isTextColor = false, // New prop for text color indication
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
    offset?: number;
    isTextColor?: boolean;
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
                [direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left']: `calc(100% - ${offset}px)`,
                flexDirection: isVertical ? 'column' : 'row',
                gap: 0,
                pointerEvents: 'auto',
                transformOrigin: direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => e.stopPropagation()}
        >
            {/* The Line */}
            <motion.div
                className={cn(
                    isActive ? "bg-violet-600" : "bg-violet-500/80"
                )}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0,
                    transformOrigin: direction === 'top' ? 'top' : direction === 'bottom' ? 'bottom' : direction === 'left' ? 'left' : 'right'
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
                direction === 'top' || direction === 'left' ? "order-1" : "order-2"
            )}
                style={{ whiteSpace: 'nowrap' }}>
                {/* Color Chip - larger for text colors with 'A' icon */}
                <div
                    className={cn(
                        "rounded-sm border border-white/30 flex items-center justify-center",
                        isTextColor ? "w-4 h-4" : "w-3 h-3"
                    )}
                    style={{ backgroundColor: colorValue }}
                >
                    {isTextColor && (
                        <span className="text-white text-[9px] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">A</span>
                    )}
                </div>
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
    'text-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0 0% 100%)', usage: '활성 트리거 텍스트' },
};

const TabsAnatomy = ({ style = 'segmented', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'segmented' | 'pill' | 'line'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    // If Color Info is active, force hide Anatomy Labels to prevent overlap
    const effectiveShowLabels = showLabels && !showColorInfo;

    // Notify parent when hoveredPart changes
    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };

    // Notify parent when hoveredColor changes
    // Map internal unique keys to actual color token keys for display
    const mapToRealTokenKey = (key: string | null, currentStyle: string): string | null => {
        if (key === null) return null;
        switch (key) {
            case 'active-label-foreground':
                return currentStyle === 'pill' ? 'text-background' : 'text-foreground';
            case 'hover-label-foreground':
                return 'text-foreground';
            case 'indicator-background':
                if (currentStyle === 'line') return 'text-foreground';
                if (currentStyle === 'pill') return 'text-foreground';
                return 'bg-background';
            default:
                return key;
        }
    };

    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        // Pass the real token key to parent for color info display
        onColorHoverChange?.(mapToRealTokenKey(color, style), name);
    };

    // Style Definitions
    const containerClasses = {
        segmented: "bg-muted p-1 rounded-lg gap-1",
        pill: "bg-transparent p-0 gap-2",
        line: "bg-transparent p-0 gap-6 border-b border-border w-full justify-start rounded-none h-9"
    };

    const triggerBaseClasses = "relative flex-1 flex items-center justify-center h-9 px-3 text-sm font-medium outline-none transition-colors";

    const triggerInactiveClasses = {
        segmented: "text-muted-foreground hover:bg-muted/50 rounded-md",
        pill: "text-muted-foreground hover:bg-muted bg-transparent rounded-full",
        line: "text-muted-foreground hover:text-foreground rounded-none"
    };

    const triggerActiveClasses = {
        segmented: "text-foreground rounded-md",
        pill: "text-background rounded-full",
        line: "text-foreground rounded-none"
    };

    return (
        <div className="relative flex flex-col items-center gap-8 select-none mx-auto w-96">
            {/* Tabs List Area */}
            <div
                className={cn(
                    "relative flex items-center w-full group transition-all duration-300",
                    containerClasses[style]
                )}
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (
                        (hoveredColor === 'bg-muted' && style === 'segmented') ||
                            (hoveredColor === 'bg-muted' && (style === 'pill' || style === 'line')) // '전체 배경' 대응
                            ? '2px solid #7c3aed' : 'none'
                    ),
                    transition: 'outline 0s 0.2s',
                }}
            >
                {/* 1. Container Label - Only relevant for Segmented mainly */}
                {effectiveShowLabels && style === 'segmented' && (
                    <AnatomyLabel
                        label="컨테이너"
                        direction="left"
                        length={32}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                        onMouseEnter={() => handleHoverChange('Container')}
                        onMouseLeave={() => handleHoverChange(null)}
                        offset={0}
                    />
                )}
                {/* Container Label for Line (Border) */}
                {effectiveShowLabels && style === 'line' && (
                    <AnatomyLabel
                        label="보더 (Container)"
                        direction="bottom"
                        length={24}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                        onMouseEnter={() => handleHoverChange('Container')}
                        onMouseLeave={() => handleHoverChange(null)}
                        offset={0}
                        className="left-0"
                    />
                )}

                {/* Container Color Label - Only Segmented has bg-muted visible */}
                {showColorInfo && style === 'segmented' && (
                    <ColorLabel
                        tokenName="컨테이너 배경"
                        colorValue={colorTokenData['bg-muted'].hsl}
                        direction="left"
                        length={24}
                        isActive={hoveredColor === 'bg-muted'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                        onMouseEnter={() => handleColorHoverChange('bg-muted', '컨테이너 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
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
                        outline: (
                            (hoveredPart === 'ActiveTrigger' && activeTab === 'tab1') ||
                            (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab1')
                        ) ? '2px solid #2563eb' : (
                            (activeTab === 'tab1' && hoveredColor === 'indicator-background') ? '2px solid #7c3aed' : 'none'
                        ),
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
                                    isAnimating ? "shadow-[0_0_3px_rgba(0,0,0,0.1)]" : "hover:shadow-[0_0_3px_rgba(0,0,0,0.1)]"
                                ),
                                style === 'pill' && cn(
                                    "bg-foreground rounded-full",
                                    isAnimating ? "shadow-sm" : "hover:shadow-sm"
                                ),
                                style === 'line' && "bg-transparent border-b-2 border-foreground bottom-[-1px] rounded-none inset-x-0 h-full"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onLayoutAnimationStart={() => setIsAnimating(true)}
                            onLayoutAnimationComplete={() => setIsAnimating(false)}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10 w-full inline-block text-center",
                            style === 'pill' && activeTab === 'tab1' && "text-background"
                        )}
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (
                                (
                                    (hoveredColor === 'active-label-foreground' && activeTab === 'tab1' && style !== 'pill') ||
                                    (hoveredColor === 'text-background' && activeTab === 'tab1' && style === 'pill') ||
                                    (hoveredColor === 'text-muted-foreground' && activeTab !== 'tab1')
                                ) ? '2px solid #7c3aed' : 'none'
                            ),
                        }}
                    >
                        {activeTab === 'tab1' ? 'Active Tab' : 'Inactive Tab'}
                        {/* Label annotation */}
                        {activeTab === 'tab1' && effectiveShowLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                onMouseEnter={() => handleHoverChange('Label')}
                                onMouseLeave={() => handleHoverChange(null)}
                            />
                        )}
                        {/* Active Label Color Label */}
                        {showColorInfo && activeTab === 'tab1' && (
                            <ColorLabel
                                tokenName="활성 탭 레이블"
                                colorValue={style === 'pill' ? colorTokenData['text-background'].hsl : colorTokenData['text-foreground'].hsl}
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredColor === (style === 'pill' ? 'text-background' : 'active-label-foreground')}
                                isDimmed={hoveredColor !== null && hoveredColor !== (style === 'pill' ? 'text-background' : 'active-label-foreground')}
                                onMouseEnter={() => handleColorHoverChange(style === 'pill' ? 'text-background' : 'active-label-foreground', '활성 탭 레이블')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                        {/* Inactive Content Color Label for Tab 1 */}
                        {showColorInfo && activeTab !== 'tab1' && (
                            <ColorLabel
                                tokenName="비활성 탭 레이블"
                                colorValue={colorTokenData['text-muted-foreground'].hsl}
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredColor === 'text-muted-foreground'}
                                isDimmed={hoveredColor !== null && hoveredColor !== 'text-muted-foreground'}
                                onMouseEnter={() => handleColorHoverChange('text-muted-foreground', '비활성 탭 레이블')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                    </span>
                    {/* Active Trigger Label - outside span for button-relative positioning */}
                    {activeTab === 'tab1' && effectiveShowLabels && (
                        <AnatomyLabel
                            label="인디케이터"
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredPart === 'ActiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'ActiveTrigger'}
                            onMouseEnter={() => handleHoverChange('ActiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    )}
                    {/* Active Indicator Color Label */}
                    {showColorInfo && activeTab === 'tab1' && (
                        <ColorLabel
                            tokenName="인디케이터 배경"
                            colorValue={style === 'line' ? colorTokenData['text-foreground'].hsl : (style === 'pill' ? colorTokenData['text-foreground'].hsl : colorTokenData['bg-background'].hsl)}
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredColor === 'indicator-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'indicator-background'}
                            onMouseEnter={() => handleColorHoverChange('indicator-background', '인디케이터 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                    {/* Inactive Tab Label for Tab 1 when Tab 2 is active */}
                    {activeTab !== 'tab1' && effectiveShowLabels && (
                        <AnatomyLabel
                            label="비활성 탭"
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredPart === 'InactiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'InactiveTrigger'}
                            onMouseEnter={() => handleHoverChange('InactiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
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
                        outline: (
                            (hoveredPart === 'ActiveTrigger' && activeTab === 'tab2') ||
                            (hoveredPart === 'InactiveTrigger' && activeTab !== 'tab2')
                        ) ? '2px solid #2563eb' : (
                            (activeTab === 'tab2' && hoveredColor === 'indicator-background') ? '2px solid #7c3aed' : 'none'
                        ),
                        transition: 'outline 0s 0.2s',
                    }}
                >
                    {activeTab === 'tab2' && (
                        <motion.div
                            layoutId="activeTab"
                            className={cn(
                                "absolute inset-0 transition-shadow duration-200",
                                style === 'segmented' && cn(
                                    "bg-background rounded-md",
                                    isAnimating ? "shadow-[0_0_3px_rgba(0,0,0,0.1)]" : "hover:shadow-[0_0_3px_rgba(0,0,0,0.1)]"
                                ),
                                style === 'pill' && cn(
                                    "bg-foreground rounded-full",
                                    isAnimating ? "shadow-sm" : "hover:shadow-sm"
                                ),
                                style === 'line' && "bg-transparent border-b-2 border-foreground bottom-[-1px] rounded-none inset-x-0 h-full"
                            )}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onLayoutAnimationStart={() => setIsAnimating(true)}
                            onLayoutAnimationComplete={() => setIsAnimating(false)}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10 w-full inline-block text-center",
                            style === 'pill' && activeTab === 'tab2' && "text-background"
                        )}
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (
                                (
                                    (hoveredColor === 'active-label-foreground' && activeTab === 'tab2' && style !== 'pill') ||
                                    (hoveredColor === 'text-background' && activeTab === 'tab2' && style === 'pill') ||
                                    (hoveredColor === 'text-muted-foreground' && activeTab !== 'tab2')
                                ) ? '2px solid #7c3aed' : 'none'
                            ),
                        }}
                    >
                        {activeTab === 'tab2' ? 'Active Tab' : 'Inactive Tab'}
                        {/* Label annotation */}
                        {activeTab === 'tab2' && effectiveShowLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                onMouseEnter={() => handleHoverChange('Label')}
                                onMouseLeave={() => handleHoverChange(null)}
                            />
                        )}
                        {/* Active Label Color Label */}
                        {showColorInfo && activeTab === 'tab2' && (
                            <ColorLabel
                                tokenName="활성 탭 레이블"
                                colorValue={style === 'pill' ? colorTokenData['text-background'].hsl : colorTokenData['text-foreground'].hsl}
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredColor === (style === 'pill' ? 'text-background' : 'active-label-foreground')}
                                isDimmed={hoveredColor !== null && hoveredColor !== (style === 'pill' ? 'text-background' : 'active-label-foreground')}
                                onMouseEnter={() => handleColorHoverChange(style === 'pill' ? 'text-background' : 'active-label-foreground', '활성 탭 레이블')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                        {/* Inactive Content Color Label for Tab 2 */}
                        {showColorInfo && activeTab !== 'tab2' && (
                            <ColorLabel
                                tokenName="비활성 탭 레이블"
                                colorValue={colorTokenData['text-muted-foreground'].hsl}
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredColor === 'text-muted-foreground'}
                                isDimmed={hoveredColor !== null && hoveredColor !== 'text-muted-foreground'}
                                onMouseEnter={() => handleColorHoverChange('text-muted-foreground', '비활성 탭 레이블')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                    </span>
                    {/* Active Trigger Label - outside span for button-relative positioning */}
                    {activeTab === 'tab2' && effectiveShowLabels && (
                        <AnatomyLabel
                            label="인디케이터"
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredPart === 'ActiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'ActiveTrigger'}
                            onMouseEnter={() => handleHoverChange('ActiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    )}
                    {/* Active Indicator Color Label for Tab 2 */}
                    {showColorInfo && activeTab === 'tab2' && (
                        <ColorLabel
                            tokenName="인디케이터 배경"
                            colorValue={style === 'line' ? colorTokenData['text-foreground'].hsl : (style === 'pill' ? colorTokenData['text-foreground'].hsl : colorTokenData['bg-background'].hsl)}
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredColor === 'indicator-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'indicator-background'}
                            onMouseEnter={() => handleColorHoverChange('indicator-background', '인디케이터 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                    {/* Inactive Tab Label for Tab 2 when Tab 1 is active */}
                    {activeTab !== 'tab2' && effectiveShowLabels && (
                        <AnatomyLabel
                            label="비활성 탭"
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredPart === 'InactiveTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'InactiveTrigger'}
                            onMouseEnter={() => handleHoverChange('InactiveTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    )}
                </button>

                {/* Hover Tab (For All Styles) */}
                <button
                    className={cn(
                        triggerBaseClasses,
                        triggerInactiveClasses[style],
                        style === 'pill' && "bg-muted", // Force hover background for Pill
                        style === 'segmented' && "bg-muted/50", // Force hover background for Segmented
                        style === 'line' && "text-foreground" // Force hover text color for Line
                    )}
                    style={{
                        pointerEvents: 'none',
                        outline: hoveredPart === 'HoverTrigger' ? '2px solid #2563eb' : 'none',
                    }}
                    tabIndex={-1}
                >
                    <span
                        className="relative z-10 w-full inline-block text-center text-foreground"
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (
                                hoveredColor === 'hover-label-foreground' ? '2px solid #7c3aed' : 'none'
                            ),
                        }}
                    >
                        Hover Tab
                        {/* Hover Text Color Label */}
                        {showColorInfo && (
                            <ColorLabel
                                tokenName="호버 탭 레이블"
                                colorValue={colorTokenData['text-foreground'].hsl}
                                direction="top"
                                length={32}
                                offset={0}
                                isActive={hoveredColor === 'hover-label-foreground'}
                                isDimmed={hoveredColor !== null && hoveredColor !== 'hover-label-foreground'}
                                onMouseEnter={() => handleColorHoverChange('hover-label-foreground', '호버 탭 레이블')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                    </span>

                    {/* Hover Trigger Structural Label */}
                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="호버 탭"
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredPart === 'HoverTrigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'HoverTrigger'}
                            onMouseEnter={() => handleHoverChange('HoverTrigger')}
                            onMouseLeave={() => handleHoverChange(null)}
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
            {isMeasureMode && <MeasureOverlay targetRef={containerRef as React.RefObject<HTMLElement>} key={style} />}
        </div>
    );
};

export default AnatomyPreview;
