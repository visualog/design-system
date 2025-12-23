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

// --- Popover Component ---
interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, isOpen, onClose }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
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
        <div className="absolute top-full mt-2 z-20">
          {content}
        </div>
      )}
    </div>
  );
};


// --- Color Palette Component ---
interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect }) => {
  const colorPaletteData = designSystemData.colors.palette;
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomClick = () => {
    customColorInputRef.current?.click();
  };
  
  return (
    <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
      {Object.entries(colorPaletteData).map(([colorName, colorShades]) => {
        if (!Array.isArray(colorShades)) return null;
        return (
          <div key={colorName} className="mb-3">
            <h5 className="text-xs font-semibold text-gray-500 mb-2">{colorName}</h5>
            <div className="flex flex-wrap gap-2">
              {colorShades.map((shade) => (
                <div 
                  key={shade.variable}
                  className="w-6 h-6 rounded-full cursor-pointer border border-black/10"
                  style={{ backgroundColor: shade.hex }}
                  onClick={() => onColorSelect(shade.hex)}
                  title={`${colorName} ${shade.level} - ${shade.hex}`}
                />
              ))}
            </div>
          </div>
        );
      })}
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

// --- Smart Tooltip Component (already defined, assumed from context) ---
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
  const [isIconPaletteOpen, setIconPaletteOpen] = useState(false);
  const [isBgPaletteOpen, setBgPaletteOpen] = useState(false);

  const RefreshIcon = getSvgComponentFromFilename('refresh', 'line');
  const isPristine = iconColor === DEFAULT_ICON_COLOR && bgColor === DEFAULT_BG_COLOR;

  const handleReset = () => {
    setIconColor(DEFAULT_ICON_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
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
            content={<ColorPalette onColorSelect={(color) => { setIconColor(color); setIconPaletteOpen(false); }} />} 
          />
          <Popover 
            isOpen={isBgPaletteOpen} 
            onClose={() => setBgPaletteOpen(false)} 
            trigger={<ColorChipTrigger color={bgColor} onClick={() => { setBgPaletteOpen(!isBgPaletteOpen); setIconPaletteOpen(false); }} />} 
            content={<ColorPalette onColorSelect={(color) => { setBgColor(color); setBgPaletteOpen(false); }} />} 
          />
          {!isPristine && (
            <button onClick={handleReset} className={`p-1.5 rounded-md transition-colors text-gray-600 hover:bg-gray-100`} aria-label="Reset colors">
              {RefreshIcon && <RefreshIcon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
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