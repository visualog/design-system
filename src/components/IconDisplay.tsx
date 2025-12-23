import React, { useState, useRef, useEffect } from 'react';
import { designSystemData } from '../utils/dataLoader';

// --- Helper function to get SVG components ---
const allSvgModules = import.meta.glob<{ default: React.FC<React.SVGProps<SVGSVGElement>> }>('/src/assets/icons/**/*.svg', { eager: true });

const getSvgComponentFromFilename = (filename: string, category: 'line' | 'fill' | 'illust', illustSubfolder?: string): React.FC<React.SVGProps<SVGSVGElement>> | null => {
  let modulePathPrefix;
  if (category === 'line') modulePathPrefix = `/src/assets/icons/line/`;
  else if (category === 'fill') modulePathPrefix = `/src/assets/icons/fill/`;
  else if (category === 'illust') {
    if (!illustSubfolder) return null;
    modulePathPrefix = `/src/assets/icons/illust/${illustSubfolder}/`;
  } else return null;

  const fullModulePath = `${modulePathPrefix}${filename}.svg`.toLowerCase();
  const moduleKey = Object.keys(allSvgModules).find(key => key.toLowerCase() === fullModulePath);
  return moduleKey && allSvgModules[moduleKey] ? allSvgModules[moduleKey].default : null;
};

// --- Color Token Resolver ---
type ColorPaletteData = typeof designSystemData.colors.palette;
type ThemeMappingData = typeof designSystemData.colors.themeMapping;
type SemanticMappingData = typeof designSystemData.colors.semanticMapping;

const colorResolverCache = new Map<string, string | undefined>();

const resolveColorToken = (tokenRef: string | undefined): string | undefined => {
    if (!tokenRef || tokenRef.startsWith('#')) return tokenRef;
    if (colorResolverCache.has(tokenRef)) return colorResolverCache.get(tokenRef);

    const { palette, themeMapping } = designSystemData.colors;

    // Hardcoded fixes for data inconsistencies
    if (tokenRef === 'color/neutral/white') {
        tokenRef = 'color_Gray_white';
    }
    if (tokenRef === 'color/avatar/60') {
        tokenRef = 'color_Blue_60';
    }

    const resolve = (token: string): string | undefined => {
        if (!token || token.startsWith('#')) return token;
        if (colorResolverCache.has(token)) return colorResolverCache.get(token);

        // Normalize path-like "color/brand/60" to "color_brand_60"
        const normalizedToken = token.replace(/\//g, '_');

        // First, try to resolve from theme mapping
        for (const category of Object.values(themeMapping)) {
            if (normalizedToken in category) {
                const result = resolve(category[normalizedToken as keyof typeof category]);
                if (result) {
                    colorResolverCache.set(token, result);
                    return result;
                }
            }
        }

        // If not in theme mapping, treat as a direct palette reference "color_Family_Level"
        const match = normalizedToken.match(/^color_([A-Za-z\s]+)_(\S+)$/);
        if (match) {
            const [, family, level] = match;
            const familyKey = family.replace(/\s/g, ''); // e.g., "Cool Gray" -> "CoolGray"
            
            const colorFamily = palette[familyKey as keyof typeof palette];
            
            if (colorFamily && Array.isArray(colorFamily)) {
                const shade = colorFamily.find(s => s.level.toString().trim() === level.toString().trim());
                if (shade?.hex) {
                    colorResolverCache.set(token, shade.hex);
                    return shade.hex;
                }
            }
        }
        
        colorResolverCache.set(token, undefined);
        return undefined;
    };

    const finalHex = resolve(tokenRef);
    colorResolverCache.set(tokenRef, finalHex);
    return finalHex;
};

// --- Popover Component ---
interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, isOpen, onClose }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isRightAligned, setIsRightAligned] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const popoverWidth = 256; // w-64 is 16rem = 256px
        if (rect.right + popoverWidth > window.innerWidth) {
          setIsRightAligned(true);
        } else {
          setIsRightAligned(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      {trigger}
      {isOpen && (
        <div className={`absolute top-full mt-2 z-20 ${isRightAligned ? 'right-0' : 'left-0'}`}>
          {content}
        </div>
      )}
    </div>
  );
};

