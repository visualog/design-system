import React, { useState, useRef, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { RotateCcw } from 'lucide-react';
import ColorSwatch from '@/components/ui/ColorSwatch';
import { designSystemData } from '../utils/dataLoader';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Clipboard } from './ui/clipboard';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  if (moduleKey && allSvgModules[moduleKey]) {
    const mod = allSvgModules[moduleKey];
    if (!mod.default) {
      console.warn(`[IconDisplay] Module found for ${filename} but no default export. keys:`, Object.keys(mod));
      return null;
    }
    return mod.default;
  }
  console.warn(`[IconDisplay] Icon module not found for: ${fullModulePath}`);
  return null;
};

import { resolveColorToken } from '../lib/colorUtils';

// --- Color Palette Component ---
interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  purpose: 'icon' | 'background';
  className?: string;
}

const ICON_COLOR_ORDER = [
  'icon.primary', 'icon.info', 'icon.interactive.primary',
  'icon.interactive.primary_disabled', 'icon.interactive.secondary',
  'icon.interactive.secondary_disabled', 'icon.interactive.tertiary',
  'icon.interactive.inverse', 'icon.inverse', 'icon.brand',
  'icon.interactive.brand', 'icon.interactive.brand_hovered',
  'icon.interactive.selected', 'icon.interactive.brand_disabled',
  'icon.loading', 'icon.success', 'icon.error', 'icon.interactive.error'
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect, purpose, className = '' }) => {
  const semanticMapping = designSystemData.colors.semanticMapping;
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomClick = () => {
    customColorInputRef.current?.click();
  };

  const semanticColorTokens = purpose === 'icon' ? semanticMapping.icon : semanticMapping.bg;

  let resolvedColors: { name: string; hex: string }[] = [];

  if (purpose === 'icon') {
    resolvedColors = ICON_COLOR_ORDER.map(semanticName => {
      // Find the token object where devToken matches semanticName
      const tokenObj = (semanticMapping.icon as any[]).find((t: any) => t.devToken === semanticName);
      // Resolve the value from the found token object
      const tokenRef = tokenObj ? tokenObj.value : undefined;
      const hex = resolveColorToken(tokenRef);
      return { name: semanticName, hex: hex || '#CCCCCC' };
    }).filter(color => color.hex !== '#CCCCCC');
  } else {
    // Backgrounds logic - iterate over the array
    (semanticColorTokens as any[]).forEach((tokenObj: any) => {
      const semanticName = tokenObj.devToken;
      const tokenRef = tokenObj.value;
      const hex = resolveColorToken(tokenRef);
      if (hex) {
        resolvedColors.push({ name: semanticName, hex });
      }
    });
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {resolvedColors.map((color) => (
          <TooltipProvider key={color.name} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="cursor-pointer"
                  onClick={() => onColorSelect(color.hex)}
                >
                  <ColorSwatch
                    colorValue={color.hex}
                    size="md"
                    className="rounded-full border-black/10"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Custom Color Picker as a Chip */}
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="w-6 h-6 rounded-full cursor-pointer border border-black/10 bg-white flex items-center justify-center relative overflow-hidden"
                onClick={handleCustomClick}
              >
                <div className="w-full h-full bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500" />
                <input
                  type="color"
                  ref={customColorInputRef}
                  onChange={(e) => onColorSelect(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Custom Color</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
  onIconClick: (name: string, category: 'line' | 'fill', filename: string, color: string) => void;
  searchInput?: React.ReactNode;
}



// ... existing code ...

const IconSection: React.FC<IconSectionProps> = ({ iconList, categoryType, filenameMapping, searchQuery, onIconClick, searchInput }) => {
  const [iconColor, setIconColor] = useState(DEFAULT_ICON_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);

  const isPristine = iconColor === DEFAULT_ICON_COLOR && bgColor === DEFAULT_BG_COLOR;

  const handleReset = () => {
    setIconColor(DEFAULT_ICON_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
  };

  const ColorChipTrigger = ({ color }: { color: string; }) => (
    <ColorSwatch
      colorValue={color}
      size="md"
      className="rounded-full border-black/10 cursor-pointer"
    />
  );

  const filteredIcons = useMemo(() => {
    return iconList.filter(iconName =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [iconList, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        {searchInput}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger>
              <ColorChipTrigger color={iconColor} />
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none w-auto shadow-none bg-transparent">
              <div className="w-64 p-4 bg-popover rounded-md border shadow-md">
                <ColorPalette purpose="icon" onColorSelect={setIconColor} />
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <ColorChipTrigger color={bgColor} />
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none w-auto shadow-none bg-transparent">
              <div className="w-64 p-4 bg-popover rounded-md border shadow-md">
                <ColorPalette purpose="background" onColorSelect={setBgColor} />
              </div>
            </PopoverContent>
          </Popover>
          {!isPristine && (
            <Button onClick={handleReset} variant="ghost" size="icon" aria-label="Reset colors">
              <RotateCcw className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-2">
        {filteredIcons.map((iconName: string, index: number) => {
          const mappedFilename = filenameMapping[iconName];
          const SvgComponent = mappedFilename ? getSvgComponentFromFilename(mappedFilename, categoryType) : null;

          return (
            <TooltipProvider key={index} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className="shadow-none w-full aspect-square flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:border-black/10 cursor-pointer"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => mappedFilename && onIconClick(iconName, categoryType, mappedFilename, iconColor)}
                  >
                    <CardContent className="p-0">
                      {SvgComponent ? <SvgComponent className="w-6 h-6" style={{ color: iconColor }} /> : <span className="text-xs">N/A</span>}
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
    </div >
  );
};

// --- Main Icon Display Component ---
const IconDisplay: React.FC = () => {
  const [lineSearchQuery, setLineSearchQuery] = useState('');
  const [filledSearchQuery, setFilledSearchQuery] = useState('');
  const [illustSearchQuery, setIllustSearchQuery] = useState('');
  const [illustCategory, setIllustCategory] = useState('All');
  const { icons } = designSystemData;
  const [activeTab, setActiveTab] = useState('line');
  const tabs = [
    { name: 'Line Icons', value: 'line' },
    { name: 'Filled Icons', value: 'filled' },
    { name: 'Illustration Icons', value: 'illustration' }
  ];

  // Create category name mapping
  const illustCategoryNames: Record<string, string> = useMemo(() => {
    const categories: Record<string, string> = {};
    Object.entries(icons.illustration).forEach(([categoryKey, data]) => {
      if (categoryKey !== "icon_assets_notes" && data.subfolder) {
        // Map category keys to display names
        if (categoryKey.toLowerCase().includes('document')) {
          categories[categoryKey] = 'Document';
        } else if (categoryKey.toLowerCase().includes('card')) {
          categories[categoryKey] = 'Card';
        } else if (categoryKey.toLowerCase().includes('fed')) {
          categories[categoryKey] = 'FED';
        } else if (categoryKey.toLowerCase().includes('film')) {
          categories[categoryKey] = 'FILM';
        } else {
          categories[categoryKey] = categoryKey;
        }
      }
    });
    return categories;
  }, [icons.illustration]);

  // Flatten all illustration icons with category info
  const allIllustrationIcons = useMemo(() => {
    const iconsList: Array<{ filename: string; category: string; subfolder: string; moduleKey: string }> = [];

    Object.entries(icons.illustration).forEach(([categoryKey, data]) => {
      if (categoryKey === "icon_assets_notes" || !data.subfolder) return;

      Object.keys(allSvgModules)
        .filter(key => key.toLowerCase().startsWith(`/src/assets/icons/illust/${data.subfolder}/`.toLowerCase()))
        .forEach(moduleKey => {
          const filename = moduleKey.split('/').pop()?.replace('.svg', '');
          if (filename) {
            iconsList.push({ filename, category: categoryKey, subfolder: data.subfolder, moduleKey });
          }
        });
    });

    return iconsList;
  }, [icons.illustration]);

  const filteredIllustrations = useMemo(() => {
    return allIllustrationIcons.filter(icon => {
      const matchesSearch = icon.filename.toLowerCase().includes(illustSearchQuery.toLowerCase());
      const matchesCategory = illustCategory === 'All' || icon.category === illustCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allIllustrationIcons, illustSearchQuery, illustCategory]);

  // Calculate icon counts
  const lineIconCount = icons.line.line_icons.length;
  const filledIconCount = icons.filled.filled_icons.length;
  const illustIconCount = filteredIllustrations.length;

  const [selectedIcon, setSelectedIcon] = useState<{ name: string; category: 'line' | 'fill' | 'illust'; filename: string; subfolder?: string; color: string } | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetConfig, setSheetConfig] = useState<{ color: string; size: number }>({ color: '#374151', size: 20 });

  const handleIconClick = (name: string, category: 'line' | 'fill' | 'illust', filename: string, color: string, subfolder?: string) => {
    setSelectedIcon({ name, category, filename, subfolder, color });
    setSheetConfig({ color, size: 20 });
    setIsSheetOpen(true);
  };

  const SvgPreview = selectedIcon ? getSvgComponentFromFilename(selectedIcon.filename, selectedIcon.category, selectedIcon.subfolder) : null;

  // Usage code snippet generation
  const getUsageCode = () => {
    if (!selectedIcon) return '';
    // Constructing a PascalCase component name from filename (e.g., ic_user_line -> IcUserLine)
    const componentName = selectedIcon.filename
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const sizeClass = sheetConfig.size === 16 ? 'w-4 h-4' : sheetConfig.size === 20 ? 'w-5 h-5' : 'w-6 h-6';

    return `<${componentName} className="${sizeClass}" style={{ color: '${sheetConfig.color}' }} />`;
  };

  return (
    <div>
      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="line">
          <div>
            <h2 className="sr-only">라인 아이콘 (Line Icons)</h2>
            <IconSection
              title="Line Icons"
              iconList={icons.line.line_icons}
              categoryType="line"
              filenameMapping={icons.filenameMapping.line_icons}
              searchQuery={lineSearchQuery}
              onIconClick={handleIconClick}
              searchInput={
                <SearchBar
                  placeholder={`${lineIconCount}개 아이콘 검색...`}
                  value={lineSearchQuery}
                  onChange={(e) => setLineSearchQuery(e.target.value)}
                />

              }
            />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="filled">
          <div>
            <h2 className="sr-only">필드 아이콘 (Filled Icons)</h2>
            <IconSection
              title="Filled Icons"
              iconList={icons.filled.filled_icons}
              categoryType="fill"
              filenameMapping={icons.filenameMapping.filled_icons}
              searchQuery={filledSearchQuery}
              onIconClick={handleIconClick}
              searchInput={
                <SearchBar
                  placeholder={`${filledIconCount}개 아이콘 검색...`}
                  value={filledSearchQuery}
                  onChange={(e) => setFilledSearchQuery(e.target.value)}
                />

              }
            />
          </div>
        </AnimatedTabsContent >
        <AnimatedTabsContent value="illustration">
          <div>
            <h2 className="sr-only">일러스트 아이콘 (Illustration Icons)</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-48 justify-between shadow-none group">
                        <span>{illustCategory === 'All' ? '전체' : illustCategoryNames[illustCategory] || illustCategory}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setIllustCategory('All')}>전체</DropdownMenuItem>
                      {Object.entries(illustCategoryNames).map(([categoryKey, displayName]) => (
                        <DropdownMenuCheckboxItem
                          key={categoryKey}
                          checked={illustCategory === categoryKey}
                          onCheckedChange={() => setIllustCategory(categoryKey)}
                        >
                          {displayName}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SearchBar
                    placeholder={`${illustIconCount}개 아이콘 검색...`}
                    value={illustSearchQuery}
                    onChange={(e) => setIllustSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-2">
                {filteredIllustrations.length > 0 ? (
                  filteredIllustrations.map((icon, index) => {
                    const SvgComponent = getSvgComponentFromFilename(icon.filename, 'illust', icon.subfolder);
                    const defaultIllustColor = '#374151';

                    return (
                      <TooltipProvider key={index} delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Card
                              className="shadow-none w-full aspect-square flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-all duration-200 hover:-translate-y-1"
                              onClick={() => handleIconClick(icon.filename, 'illust', icon.filename, defaultIllustColor, icon.subfolder)}
                            >
                              <CardContent className="p-0">
                                {SvgComponent ? <SvgComponent className="w-8 h-8 text-foreground" /> : <span className="text-xs">N/A</span>}
                              </CardContent>
                            </Card>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{icon.filename}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No illustration icons found for this query.</p>
                )}
              </div>
            </div>
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs >


      {
        selectedIcon && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent side="bottom" className="sm:max-w-full" onOpenAutoFocus={(e) => e.preventDefault()}>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg">{selectedIcon.name}</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="py-6 flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left Column: Visuals & Color Picker */}
                <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-secondary/30 rounded-lg border border-border p-4 md:p-6 gap-6">
                  <div>
                    <div className="flex items-end gap-4 justify-center md:justify-start">
                      <div className="flex items-end gap-4 justify-center md:justify-start flex-wrap">
                        {(selectedIcon.category === 'illust' ? [16, 20, 24, 28, 32, 40] : [16, 20, 24]).map((size) => (
                          <div
                            key={size}
                            className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${sheetConfig.size === size ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => setSheetConfig(prev => ({ ...prev, size: size as number }))}
                          >
                            <div className={`flex items-center justify-center border border-black/5 bg-white rounded-md ${sheetConfig.size === size ? 'border-black' : ''}`}
                              style={{ width: size + 16, height: size + 16 }}>
                              {SvgPreview && (
                                <SvgPreview
                                  width={size}
                                  height={size}
                                  style={{ color: sheetConfig.color }}
                                />
                              )}
                            </div>
                            <span className={`text-xs font-mono ${sheetConfig.size === size ? 'font-bold text-primary' : 'text-muted-foreground'}`}>{size}px</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedIcon.category !== 'illust' && (
                      <div>
                        <ColorPalette purpose="icon" onColorSelect={(c) => setSheetConfig(prev => ({ ...prev, color: c }))} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Details & Code */}
                <div className="flex flex-col gap-6 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold block mb-1">Category</span>
                      <span className="capitalize">{selectedIcon.category}</span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1">Filename</span>
                      <span className="font-mono text-muted-foreground break-all">{selectedIcon.filename}</span>
                    </div>
                    {selectedIcon.subfolder && (
                      <div>
                        <span className="font-semibold block mb-1">Subfolder</span>
                        <span className="font-mono text-muted-foreground">{selectedIcon.subfolder}</span>
                      </div>
                    )}
                  </div>

                  {/* Usage Code Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">Usage</span>
                    </div>
                    <div className="bg-muted p-4 rounded-md flex items-start sm:items-center justify-between gap-2 font-mono text-xs border border-border flex-col sm:flex-row">
                      <code className="break-all flex-1">{getUsageCode()}</code>
                      <Clipboard value={getUsageCode()} />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )
      }
    </div >
  );
};

export default IconDisplay;