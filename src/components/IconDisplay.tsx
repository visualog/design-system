import React, { useState, useRef, useMemo } from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

import { resolveColorToken } from '../lib/colorUtils';

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

  const semanticColorTokens = purpose === 'icon' ? semanticMapping.icons : semanticMapping.backgrounds;

  let resolvedColors: { name: string; hex: string }[] = [];

  if (purpose === 'icon') {
    resolvedColors = ICON_COLOR_ORDER.map(semanticName => {
      const tokenRef = semanticMapping.icons[semanticName as keyof typeof semanticMapping.icons];
      const hex = resolveColorToken(tokenRef);
      return { name: semanticName, hex: hex || '#CCCCCC' };
    }).filter(color => color.hex !== '#CCCCCC');
  } else {
    for (const [semanticName, tokenRef] of Object.entries(semanticColorTokens)) {
      const hex = resolveColorToken(tokenRef as string);
      if (hex) {
        resolvedColors.push({ name: semanticName, hex });
      }
    }
  }

  return (
    <div className="w-64 p-4">
      <div className="flex flex-wrap gap-2">
        {resolvedColors.map((color) => (
          <TooltipProvider key={color.name} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="w-6 h-6 rounded-full cursor-pointer border border-black/10"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => onColorSelect(color.hex)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="border-t border-border mt-3 pt-3">
        <div 
          className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer"
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
          <span className="text-sm">Custom</span>
        </div>
      </div>
    </div>
  );
};

// --- Icon Section Component ---
const DEFAULT_ICON_COLOR = '#374151';
const DEFAULT_BG_COLOR = '#F3F4F6';

interface IconSectionProps {
  title: string;
  iconList: string[];
  categoryType: 'line' | 'fill';
  filenameMapping: any;
  searchQuery: string;
}

const IconSection: React.FC<IconSectionProps> = ({ title, iconList, categoryType, filenameMapping, searchQuery }) => {
  const [iconColor, setIconColor] = useState(DEFAULT_ICON_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);

  const RefreshIcon = getSvgComponentFromFilename('refresh', 'line');
  const isPristine = iconColor === DEFAULT_ICON_COLOR && bgColor === DEFAULT_BG_COLOR;

  const handleReset = () => {
    setIconColor(DEFAULT_ICON_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
  };
  
  const ColorChipTrigger = ({ color }: { color: string; }) => (
    <div className="relative w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: color }} />
  );

  const filteredIcons = useMemo(() => {
    return iconList.filter(iconName => 
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [iconList, searchQuery]);

  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2 ml-auto">
          <Popover>
            <PopoverTrigger>
              <ColorChipTrigger color={iconColor} />
            </PopoverTrigger>
            <PopoverContent>
              <ColorPalette purpose="icon" onColorSelect={setIconColor} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <ColorChipTrigger color={bgColor} />
            </PopoverTrigger>
            <PopoverContent>
              <ColorPalette purpose="background" onColorSelect={setBgColor} />
            </PopoverContent>
          </Popover>
          {!isPristine && (
            <Button onClick={handleReset} variant="ghost" size="icon" aria-label="Reset colors">
              {RefreshIcon && <RefreshIcon className="w-5 h-5" />}
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {filteredIcons.map((iconName: string, index: number) => {
           const mappedFilename = filenameMapping[iconName];
           const SvgComponent = mappedFilename ? getSvgComponentFromFilename(mappedFilename, categoryType) : null;
          
          return (
            <TooltipProvider key={index} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Card className="w-24 h-24 flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:border-black/10" style={{ backgroundColor: bgColor }}>
                    <CardContent className="p-0">
                      {SvgComponent ? <SvgComponent className="w-8 h-8" style={{ color: iconColor }} /> : <span className="text-xs">N/A</span>}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{iconName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

// --- Main Icon Display Component ---
interface IconDisplayProps {
  searchQuery: string;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ searchQuery }) => {
  const { icons } = designSystemData;
  const [activeTab, setActiveTab] = useState('ui');
  const tabs = [
    { name: 'UI Icons', value: 'ui' },
    { name: 'Illustration Icons', value: 'illustration' }
  ];

  const filteredIllustrations = useMemo(() => {
    return Object.entries(icons.illustration)
      .map(([categoryKey, data]) => {
        if (categoryKey === "icon_assets_notes" || !data.subfolder) return null;
        
        const filteredModules = Object.keys(allSvgModules).filter(key => 
          key.toLowerCase().startsWith(`/src/assets/icons/illust/${data.subfolder}/`.toLowerCase()) &&
          key.split('/').pop()?.replace('.svg', '').toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        return {
          categoryKey,
          data,
          filteredModules
        };
      })
      .filter(item => item && item.filteredModules.length > 0);
  }, [icons.illustration, searchQuery]);

  return (
    <div className="container mx-auto py-8">
      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="ui">
          <IconSection title="Line Icons" iconList={icons.line.line_icons} categoryType="line" filenameMapping={icons.filenameMapping.line_icons} searchQuery={searchQuery} />
          <IconSection title="Filled Icons" iconList={icons.filled.filled_icons} categoryType="fill" filenameMapping={icons.filenameMapping.filled_icons} searchQuery={searchQuery} />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="illustration">
          <div className="grid grid-cols-1 gap-8 mt-6">
              {filteredIllustrations.length > 0 ? (
                filteredIllustrations.map((item) => {
                  if (!item) return null;
                  const { categoryKey, data, filteredModules } = item;
                  
                  return (
                      <div key={categoryKey} className="mb-6">
                          <h3 className="text-xl font-medium mb-4">{categoryKey}</h3>
                          {data.notes && <p className="text-sm text-gray-600 mb-4">{data.notes}</p>}
                          <div className="flex flex-wrap gap-6">
                              {filteredModules.map((modulePathKey, index) => {
                                      const filename = modulePathKey.split('/').pop()?.replace('.svg', '');
                                      const SvgComponent = filename ? getSvgComponentFromFilename(filename, 'illust', data.subfolder) : null;
                                      return (
                                        <TooltipProvider key={index} delayDuration={100}>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <Card className="w-24 h-24 flex items-center justify-center">
                                                <CardContent className="p-0">
                                                  {SvgComponent ? <SvgComponent className="w-8 h-8 text-foreground" /> : <span className="text-xs">N/A</span>}
                                                </CardContent>
                                              </Card>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{filename || 'unknown'}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      );
                                  })}
                          </div>
                      </div>
                  );
              })) : (
                <p className="text-gray-500">No illustration icons found for this query.</p>
              )}
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default IconDisplay;