// --- Color Palette Component ---
interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  purpose: 'icon' | 'background';
}

const ICON_COLOR_ORDER = [
  'Color_icon_primary', 'Color_icon_info', 'Color_icon_interactive_primary',
  'Color_icon_interactive_primary-disabled', 'Color_icon_interactive_secondary',
  'Color_icon_interactive_secondary-disabled', 'Color_icon_interactive_tertiary',
  'Color_icon_interactive_inverse', 'Color_icon_inverse', 'Color_icon_brand',
  'Color_icon_interactive_brand', 'Color_icon_interactive_brand-hovered',
  'Color_icon_interactive_selected', 'Color_icon_interactive_brand-disabled',
  'Color_icon_loading', 'Color_icon_success', 'Color_icon_error', 'Color_icon_interactive_error'
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect, purpose }) => {
  const semanticMapping = designSystemData.colors.semanticMapping;
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomClick = () => {
    customColorInputRef.current?.click();
  };

  let resolvedColors: { name: string; hex: string }[] = [];

  if (purpose === 'icon') {
    resolvedColors = ICON_COLOR_ORDER.map(semanticName => {
      const tokenRef = semanticMapping.icons[semanticName as keyof typeof semanticMapping.icons];
      const hex = resolveColorToken(tokenRef);
      return { name: semanticName, hex: hex || '#CCCCCC' };
    }).filter(color => color.hex !== '#CCCCCC');
  } else {
    const semanticColorTokens = semanticMapping.backgrounds;
    for (const [semanticName, tokenRef] of Object.entries(semanticColorTokens)) {
      const hex = resolveColorToken(tokenRef as string);
      if (hex) {
        resolvedColors.push({ name: semanticName, hex });
      }
    }
  }

  return (
    <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
      <div className="flex flex-wrap gap-2">
        {resolvedColors.map((color) => (
          <SmartTooltip key={color.name} content={color.name}>
            <div 
              className="w-6 h-6 rounded-full cursor-pointer border border-black/10"
              style={{ backgroundColor: color.hex }}
              onClick={() => onColorSelect(color.hex)}
            />
          </SmartTooltip>
        ))}
      </div>
      <div className="border-t border-gray-200 mt-3 pt-3">
        <div 
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={handleCustomClick}
        >
          <div className="w-6 h-6 rounded-full border border-black/10 bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />
            <input
              type="color"
              ref={customColorInputRef}
              onChange={(e) => onColorSelect(e.target.value)}
              className="absolute w-0 h-0 opacity-0"
            />
          </div>
          <span className="text-sm text-gray-700">Custom</span>
        </div>
      </div>
    </div>
  );
};

// --- Smart Tooltip Component ---
interface SmartTooltipProps {
  content: string;
  children: React.ReactNode;
}

