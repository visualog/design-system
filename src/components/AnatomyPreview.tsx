import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import MeasureOverlay from '@/components/ui/MeasureOverlay';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import ColorSwatch from './ui/ColorSwatch';
import { colorTokenData } from './anatomy-meta';

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
    fallbackColor, // New prop for hex fallback
    direction = 'top',
    length = 24,
    isActive = false,
    isDimmed = false,
    onMouseEnter,
    onMouseLeave,
    className,
    offset = 0,
    isTextColor = false,
}: {
    tokenName: string;
    colorValue: string;
    fallbackColor?: string;
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
                className={cn(isActive ? "bg-violet-600" : "bg-violet-500/80")}
                style={{
                    width: isVertical ? 1 : length,
                    height: isVertical ? length : 1,
                    order: direction === 'top' || direction === 'left' ? 2 : 0,
                    transformOrigin: direction === 'top' ? 'top' : direction === 'bottom' ? 'bottom' : direction === 'left' ? 'left' : 'right'
                }}
                initial={{ scaleX: isVertical ? 1 : 0, scaleY: isVertical ? 0 : 1 }}
                animate={{ scaleX: isVertical ? 1 : (isActive ? 1 : 0), scaleY: isVertical ? (isActive ? 1 : 0) : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* The Color Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-white text-[10px] font-medium whitespace-nowrap transition-colors duration-300"
                style={{
                    backgroundColor: isActive ? 'var(--color-violet-600)' : 'var(--color-violet-500)',
                    whiteSpace: 'nowrap'
                }}>
                <ColorSwatch
                    colorValue={colorValue}
                    fallbackColor={fallbackColor}
                    isTextColor={isTextColor}
                    size={isTextColor ? 'sm' : 'xs'}
                />
                <span>{tokenName}</span>
            </div>
        </div>
    );
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
            case 'hover-bg':
                return 'bg-muted';
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
                            (hoveredColor === 'bg-muted' && (style === 'pill' || style === 'line')) || // '전체 배경' 대응
                            (hoveredColor === 'bg-transparent' && (style === 'pill' || style === 'line')) // Pill & Line Style Transparent Background
                            ? '2px solid #7c3aed' : 'none'
                    ),
                    transition: 'outline 0s 0.2s',
                }}
            >
                {/* 1. Container Label - relevant for Segmented and Pill */}
                {effectiveShowLabels && (style === 'segmented' || style === 'pill') && (
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

                {/* Container Color Label - Segmented, Pill, and Line styles */}
                {showColorInfo && (style === 'segmented' || style === 'pill' || style === 'line') && (
                    <ColorLabel
                        tokenName="컨테이너 배경"
                        colorValue={(style === 'pill' || style === 'line') ? 'transparent' : colorTokenData['bg-muted'].hsl}
                        fallbackColor={(style === 'pill' || style === 'line') ? 'transparent' : colorTokenData['bg-muted'].hex}
                        direction="left"
                        length={24}
                        isActive={hoveredColor === ((style === 'pill' || style === 'line') ? 'bg-transparent' : 'bg-muted')}
                        isDimmed={hoveredColor !== null && hoveredColor !== ((style === 'pill' || style === 'line') ? 'bg-transparent' : 'bg-muted')}
                        onMouseEnter={() => handleColorHoverChange((style === 'pill' || style === 'line') ? 'bg-transparent' : 'bg-muted', '컨테이너 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}
                {/* Container Border Color Label - Only Line Style for now */}
                {showColorInfo && style === 'line' && (
                    <ColorLabel
                        tokenName="보더"
                        colorValue={colorTokenData['border-border'].hsl}
                        direction="right"
                        length={32}
                        isActive={hoveredColor === 'border-border'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'border-border'}
                        onMouseEnter={() => handleColorHoverChange('border-border', '보더')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                        offset={0}
                        className="!top-auto bottom-0 translate-y-1/2"
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
                            label={style === 'line' ? '활성 탭 보더' : '활성 탭 배경'}
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
                            tokenName={style === 'line' ? '활성 탭 보더' : '활성 탭 배경'}
                            colorValue={style === 'line' ? colorTokenData['text-foreground'].hsl : (style === 'pill' ? colorTokenData['text-foreground'].hsl : colorTokenData['bg-background'].hsl)}
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredColor === 'indicator-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'indicator-background'}
                            onMouseEnter={() => handleColorHoverChange('indicator-background', style === 'line' ? '활성 탭 보더' : '활성 탭 배경')}
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
                                fallbackColor={style === 'pill' ? colorTokenData['text-background'].hex : colorTokenData['text-foreground'].hex}
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
                                fallbackColor={colorTokenData['text-muted-foreground'].hex}
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
                            label={style === 'line' ? '활성 탭 보더' : '활성 탭 배경'}
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
                            tokenName={style === 'line' ? '활성 탭 보더' : '활성 탭 배경'}
                            colorValue={style === 'line' ? colorTokenData['text-foreground'].hsl : (style === 'pill' ? colorTokenData['text-foreground'].hsl : colorTokenData['bg-background'].hsl)}
                            fallbackColor={style === 'line' ? colorTokenData['text-foreground'].hex : (style === 'pill' ? colorTokenData['text-foreground'].hex : colorTokenData['bg-background'].hex)}
                            direction="bottom"
                            length={24}
                            offset={0}
                            isActive={hoveredColor === 'indicator-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'indicator-background'}
                            onMouseEnter={() => handleColorHoverChange('indicator-background', style === 'line' ? '활성 탭 보더' : '활성 탭 배경')}
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

                    {/* Hover Trigger Color Label - Background */}
                    {showColorInfo && (
                        <ColorLabel
                            tokenName="호버 탭 배경"
                            colorValue={colorTokenData['bg-muted'].hsl}
                            direction="bottom"
                            length={24}
                            isActive={hoveredColor === 'hover-bg'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'hover-bg'}
                            onMouseEnter={() => handleColorHoverChange('hover-bg', '호버 탭 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
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
    onColorHoverChange?: (color: string | null, name?: string) => void;
}

// Button Anatomy Component
const ButtonAnatomy = ({ style = 'default', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: string; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    // If Color Info is active, force hide Anatomy Labels to prevent overlap
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };

    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    // Helper to get token keys based on variant
    const resolveButtonStyle = (variant: string): 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' => {
        switch (variant) {
            case 'secondary':
            case 'outline':
            case 'ghost':
            case 'link':
            case 'destructive':
                return variant;
            default:
                return 'default';
        }
    };

    const buttonStyle = resolveButtonStyle(style);

    const getTokenKeys = (variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive') => {
        switch (variant) {
            case 'secondary':
                return { bg: 'bg-secondary', text: 'text-secondary-foreground' };
            case 'outline':
                return { bg: 'bg-background', text: 'text-accent-foreground', border: 'border-input' };
            case 'ghost':
                return { bg: 'bg-transparent', text: 'text-accent-foreground' };
            case 'link':
                return { bg: 'bg-transparent', text: 'text-primary' };
            case 'destructive':
                return { bg: 'bg-destructive', text: 'text-destructive-foreground' };
            default: // default/primary
                return { bg: 'bg-primary', text: 'text-primary-foreground' };
        }
    };

    const tokens = getTokenKeys(buttonStyle);

    return (
        <div className="relative flex flex-col items-center gap-8 select-none mx-auto w-96 justify-center min-h-[120px]">
            <div className="relative group inline-flex">
                {/* Container Label */}
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="컨테이너"
                        direction="left"
                        length={32}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                        onMouseEnter={() => handleHoverChange('Container')}
                        onMouseLeave={() => handleHoverChange(null)}
                    />
                )}
                {/* Container Color Label */}
                {showColorInfo && (
                    <ColorLabel
                        tokenName="컨테이너 배경"
                        colorValue={colorTokenData[tokens.bg]?.hsl || 'transparent'}
                        fallbackColor={colorTokenData[tokens.bg]?.hex || 'transparent'}
                        direction="left"
                        length={32}
                        isActive={hoveredColor === tokens.bg}
                        isDimmed={hoveredColor !== null && hoveredColor !== tokens.bg}
                        onMouseEnter={() => handleColorHoverChange(tokens.bg, '컨테이너 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}

                <Button
                    variant={buttonStyle}
                    className="relative"
                    style={{
                        outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (
                            (hoveredColor === tokens.bg) ? '2px solid #7c3aed' : 'none'
                        ),
                        transition: 'outline 0s 0.2s',
                    }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('Container');
                        if (showColorInfo) handleColorHoverChange(tokens.bg, '컨테이너 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    {/* Icon Wrapper for Anatomy */}
                    <span
                        className="relative"
                        style={{
                            outline: hoveredPart === 'Icon' ? '2px solid #2563eb' : (
                                (hoveredColor === tokens.text) ? '2px solid #7c3aed' : 'none'
                            ),
                        }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (effectiveShowLabels) handleHoverChange('Icon');
                            if (showColorInfo) handleColorHoverChange(tokens.text, '아이콘 컬러');
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            handleHoverChange(null);
                            handleColorHoverChange(null);
                        }}
                    >
                        <Search className="w-4 h-4" />
                        {/* Icon Label */}
                        {effectiveShowLabels && (
                            <AnatomyLabel
                                label="아이콘"
                                direction="bottom"
                                length={24}
                                isActive={hoveredPart === 'Icon'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Icon'}
                                className="left-1/2 -translate-x-1/2"
                            />
                        )}
                    </span>

                    {/* Text Wrapper for Anatomy */}
                    <span
                        className="relative"
                        style={{
                            outline: hoveredPart === 'Label' ? '2px solid #2563eb' : (
                                (hoveredColor === tokens.text) ? '2px solid #7c3aed' : 'none'
                            ),
                        }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (effectiveShowLabels) handleHoverChange('Label');
                            if (showColorInfo) handleColorHoverChange(tokens.text, '텍스트 컬러');
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            handleHoverChange(null);
                            handleColorHoverChange(null);
                        }}
                    >
                        Button
                        {/* Label Anatomy */}
                        {effectiveShowLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={32}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                                className="left-1/2 -translate-x-1/2"
                            />
                        )}
                        {/* Text Color Label */}
                        {showColorInfo && (
                            <ColorLabel
                                tokenName="텍스트 컬러"
                                colorValue={colorTokenData[tokens.text]?.hsl || '#000000'}
                                fallbackColor={colorTokenData[tokens.text]?.hex || '#000000'}
                                direction="top"
                                length={32}
                                isActive={hoveredColor === tokens.text}
                                isDimmed={hoveredColor !== null && hoveredColor !== tokens.text}
                                className="left-1/2 -translate-x-1/2"
                                isTextColor={true}
                            />
                        )}
                    </span>
                </Button>
            </div>
        </div>
    );
};

const SwitchAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };

    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[180px] w-96 mx-auto">
            <div className="relative">
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="트랙"
                        direction="left"
                        length={28}
                        isActive={hoveredPart === 'Track'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Track'}
                        onMouseEnter={() => handleHoverChange('Track')}
                        onMouseLeave={() => handleHoverChange(null)}
                    />
                )}
                {showColorInfo && (
                    <ColorLabel
                        tokenName="트랙 배경"
                        colorValue={colorTokenData['bg-primary'].hsl}
                        fallbackColor={colorTokenData['bg-primary'].hex}
                        direction="left"
                        length={28}
                        isActive={hoveredColor === 'bg-primary'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-primary'}
                        onMouseEnter={() => handleColorHoverChange('bg-primary', '트랙 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}

                <div
                    className="relative w-14 h-8 rounded-full bg-primary p-1"
                    style={{
                        outline: hoveredPart === 'Track' ? '2px solid #2563eb' : (hoveredColor === 'bg-primary' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('Track');
                        if (showColorInfo) handleColorHoverChange('bg-primary', '트랙 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <div
                        className="absolute top-1 left-1 h-6 w-6 translate-x-6 rounded-full bg-background shadow-sm"
                        style={{
                            outline: hoveredPart === 'Thumb' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none'),
                        }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (effectiveShowLabels) handleHoverChange('Thumb');
                            if (showColorInfo) handleColorHoverChange('bg-background', '썸 배경');
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            handleHoverChange(null);
                            handleColorHoverChange(null);
                        }}
                    >
                        {effectiveShowLabels && (
                            <AnatomyLabel
                                label="썸"
                                direction="bottom"
                                length={24}
                                isActive={hoveredPart === 'Thumb'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Thumb'}
                                className="left-1/2 -translate-x-1/2"
                            />
                        )}
                        {showColorInfo && (
                            <ColorLabel
                                tokenName="썸 배경"
                                colorValue={colorTokenData['bg-background'].hsl}
                                fallbackColor={colorTokenData['bg-background'].hex}
                                direction="bottom"
                                length={24}
                                isActive={hoveredColor === 'bg-background'}
                                isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                                onMouseEnter={() => handleColorHoverChange('bg-background', '썸 배경')}
                                onMouseLeave={() => handleColorHoverChange(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropdownMenuAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex flex-col items-center justify-center gap-3 min-h-[240px] w-96 mx-auto">
            <div className="relative">
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="트리거"
                        direction="top"
                        length={24}
                        isActive={hoveredPart === 'Trigger'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'}
                        onMouseEnter={() => handleHoverChange('Trigger')}
                        onMouseLeave={() => handleHoverChange(null)}
                    />
                )}
                <button
                    className="h-9 min-w-[160px] rounded-md border border-input bg-background px-3 text-sm flex items-center justify-between gap-2"
                    style={{
                        outline: hoveredPart === 'Trigger' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('Trigger');
                        if (showColorInfo) handleColorHoverChange('bg-background', '트리거 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <span className="text-foreground">Open Menu</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {showColorInfo && (
                    <ColorLabel
                        tokenName="트리거 배경"
                        colorValue={colorTokenData['bg-background'].hsl}
                        fallbackColor={colorTokenData['bg-background'].hex}
                        direction="top"
                        length={24}
                        isActive={hoveredColor === 'bg-background'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                        onMouseEnter={() => handleColorHoverChange('bg-background', '트리거 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}
            </div>

            <div
                className="relative w-[210px] rounded-md border border-border bg-background p-1 shadow-md"
                style={{
                    outline: hoveredPart === 'MenuSurface' ? '2px solid #2563eb' : (hoveredColor === 'menu-surface' ? '2px solid #7c3aed' : 'none'),
                }}
                onMouseEnter={() => {
                    if (effectiveShowLabels) handleHoverChange('MenuSurface');
                    if (showColorInfo) handleColorHoverChange('menu-surface', '메뉴 배경');
                }}
                onMouseLeave={() => {
                    handleHoverChange(null);
                    handleColorHoverChange(null);
                }}
            >
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="메뉴 패널"
                        direction="left"
                        length={24}
                        isActive={hoveredPart === 'MenuSurface'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'MenuSurface'}
                        onMouseEnter={() => handleHoverChange('MenuSurface')}
                        onMouseLeave={() => handleHoverChange(null)}
                    />
                )}
                {showColorInfo && (
                    <ColorLabel
                        tokenName="메뉴 배경"
                        colorValue={colorTokenData['bg-background'].hsl}
                        fallbackColor={colorTokenData['bg-background'].hex}
                        direction="left"
                        length={24}
                        isActive={hoveredColor === 'menu-surface'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'menu-surface'}
                        onMouseEnter={() => handleColorHoverChange('menu-surface', '메뉴 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}

                <div className="rounded-sm px-2 py-1.5 text-sm text-foreground">Profile</div>
                <div
                    className="rounded-sm px-2 py-1.5 text-sm text-foreground bg-muted/80"
                    style={{
                        outline: hoveredPart === 'MenuItem' ? '2px solid #2563eb' : (hoveredColor === 'bg-muted' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('MenuItem');
                        if (showColorInfo) handleColorHoverChange('bg-muted', '메뉴 아이템 배경');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    Settings
                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="메뉴 아이템"
                            direction="right"
                            length={24}
                            isActive={hoveredPart === 'MenuItem'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'MenuItem'}
                        />
                    )}
                    {showColorInfo && (
                        <ColorLabel
                            tokenName="메뉴 아이템 배경"
                            colorValue={colorTokenData['bg-muted'].hsl}
                            fallbackColor={colorTokenData['bg-muted'].hex}
                            direction="right"
                            length={24}
                            isActive={hoveredColor === 'bg-muted'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                            onMouseEnter={() => handleColorHoverChange('bg-muted', '메뉴 아이템 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                </div>
                <div className="rounded-sm px-2 py-1.5 text-sm text-foreground">Logout</div>
            </div>
        </div>
    );
};

const TableAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[250px] w-full max-w-[520px] mx-auto">
            <div
                className="relative w-full rounded-xl border border-border bg-background overflow-hidden"
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'border-border' ? '2px solid #7c3aed' : 'none'),
                }}
                onMouseEnter={() => {
                    if (effectiveShowLabels) handleHoverChange('Container');
                    if (showColorInfo) handleColorHoverChange('border-border', '테이블 외곽선');
                }}
                onMouseLeave={() => {
                    handleHoverChange(null);
                    handleColorHoverChange(null);
                }}
            >
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="테이블 컨테이너"
                        direction="left"
                        length={24}
                        isActive={hoveredPart === 'Container'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                    />
                )}

                <div
                    className="grid grid-cols-3 bg-muted/50 border-b border-border"
                    style={{
                        outline: hoveredPart === 'HeaderCell' ? '2px solid #2563eb' : (hoveredColor === 'bg-muted' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('HeaderCell');
                        if (showColorInfo) handleColorHoverChange('bg-muted', '헤더 배경');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <div className="px-4 py-3 text-sm font-semibold">이름</div>
                    <div className="px-4 py-3 text-sm font-semibold">타입</div>
                    <div className="px-4 py-3 text-sm font-semibold">설명</div>
                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="헤더 셀"
                            direction="top"
                            length={24}
                            isActive={hoveredPart === 'HeaderCell'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'HeaderCell'}
                        />
                    )}
                    {showColorInfo && (
                        <ColorLabel
                            tokenName="헤더 배경"
                            colorValue={colorTokenData['bg-muted'].hsl}
                            fallbackColor={colorTokenData['bg-muted'].hex}
                            direction="top"
                            length={24}
                            isActive={hoveredColor === 'bg-muted'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                            onMouseEnter={() => handleColorHoverChange('bg-muted', '헤더 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                </div>

                <div className="grid grid-cols-3 border-b border-border">
                    <div className="px-4 py-3 text-sm font-mono">variant</div>
                    <div className="px-4 py-3 text-sm text-muted-foreground">'default'</div>
                    <div className="px-4 py-3 text-sm text-muted-foreground">시각 스타일</div>
                </div>
                <div
                    className="grid grid-cols-3"
                    style={{
                        outline: hoveredPart === 'Cell' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('Cell');
                        if (showColorInfo) handleColorHoverChange('bg-background', '본문 셀 배경');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <div className="px-4 py-3 text-sm font-mono">size</div>
                    <div className="px-4 py-3 text-sm text-muted-foreground">'default'</div>
                    <div className="px-4 py-3 text-sm text-muted-foreground">크기</div>
                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="본문 셀"
                            direction="bottom"
                            length={24}
                            isActive={hoveredPart === 'Cell'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Cell'}
                        />
                    )}
                    {showColorInfo && (
                        <ColorLabel
                            tokenName="본문 셀 배경"
                            colorValue={colorTokenData['bg-background'].hsl}
                            fallbackColor={colorTokenData['bg-background'].hex}
                            direction="bottom"
                            length={24}
                            isActive={hoveredColor === 'bg-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                            onMouseEnter={() => handleColorHoverChange('bg-background', '본문 셀 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const SmartFilterDropdownAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[180px] w-full max-w-[520px] mx-auto">
            <div className="relative flex items-center gap-2 w-full max-w-[420px]">
                <button
                    className="h-9 w-[150px] rounded-md border border-input bg-background px-3 text-sm flex items-center justify-between"
                    style={{
                        outline: hoveredPart === 'Trigger' ? '2px solid #2563eb' : (hoveredColor === 'filter-trigger-bg' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('Trigger');
                        if (showColorInfo) handleColorHoverChange('filter-trigger-bg', '필터 트리거 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <span>Category</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                <div
                    className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground flex items-center gap-2"
                    style={{
                        outline: hoveredPart === 'SearchField' ? '2px solid #2563eb' : (hoveredColor === 'search-field-bg' ? '2px solid #7c3aed' : 'none'),
                    }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('SearchField');
                        if (showColorInfo) handleColorHoverChange('search-field-bg', '검색 필드 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>검색...</span>
                </div>

                {effectiveShowLabels && (
                    <>
                        <AnatomyLabel
                            label="필터 트리거"
                            direction="top"
                            length={24}
                            className="left-[75px] !top-auto !bottom-full translate-y-[-8px]"
                            isActive={hoveredPart === 'Trigger'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'}
                            onMouseEnter={() => handleHoverChange('Trigger')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                        <AnatomyLabel
                            label="검색 필드"
                            direction="top"
                            length={24}
                            className="left-[280px] !top-auto !bottom-full translate-y-[-8px]"
                            isActive={hoveredPart === 'SearchField'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'SearchField'}
                            onMouseEnter={() => handleHoverChange('SearchField')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    </>
                )}

                {showColorInfo && (
                    <>
                        <ColorLabel
                            tokenName="필터 트리거 배경"
                            colorValue={colorTokenData['bg-background'].hsl}
                            fallbackColor={colorTokenData['bg-background'].hex}
                            direction="bottom"
                            length={20}
                            className="left-[75px] !top-full translate-y-[8px]"
                            isActive={hoveredColor === 'filter-trigger-bg'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'filter-trigger-bg'}
                            onMouseEnter={() => handleColorHoverChange('filter-trigger-bg', '필터 트리거 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                        <ColorLabel
                            tokenName="검색 필드 배경"
                            colorValue={colorTokenData['bg-background'].hsl}
                            fallbackColor={colorTokenData['bg-background'].hex}
                            direction="bottom"
                            length={20}
                            className="left-[280px] !top-full translate-y-[8px]"
                            isActive={hoveredColor === 'search-field-bg'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'search-field-bg'}
                            onMouseEnter={() => handleColorHoverChange('search-field-bg', '검색 필드 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const InputAnatomy = ({ style = 'default', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'default' | 'disabled' | 'with-label'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const isDisabled = style === 'disabled';
    const withLabel = style === 'with-label';

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[220px] w-96 mx-auto">
            <div className="relative flex flex-col gap-2 w-[300px]">
                {withLabel && (
                    <div
                        className="relative text-sm font-medium text-foreground w-fit"
                        style={{ outline: hoveredPart === 'Label' ? '2px solid #2563eb' : 'none' }}
                        onMouseEnter={() => handleHoverChange('Label')}
                        onMouseLeave={() => handleHoverChange(null)}
                    >
                        Email
                        {effectiveShowLabels && (
                            <AnatomyLabel
                                label="레이블"
                                direction="top"
                                length={20}
                                isActive={hoveredPart === 'Label'}
                                isDimmed={hoveredPart !== null && hoveredPart !== 'Label'}
                            />
                        )}
                    </div>
                )}

                <div
                    className={cn(
                        "relative h-10 rounded-md border border-input bg-background px-3 text-sm flex items-center",
                        isDisabled && "opacity-60"
                    )}
                    style={{ outline: hoveredPart === 'Field' ? '2px solid #2563eb' : (hoveredColor === 'input-field-bg' ? '2px solid #7c3aed' : 'none') }}
                    onMouseEnter={() => {
                        if (effectiveShowLabels) handleHoverChange('Field');
                        if (showColorInfo) handleColorHoverChange('input-field-bg', '입력 필드 배경');
                    }}
                    onMouseLeave={() => {
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    <span
                        className="text-muted-foreground"
                        style={{ outline: hoveredPart === 'Placeholder' ? '2px solid #2563eb' : (hoveredColor === 'text-muted-foreground' ? '2px solid #7c3aed' : 'none') }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (effectiveShowLabels) handleHoverChange('Placeholder');
                            if (showColorInfo) handleColorHoverChange('text-muted-foreground', '플레이스홀더 텍스트');
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            handleHoverChange(null);
                            handleColorHoverChange(null);
                        }}
                    >
                        user@example.com
                    </span>

                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="입력 필드"
                            direction="left"
                            length={20}
                            isActive={hoveredPart === 'Field'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Field'}
                        />
                    )}
                    {effectiveShowLabels && (
                        <AnatomyLabel
                            label="플레이스홀더"
                            direction="bottom"
                            length={20}
                            isActive={hoveredPart === 'Placeholder'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Placeholder'}
                        />
                    )}
                    {showColorInfo && (
                        <ColorLabel
                            tokenName="입력 필드 배경"
                            colorValue={colorTokenData['bg-background'].hsl}
                            fallbackColor={colorTokenData['bg-background'].hex}
                            direction="left"
                            length={20}
                            isActive={hoveredColor === 'input-field-bg'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'input-field-bg'}
                            onMouseEnter={() => handleColorHoverChange('input-field-bg', '입력 필드 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const CardAnatomy = ({ style = 'basic', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'basic' | 'with-footer'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const withFooter = style === 'with-footer';

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[280px] w-full max-w-[520px] mx-auto">
            <div
                className="relative w-[360px] rounded-xl border border-border bg-background p-5 flex flex-col gap-4"
                style={{ outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => {
                    if (effectiveShowLabels) handleHoverChange('Container');
                    if (showColorInfo) handleColorHoverChange('bg-background', '카드 배경');
                }}
                onMouseLeave={() => {
                    handleHoverChange(null);
                    handleColorHoverChange(null);
                }}
            >
                <div className="space-y-1"
                    style={{ outline: hoveredPart === 'Header' ? '2px solid #2563eb' : 'none' }}
                    onMouseEnter={(e) => { e.stopPropagation(); handleHoverChange('Header'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleHoverChange(null); }}
                >
                    <div className="text-base font-semibold text-foreground">Card Title</div>
                    <div className="text-sm text-muted-foreground">Card description text</div>
                </div>
                <div
                    className="rounded-md bg-muted/40 p-3 text-sm text-foreground"
                    style={{ outline: hoveredPart === 'Content' ? '2px solid #2563eb' : (hoveredColor === 'bg-muted' ? '2px solid #7c3aed' : 'none') }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('Content');
                        if (showColorInfo) handleColorHoverChange('bg-muted', '카드 콘텐츠 배경');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                        handleColorHoverChange(null);
                    }}
                >
                    Card content
                </div>
                {withFooter && (
                    <div
                        className="flex justify-end"
                        style={{ outline: hoveredPart === 'Footer' ? '2px solid #2563eb' : 'none' }}
                        onMouseEnter={(e) => { e.stopPropagation(); handleHoverChange('Footer'); }}
                        onMouseLeave={(e) => { e.stopPropagation(); handleHoverChange(null); }}
                    >
                        <div className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs flex items-center">Action</div>
                    </div>
                )}

                {effectiveShowLabels && (
                    <>
                        <AnatomyLabel label="카드 컨테이너" direction="left" length={20} isActive={hoveredPart === 'Container'} isDimmed={hoveredPart !== null && hoveredPart !== 'Container'} />
                        <AnatomyLabel label="헤더" direction="top" length={20} className="left-[100px]" isActive={hoveredPart === 'Header'} isDimmed={hoveredPart !== null && hoveredPart !== 'Header'} />
                        <AnatomyLabel label="본문" direction="right" length={20} className="top-[58%]" isActive={hoveredPart === 'Content'} isDimmed={hoveredPart !== null && hoveredPart !== 'Content'} />
                        {withFooter && <AnatomyLabel label="푸터" direction="bottom" length={20} className="left-[280px]" isActive={hoveredPart === 'Footer'} isDimmed={hoveredPart !== null && hoveredPart !== 'Footer'} />}
                    </>
                )}
                {showColorInfo && (
                    <ColorLabel
                        tokenName="카드 콘텐츠 배경"
                        colorValue={colorTokenData['bg-muted'].hsl}
                        fallbackColor={colorTokenData['bg-muted'].hex}
                        direction="right"
                        length={20}
                        className="top-[58%]"
                        isActive={hoveredColor === 'bg-muted'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-muted'}
                        onMouseEnter={() => handleColorHoverChange('bg-muted', '카드 콘텐츠 배경')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}
            </div>
        </div>
    );
};

const TooltipAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const handleHoverChange = (part: string | null) => { setHoveredPart(part); onHoverChange?.(part); };
    const handleColorHoverChange = (color: string | null, name?: string) => { setHoveredColor(color); onColorHoverChange?.(color, name); };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[220px] w-96 mx-auto gap-3">
            <div
                className="px-3 py-2 rounded-md bg-foreground text-background text-xs"
                style={{ outline: hoveredPart === 'Bubble' ? '2px solid #2563eb' : (hoveredColor === 'text-foreground' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => { if (effectiveShowLabels) handleHoverChange('Bubble'); if (showColorInfo) handleColorHoverChange('text-foreground', '툴팁 표면'); }}
                onMouseLeave={() => { handleHoverChange(null); handleColorHoverChange(null); }}
            >
                Tooltip text
                {effectiveShowLabels && <AnatomyLabel label="툴팁 패널" direction="top" length={20} isActive={hoveredPart === 'Bubble'} isDimmed={hoveredPart !== null && hoveredPart !== 'Bubble'} />}
            </div>
            <button
                className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                style={{ outline: hoveredPart === 'Trigger' ? '2px solid #2563eb' : 'none' }}
                onMouseEnter={() => handleHoverChange('Trigger')}
                onMouseLeave={() => handleHoverChange(null)}
            >
                Hover me
                {effectiveShowLabels && <AnatomyLabel label="트리거" direction="bottom" length={20} isActive={hoveredPart === 'Trigger'} isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'} />}
            </button>
        </div>
    );
};

const PopoverAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const handleHoverChange = (part: string | null) => { setHoveredPart(part); onHoverChange?.(part); };
    const handleColorHoverChange = (color: string | null, name?: string) => { setHoveredColor(color); onColorHoverChange?.(color, name); };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[260px] w-96 mx-auto gap-4">
            <button className="h-9 px-3 rounded-md border border-input bg-background text-sm" onMouseEnter={() => handleHoverChange('Trigger')} onMouseLeave={() => handleHoverChange(null)}>
                Open Popover
                {effectiveShowLabels && <AnatomyLabel label="트리거" direction="top" length={20} isActive={hoveredPart === 'Trigger'} isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'} />}
            </button>
            <div
                className="relative w-[220px] rounded-md border border-border bg-background p-3 shadow-md text-sm text-foreground"
                style={{ outline: hoveredPart === 'Surface' ? '2px solid #2563eb' : (hoveredColor === 'menu-surface' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => { if (effectiveShowLabels) handleHoverChange('Surface'); if (showColorInfo) handleColorHoverChange('menu-surface', '팝오버 표면'); }}
                onMouseLeave={() => { handleHoverChange(null); handleColorHoverChange(null); }}
            >
                Popover content
                {effectiveShowLabels && <AnatomyLabel label="팝오버 패널" direction="right" length={20} isActive={hoveredPart === 'Surface'} isDimmed={hoveredPart !== null && hoveredPart !== 'Surface'} />}
            </div>
        </div>
    );
};

const SheetAnatomy = ({ style = 'right', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'right' | 'left'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const isLeft = style === 'left';
    const handleHoverChange = (part: string | null) => { setHoveredPart(part); onHoverChange?.(part); };
    const handleColorHoverChange = (color: string | null, name?: string) => { setHoveredColor(color); onColorHoverChange?.(color, name); };

    return (
        <div className="relative flex items-center justify-center min-h-[280px] w-full max-w-[520px] mx-auto">
            <div className="relative w-[420px] h-[240px] rounded-xl border border-border bg-muted/30 overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div
                    className={cn("absolute top-0 h-full w-[170px] bg-background border-border p-4", isLeft ? "left-0 border-r" : "right-0 border-l")}
                    style={{ outline: hoveredPart === 'Panel' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none') }}
                    onMouseEnter={() => { if (effectiveShowLabels) handleHoverChange('Panel'); if (showColorInfo) handleColorHoverChange('bg-background', '시트 패널'); }}
                    onMouseLeave={() => { handleHoverChange(null); handleColorHoverChange(null); }}
                >
                    <div className="text-sm font-semibold">Sheet Title</div>
                    <div className="mt-2 text-xs text-muted-foreground">Sheet content</div>
                    {effectiveShowLabels && <AnatomyLabel label="시트 패널" direction={isLeft ? 'left' : 'right'} length={20} isActive={hoveredPart === 'Panel'} isDimmed={hoveredPart !== null && hoveredPart !== 'Panel'} />}
                </div>
                {effectiveShowLabels && <AnatomyLabel label="오버레이" direction="top" length={20} className="left-[120px]" isActive={hoveredPart === 'Overlay'} isDimmed={hoveredPart !== null && hoveredPart !== 'Overlay'} onMouseEnter={() => handleHoverChange('Overlay')} onMouseLeave={() => handleHoverChange(null)} />}
            </div>
        </div>
    );
};

const SeparatorAnatomy = ({ style = 'horizontal', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: 'horizontal' | 'vertical'; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const isVertical = style === 'vertical';
    const handleHoverChange = (part: string | null) => { setHoveredPart(part); onHoverChange?.(part); };
    const handleColorHoverChange = (color: string | null, name?: string) => { setHoveredColor(color); onColorHoverChange?.(color, name); };

    return (
        <div className="relative flex items-center justify-center min-h-[220px] w-96 mx-auto">
            <div
                className={cn("bg-border/80", isVertical ? "w-px h-28" : "h-px w-64")}
                style={{ outline: hoveredPart === 'Divider' ? '2px solid #2563eb' : (hoveredColor === 'border-border' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => { if (effectiveShowLabels) handleHoverChange('Divider'); if (showColorInfo) handleColorHoverChange('border-border', '구분선 색상'); }}
                onMouseLeave={() => { handleHoverChange(null); handleColorHoverChange(null); }}
            >
                {effectiveShowLabels && (
                    <AnatomyLabel
                        label="디바이더"
                        direction={isVertical ? 'right' : 'top'}
                        length={20}
                        isActive={hoveredPart === 'Divider'}
                        isDimmed={hoveredPart !== null && hoveredPart !== 'Divider'}
                    />
                )}
            </div>
        </div>
    );
};

const ClipboardAnatomy = ({ showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const handleHoverChange = (part: string | null) => { setHoveredPart(part); onHoverChange?.(part); };
    const handleColorHoverChange = (color: string | null, name?: string) => { setHoveredColor(color); onColorHoverChange?.(color, name); };

    return (
        <div className="relative flex items-center justify-center min-h-[180px] w-96 mx-auto">
            <button
                className="relative h-8 w-8 rounded-md border border-input bg-background flex items-center justify-center"
                style={{ outline: hoveredPart === 'Trigger' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => { if (effectiveShowLabels) handleHoverChange('Trigger'); if (showColorInfo) handleColorHoverChange('bg-background', '클립보드 버튼 배경'); }}
                onMouseLeave={() => { handleHoverChange(null); handleColorHoverChange(null); }}
            >
                <div
                    className="h-3.5 w-3.5 rounded-sm border border-muted-foreground"
                    style={{ outline: hoveredPart === 'Icon' ? '2px solid #2563eb' : 'none' }}
                    onMouseEnter={(e) => { e.stopPropagation(); handleHoverChange('Icon'); }}
                    onMouseLeave={(e) => { e.stopPropagation(); handleHoverChange(null); }}
                />
                {effectiveShowLabels && <AnatomyLabel label="트리거" direction="left" length={20} isActive={hoveredPart === 'Trigger'} isDimmed={hoveredPart !== null && hoveredPart !== 'Trigger'} />}
                {effectiveShowLabels && <AnatomyLabel label="아이콘" direction="bottom" length={20} isActive={hoveredPart === 'Icon'} isDimmed={hoveredPart !== null && hoveredPart !== 'Icon'} />}
            </button>
        </div>
    );
};

const FallbackAnatomy = ({ componentName, showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { componentName: string; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[280px] w-full max-w-[520px] mx-auto">
            <div
                className="relative w-[360px] rounded-xl border border-border bg-background p-5 flex flex-col gap-4"
                style={{ outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none') }}
                onMouseEnter={() => {
                    if (effectiveShowLabels) handleHoverChange('Container');
                    if (showColorInfo) handleColorHoverChange('bg-background', '컴포넌트 표면');
                }}
                onMouseLeave={() => {
                    handleHoverChange(null);
                    handleColorHoverChange(null);
                }}
            >
                <div className="text-sm font-semibold text-foreground">{componentName}</div>
                <div className="h-9 rounded-md bg-muted/50" />
                <div className="h-16 rounded-md bg-muted/40" />
                <div className="h-8 w-[120px] rounded-md bg-primary/15 self-end" />

                {effectiveShowLabels && <AnatomyLabel label="컨테이너" direction="left" length={20} isActive={hoveredPart === 'Container'} isDimmed={hoveredPart !== null && hoveredPart !== 'Container'} />}
                {showColorInfo && (
                    <ColorLabel
                        tokenName="컴포넌트 표면"
                        colorValue={colorTokenData['bg-background'].hsl}
                        fallbackColor={colorTokenData['bg-background'].hex}
                        direction="right"
                        length={20}
                        isActive={hoveredColor === 'bg-background'}
                        isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                        onMouseEnter={() => handleColorHoverChange('bg-background', '컴포넌트 표면')}
                        onMouseLeave={() => handleColorHoverChange(null)}
                    />
                )}
            </div>
        </div>
    );
};

const SidebarAnatomy = ({ style = 'expanded', showLabels = true, showColorInfo = false, onHoverChange, onColorHoverChange }: { style?: string; showLabels?: boolean; showColorInfo?: boolean; onHoverChange?: (part: string | null) => void; onColorHoverChange?: (color: string | null, name?: string) => void }) => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const effectiveShowLabels = showLabels && !showColorInfo;
    const isCollapsed = style === 'collapsed';

    const handleHoverChange = (part: string | null) => {
        setHoveredPart(part);
        onHoverChange?.(part);
    };
    const handleColorHoverChange = (color: string | null, name?: string) => {
        setHoveredColor(color);
        onColorHoverChange?.(color, name);
    };

    return (
        <div className="relative flex items-center justify-center min-h-[330px] w-full max-w-[520px] mx-auto">
            <div
                className={cn(
                    "relative h-[290px] rounded-xl border border-border bg-background flex flex-col overflow-hidden transition-all duration-200",
                    isCollapsed ? "w-[92px]" : "w-[260px]"
                )}
                style={{
                    outline: hoveredPart === 'Container' ? '2px solid #2563eb' : (hoveredColor === 'bg-background' ? '2px solid #7c3aed' : 'none'),
                }}
                onMouseEnter={() => {
                    if (effectiveShowLabels) handleHoverChange('Container');
                    if (showColorInfo) handleColorHoverChange('bg-background', '사이드바 배경');
                }}
                onMouseLeave={() => {
                    handleHoverChange(null);
                    handleColorHoverChange(null);
                }}
            >
                <div className="border-b border-border px-3 h-12 flex items-center">
                    <div className="text-sm font-black tracking-tight">MDS</div>
                </div>

                <div
                    className="p-3 flex-1 flex flex-col gap-1"
                    style={{
                        outline: hoveredPart === 'SectionGroup' ? '2px solid #2563eb' : 'none',
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('SectionGroup');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                    }}
                >
                    <div
                        className="h-9 rounded-lg bg-accent text-primary px-2 flex items-center gap-2 text-sm"
                        style={{
                            outline: hoveredPart === 'NavItem' ? '2px solid #2563eb' : (hoveredColor === 'bg-accent' ? '2px solid #7c3aed' : 'none'),
                        }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            if (effectiveShowLabels) handleHoverChange('NavItem');
                            if (showColorInfo) handleColorHoverChange('bg-accent', '활성 메뉴 배경');
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            handleHoverChange(null);
                            handleColorHoverChange(null);
                        }}
                    >
                        <div className="h-4 w-4 rounded-sm bg-primary/20" />
                        {!isCollapsed && <span>Colors</span>}
                    </div>
                    <div className="h-9 rounded-lg px-2 flex items-center gap-2 text-sm text-foreground">
                        <div className="h-4 w-4 rounded-sm bg-muted" />
                        {!isCollapsed && <span>Typography</span>}
                    </div>
                    <div className="h-9 rounded-lg px-2 flex items-center gap-2 text-sm text-foreground">
                        <div className="h-4 w-4 rounded-sm bg-muted" />
                        {!isCollapsed && <span>Components</span>}
                    </div>
                </div>

                <div
                    className="border-t border-border px-3 h-12 flex items-center gap-2"
                    style={{
                        outline: hoveredPart === 'FooterAction' ? '2px solid #2563eb' : 'none',
                    }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        if (effectiveShowLabels) handleHoverChange('FooterAction');
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        handleHoverChange(null);
                    }}
                >
                    <div className="h-7 w-7 rounded-md bg-muted" />
                    <div className="h-7 w-7 rounded-md bg-muted" />
                    <div className="h-7 w-7 rounded-md bg-muted" />
                </div>

                {effectiveShowLabels && (
                    <>
                        <AnatomyLabel
                            label="사이드바 컨테이너"
                            direction="left"
                            length={24}
                            isActive={hoveredPart === 'Container'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'Container'}
                            onMouseEnter={() => handleHoverChange('Container')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                        <AnatomyLabel
                            label="내비게이션 그룹"
                            direction="right"
                            length={24}
                            className="top-[42%]"
                            isActive={hoveredPart === 'SectionGroup'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'SectionGroup'}
                            onMouseEnter={() => handleHoverChange('SectionGroup')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                        <AnatomyLabel
                            label="활성 메뉴 아이템"
                            direction="bottom"
                            length={24}
                            className={cn(isCollapsed ? "left-[45px]" : "left-[92px]")}
                            isActive={hoveredPart === 'NavItem'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'NavItem'}
                            onMouseEnter={() => handleHoverChange('NavItem')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                        <AnatomyLabel
                            label="푸터 액션"
                            direction="right"
                            length={24}
                            className="top-[92%]"
                            isActive={hoveredPart === 'FooterAction'}
                            isDimmed={hoveredPart !== null && hoveredPart !== 'FooterAction'}
                            onMouseEnter={() => handleHoverChange('FooterAction')}
                            onMouseLeave={() => handleHoverChange(null)}
                        />
                    </>
                )}

                {showColorInfo && (
                    <>
                        <ColorLabel
                            tokenName="사이드바 배경"
                            colorValue={colorTokenData['bg-background'].hsl}
                            fallbackColor={colorTokenData['bg-background'].hex}
                            direction="left"
                            length={24}
                            isActive={hoveredColor === 'bg-background'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-background'}
                            onMouseEnter={() => handleColorHoverChange('bg-background', '사이드바 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                        <ColorLabel
                            tokenName="활성 메뉴 배경"
                            colorValue={colorTokenData['bg-accent'].hsl}
                            fallbackColor={colorTokenData['bg-accent'].hex}
                            direction="bottom"
                            length={24}
                            className={cn(isCollapsed ? "left-[45px]" : "left-[92px]")}
                            isActive={hoveredColor === 'bg-accent'}
                            isDimmed={hoveredColor !== null && hoveredColor !== 'bg-accent'}
                            onMouseEnter={() => handleColorHoverChange('bg-accent', '활성 메뉴 배경')}
                            onMouseLeave={() => handleColorHoverChange(null)}
                        />
                    </>
                )}
            </div>
        </div>
    );
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
    const resolvedTabsStyle: 'segmented' | 'pill' | 'line' = style === 'pill' || style === 'line' ? style : 'segmented';
    const resolvedInputStyle: 'default' | 'disabled' | 'with-label' = style === 'disabled' || style === 'with-label' ? style : 'default';
    const resolvedSeparatorStyle: 'horizontal' | 'vertical' = style === 'vertical' ? 'vertical' : 'horizontal';
    const resolvedSheetStyle: 'right' | 'left' = style === 'left' ? 'left' : 'right';
    const resolvedCardStyle: 'basic' | 'with-footer' = style === 'with-footer' ? 'with-footer' : 'basic';

    let content = null;
    if (name === 'tabs') {
        content = <TabsAnatomy style={resolvedTabsStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'animated-tabs') {
        content = <TabsAnatomy style={resolvedTabsStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'button') {
        content = <ButtonAnatomy style={style} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'input') {
        content = <InputAnatomy style={resolvedInputStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'card') {
        content = <CardAnatomy style={resolvedCardStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'tooltip') {
        content = <TooltipAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'popover') {
        content = <PopoverAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'sheet') {
        content = <SheetAnatomy style={resolvedSheetStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'separator') {
        content = <SeparatorAnatomy style={resolvedSeparatorStyle} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'clipboard') {
        content = <ClipboardAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'switch') {
        content = <SwitchAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'dropdown-menu') {
        content = <DropdownMenuAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'table') {
        content = <TableAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'smart-filter-dropdown') {
        content = <SmartFilterDropdownAnatomy showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else if (name === 'sidebar') {
        content = <SidebarAnatomy style={style} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    } else {
        content = <FallbackAnatomy componentName={componentName} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
    }

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {content}
            {isMeasureMode && <MeasureOverlay targetRef={containerRef as React.RefObject<HTMLElement>} key={style} />}
        </div>
    );
};

export default AnatomyPreview;
