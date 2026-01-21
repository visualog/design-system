import { cn } from '@/lib/utils';

interface ColorSwatchProps {
    colorValue?: string;      // Primary color (CSS var or HSL/RGB)
    fallbackColor?: string;   // Secondary color (Hex)
    isTextColor?: boolean;    // Whether to show 'A' character
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showCheckerboard?: boolean;
}

const ColorSwatch = ({
    colorValue,
    fallbackColor,
    isTextColor = false,
    size = 'sm',
    className,
    showCheckerboard = true
}: ColorSwatchProps) => {

    // Size mapping
    const sizeClasses = {
        'xs': 'w-3 h-3',
        'sm': 'w-4 h-4',
        'md': 'w-5 h-5',
        'lg': 'w-6 h-6',
        'xl': 'w-9 h-9'
    };

    // Construct multiple background layers
    // Layer 1 (top): colorValue
    // Layer 2: fallbackColor
    // Layer 3 (bottom): Checkerboard pattern

    const backgrounds: string[] = [];

    // Top layer: colorValue
    if (colorValue && colorValue !== 'transparent') {
        backgrounds.push(`linear-gradient(${colorValue}, ${colorValue})`);
    }

    // Middle layer: fallbackColor
    if (fallbackColor && fallbackColor !== 'transparent' && fallbackColor !== colorValue) {
        backgrounds.push(`linear-gradient(${fallbackColor}, ${fallbackColor})`);
    }

    // Bottom layer: Checkerboard (only if needed/requested)
    const isAlpha = (colorValue?.includes('alpha') || colorValue?.includes('%') || (fallbackColor && fallbackColor.length === 9) || colorValue === 'transparent');

    if (showCheckerboard && (isAlpha || colorValue === 'transparent')) {
        backgrounds.push('linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)');
        backgrounds.push('linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)');
        backgrounds.push('linear-gradient(#fff, #fff)');
    } else {
        // Default solid white for non-alpha if nothing else provided
        if (backgrounds.length === 0) {
            backgrounds.push('linear-gradient(#fff, #fff)');
        }
    }

    const backgroundStyle = {
        backgroundImage: backgrounds.join(', '),
        backgroundSize: backgrounds.length > 2 && (isAlpha || colorValue === 'transparent')
            ? backgrounds.slice(0, -3).map(() => '100%').concat(['16px 16px', '16px 16px', '100%']).join(', ')
            : '100%',
        backgroundPosition: backgrounds.length > 2 && (isAlpha || colorValue === 'transparent')
            ? backgrounds.slice(0, -3).map(() => '0 0').concat(['0 0', '8px 8px', '0 0']).join(', ')
            : '0 0'
    };

    return (
        <div
            className={cn(
                "relative rounded-sm border border-white/30 overflow-hidden flex items-center justify-center shrink-0",
                sizeClasses[size],
                className
            )}
            style={backgroundStyle}
        >
            {isTextColor && (
                <span className="relative z-10 text-white text-[9px] font-bold mix-blend-difference select-none">A</span>
            )}
        </div>
    );
};

export default ColorSwatch;
