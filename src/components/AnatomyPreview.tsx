import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import MeasureOverlay from '@/components/ui/MeasureOverlay';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ColorSwatch from './ui/ColorSwatch';

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

// Color token data with hex values
export const colorTokenData: Record<string, { hex: string; rgb: string; hsl: string; usage: string; description?: string }> = {
    'bg-muted': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'var(--color-muted)', usage: '컨테이너 배경', description: '보조적인 배경색으로 사용되어 계층 구조를 구분합니다.' },
    'bg-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '활성 트리거 배경', description: '가장 기본적인 배경색으로, 콘텐츠를 올리는 캔버스 역할을 합니다.' },
    'bg-primary': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-primary)', usage: '주색상 배경', description: '브랜드의 주요 액션이나 강조하고 싶은 부분에 사용됩니다.' },
    'bg-secondary': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', hsl: 'var(--color-secondary)', usage: '보조 배경', description: '주요 액션보다 덜 중요한, 부차적인 배경 요소에 사용됩니다.' },
    'bg-destructive': { hex: '#EF4444', rgb: 'rgb(239, 68, 68)', hsl: 'var(--color-destructive)', usage: '파괴적 배경', description: '삭제, 오류 등 위험하거나 주의가 필요한 액션의 배경에 사용됩니다.' },
    'bg-transparent': { hex: 'transparent', rgb: 'transparent', hsl: 'transparent', usage: '투명 배경', description: '배경색 없이 콘텐츠만 강조하거나 다른 배경 위에 얹혀질 때 사용됩니다.' },

    'text-foreground': { hex: '#09090B', rgb: 'rgb(9, 9, 11)', hsl: 'var(--color-foreground)', usage: '기본 텍스트', description: '가독성이 가장 높은 기본 텍스트 색상입니다.' },
    'text-muted-foreground': { hex: '#71717A', rgb: 'rgb(113, 113, 122)', hsl: 'var(--color-muted-foreground)', usage: '보조 텍스트', description: '덜 중요한 정보나 비활성화된 상태를 나타낼 때 사용됩니다.' },
    'text-background': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'var(--color-background)', usage: '반전 텍스트', description: '어두운 배경 위에서 높은 가독성을 제공하는 텍스트 색상입니다.' },
    'text-primary': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-primary)', usage: '주색상 텍스트', description: '브랜드 컬러를 텍스트에 적용하여 강조할 때 사용됩니다.' },
    'text-primary-foreground': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', hsl: 'var(--color-primary-foreground)', usage: '주색상 위 텍스트', description: '주색상 배경 위에서 읽기 쉽도록 대비를 이룹니다.' },
    'text-secondary-foreground': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-secondary-foreground)', usage: '보조 배경 위 텍스트', description: '보조 배경 위에서 가독성을 확보하는 텍스트 색상입니다.' },
    'text-accent-foreground': { hex: '#18181B', rgb: 'rgb(24, 24, 27)', hsl: 'var(--color-accent-foreground)', usage: '강조 배경 위 텍스트', description: '호버 등 강조된 배경 위에서 사용되는 텍스트 색상입니다.' },
    'text-destructive-foreground': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', hsl: 'var(--color-destructive-foreground)', usage: '파괴적 배경 위 텍스트', description: '위험/경고 배경 위에서 높은 가독성을 제공합니다.' },

    'border-input': { hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)', hsl: 'var(--color-input)', usage: '입력창 테두리', description: '인풋 컴포넌트나 카드 등의 경계를 구분하는 테두리 색상입니다.' },
    'border-border': { hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)', hsl: 'var(--color-border)', usage: '컨테이너 보더', description: '컴포넌트의 경계를 구분하는 기본 보더 색상입니다.' },
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
    onColorHoverChange?: (color: string | null) => void;
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
    const getTokenKeys = (variant: string) => {
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

    const tokens = getTokenKeys(style);

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
                    variant={style as any}
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

// Helper function to get variants for a component
export const getAnatomyVariants = (componentName: string): string[] => {
    const name = componentName.toLowerCase();
    if (name === 'tabs') return ['segmented', 'pill', 'line'];
    if (name === 'button') return ['default', 'secondary', 'outline', 'ghost', 'link'];
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
    } else if (name === 'button') {
        content = <ButtonAnatomy style={style} showLabels={showLabels} showColorInfo={showColorInfo} onHoverChange={onHoverChange} onColorHoverChange={onColorHoverChange} />;
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