const SmartTooltip: React.FC<SmartTooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const tooltipHeight = 40;
      if (rect.top < tooltipHeight) setPosition('bottom');
      else setPosition('top');
    }
    setIsVisible(true);
  };

  return (
    <div ref={wrapperRef} className="relative flex justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className={`absolute w-max z-10 transition-opacity duration-300 pointer-events-none ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
          <div className={`bg-gray-800 text-white text-xs rounded-md py-2 px-2.5 relative tooltip-${position}`}>
            {content}
            <div className="tooltip-tail"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Icon Section Component ---
const DEFAULT_ICON_COLOR = '#374151';
const DEFAULT_BG_COLOR = '#F3F4F6';

const IconSection: React.FC<{ title: string; iconList: string[]; categoryType: 'line' | 'fill'; filenameMapping: any; }> = ({ title, iconList, categoryType, filenameMapping }) => {
  const [iconColor, setIconColor] = useState(DEFAULT_ICON_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(1.6);
  const [isIconPaletteOpen, setIconPaletteOpen] = useState(false);
  const [isBgPaletteOpen, setBgPaletteOpen] = useState(false);

  const RefreshIcon = getSvgComponentFromFilename('refresh', 'line');
  const isPristine = iconColor === DEFAULT_ICON_COLOR && bgColor === DEFAULT_BG_COLOR && strokeWidth === 1.6;

  const handleReset = () => {
    setIconColor(DEFAULT_ICON_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
    setStrokeWidth(1.6);
  };
  
  const ColorChipTrigger = ({ color, onClick }: { color: string; onClick: () => void }) => (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="relative w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: color }} />
    </div>
  );

  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="flex items-center gap-2 ml-auto">
          <Popover 
            isOpen={isIconPaletteOpen} 
            onClose={() => setIconPaletteOpen(false)} 
            trigger={<ColorChipTrigger color={iconColor} onClick={() => { setIconPaletteOpen(!isIconPaletteOpen); setBgPaletteOpen(false); }} />} 
            content={<ColorPalette purpose="icon" onColorSelect={(color) => { setIconColor(color); setIconPaletteOpen(false); }} />} 
          />
          <Popover 
            isOpen={isBgPaletteOpen} 
            onClose={() => setBgPaletteOpen(false)} 
            trigger={<ColorChipTrigger color={bgColor} onClick={() => { setBgPaletteOpen(!isBgPaletteOpen); setIconPaletteOpen(false); }} />} 
            content={<ColorPalette purpose="background" onColorSelect={(color) => { setBgColor(color); setBgPaletteOpen(false); }} />} 
          />
          {title === 'Line Icons' && (
            <div className="flex items-center gap-2">
              <label htmlFor="stroke-width" className="text-sm font-medium text-gray-600">Stroke</label>
              <input 
                id="stroke-width"
                type="range" 
                min="0.5" 
                max="3" 
                step="0.1" 
                value={strokeWidth} 
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="w-24"
              />
            </div>
          )}
          {!isPristine && (
            <button onClick={handleReset} className={`p-1.5 rounded-md transition-colors text-gray-600 hover:bg-gray-100`} aria-label="Reset colors">
              {RefreshIcon && <RefreshIcon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
      <div 
        className="flex flex-wrap gap-6"
        style={{ '--icon-stroke-width': strokeWidth } as React.CSSProperties}
      >
        {iconList.map((iconName: string, index: number) => {
           const mappedFilename = filenameMapping[iconName];
           const SvgComponent = mappedFilename ? getSvgComponentFromFilename(mappedFilename, categoryType) : null;
          
          const debugInfo = !SvgComponent && mappedFilename ? (
            <p className="text-red-500 text-xs mt-1">Missing: <span className="font-mono">{mappedFilename}</span></p>
          ) : !mappedFilename ? (
            <p className="text-yellow-500 text-xs mt-1">No mapping</p>
          ) : null;

          return (
            <SmartTooltip key={index} content={iconName}>
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-1 hover:border-black/10"
                style={{ backgroundColor: bgColor }}
              >
                {SvgComponent ? <SvgComponent className="w-8 h-8" style={{ color: iconColor }} /> : <span className="text-gray-500 text-xs">No SVG</span>}
                {debugInfo}
              </div>
            </SmartTooltip>
          );
        })}
      </div>
    </div>
  );
};
// --- Main Icon Display Component ---
const IconDisplay: React.FC = () => {
  const { icons } = designSystemData;
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">UI Icons</h2>
      <IconSection title="Line Icons" iconList={icons.line.line_icons} categoryType="line" filenameMapping={icons.filenameMapping.line_icons} />
      <IconSection title="Filled Icons" iconList={icons.filled.filled_icons} categoryType="fill" filenameMapping={icons.filenameMapping.filled_icons} />
      {/* Illustration Icons section remains unchanged */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Illustration Icons</h3>
        {/* ... existing illustration code ... */}
      </div>
    </div>
  );
};

export default IconDisplay;