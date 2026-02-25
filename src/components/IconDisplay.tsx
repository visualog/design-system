import React, { useMemo, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { SearchBar } from './SearchBar';
import ColorSwatch from '@/components/ui/ColorSwatch';
import { designSystemData } from '../utils/dataLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AnimatedTabs, AnimatedTabsContent } from '@/components/ui/animated-tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Clipboard } from './ui/clipboard';
import { SmartFilterDropdown } from './ui/SmartFilterDropdown';
import { DocSubsection } from './ui/DocLayout';
import { resolveColorToken } from '../lib/colorUtils';

type IconCategory = 'line' | 'fill' | 'illust';

interface SemanticToken {
  devToken: string;
  value?: string;
}

interface SemanticMapping {
  icon: SemanticToken[];
  bg: SemanticToken[];
}

interface IconCollectionInfo {
  notes?: string;
  subfolder?: string;
}

type IllustrationCollections = Record<string, IconCollectionInfo>;

type FilenameMapping = Record<string, string>;

interface IllustrationIconItem {
  filename: string;
  category: string;
  subfolder: string;
}

interface SelectedIcon {
  name: string;
  category: IconCategory;
  filename: string;
  subfolder?: string;
  color: string;
}

interface SheetConfig {
  color: string;
  size: number;
}

interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  purpose: 'icon' | 'background';
  className?: string;
}

interface IconSectionProps {
  iconList: string[];
  categoryType: 'line' | 'fill';
  filenameMapping: FilenameMapping;
  searchQuery: string;
  onIconClick: (name: string, category: 'line' | 'fill', filename: string, color: string) => void;
  searchInput?: React.ReactNode;
}

const allSvgModules = import.meta.glob<{ default: React.FC<React.SVGProps<SVGSVGElement>> }>('/src/assets/icons/**/*.svg', { eager: true });

const DEFAULT_ICON_COLOR = '#374151';
const DEFAULT_BG_COLOR = '#F3F4F6';

const ICON_COLOR_ORDER = [
  'icon.primary', 'icon.info', 'icon.interactive.primary',
  'icon.interactive.primary_disabled', 'icon.interactive.secondary',
  'icon.interactive.secondary_disabled', 'icon.interactive.tertiary',
  'icon.interactive.inverse', 'icon.inverse', 'icon.brand',
  'icon.interactive.brand', 'icon.interactive.brand_hovered',
  'icon.interactive.selected', 'icon.interactive.brand_disabled',
  'icon.loading', 'icon.success', 'icon.error', 'icon.interactive.error',
];

const ColorChipTrigger: React.FC<{ color: string }> = ({ color }) => (
  <ColorSwatch
    colorValue={color}
    size="md"
    className="rounded-full border-black/10 cursor-pointer"
  />
);

const getSvgComponentFromFilename = (
  filename: string,
  category: IconCategory,
  illustSubfolder?: string
): React.FC<React.SVGProps<SVGSVGElement>> | null => {
  let modulePathPrefix: string;

  if (category === 'line') {
    modulePathPrefix = '/src/assets/icons/line/';
  } else if (category === 'fill') {
    modulePathPrefix = '/src/assets/icons/fill/';
  } else if (category === 'illust') {
    if (!illustSubfolder) {
      return null;
    }

    modulePathPrefix = `/src/assets/icons/illust/${illustSubfolder}/`;
  } else {
    return null;
  }

  const fullModulePath = `${modulePathPrefix}${filename}.svg`.toLowerCase();
  const moduleKey = Object.keys(allSvgModules).find((key) => key.toLowerCase() === fullModulePath);

  if (moduleKey && allSvgModules[moduleKey]) {
    const module = allSvgModules[moduleKey];
    if (!module.default) {
      console.warn(`[IconDisplay] Module found for ${filename} but no default export. keys:`, Object.keys(module));
      return null;
    }

    return module.default;
  }

  console.warn(`[IconDisplay] Icon module not found for: ${fullModulePath}`);
  return null;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect, purpose, className = '' }) => {
  const semanticMapping = designSystemData.colors.semanticMapping as SemanticMapping;
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomClick = () => {
    customColorInputRef.current?.click();
  };

  const semanticColorTokens = purpose === 'icon' ? semanticMapping.icon : semanticMapping.bg;

  let resolvedColors: { name: string; hex: string }[] = [];

  if (purpose === 'icon') {
    resolvedColors = ICON_COLOR_ORDER.map((semanticName) => {
      const token = semanticMapping.icon.find((item) => item.devToken === semanticName);
      const hex = resolveColorToken(token?.value);
      return { name: semanticName, hex: hex || '#CCCCCC' };
    }).filter((color) => color.hex !== '#CCCCCC');
  } else {
    semanticColorTokens.forEach((token) => {
      const hex = resolveColorToken(token.value);
      if (hex) {
        resolvedColors.push({ name: token.devToken, hex });
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
                <div className="cursor-pointer" onClick={() => onColorSelect(color.hex)}>
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
                  onChange={(event) => onColorSelect(event.target.value)}
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

const IconSection: React.FC<IconSectionProps> = ({
  iconList,
  categoryType,
  filenameMapping,
  searchQuery,
  onIconClick,
  searchInput,
}) => {
  const [iconColor, setIconColor] = useState(DEFAULT_ICON_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);

  const isPristine = iconColor === DEFAULT_ICON_COLOR && bgColor === DEFAULT_BG_COLOR;

  const handleReset = () => {
    setIconColor(DEFAULT_ICON_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
  };

  const filteredIcons = useMemo(() => {
    return iconList.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [iconList, searchQuery]);

  return (
    <div className="doc-content-stack">
      <div className="flex flex-wrap items-center justify-between gap-2">
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
        {filteredIcons.map((iconName, index) => {
          const mappedFilename = filenameMapping[iconName];
          const SvgComponent = mappedFilename
            ? getSvgComponentFromFilename(mappedFilename, categoryType)
            : null;

          return (
            <TooltipProvider key={`${iconName}-${index}`} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className="shadow-none w-full aspect-square flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:border-black/10 cursor-pointer"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => mappedFilename && onIconClick(iconName, categoryType, mappedFilename, iconColor)}
                  >
                    <CardContent className="p-0">
                      {SvgComponent ? (
                        <SvgComponent className="w-6 h-6" style={{ color: iconColor }} />
                      ) : (
                        <span className="text-xs">N/A</span>
                      )}
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

const IconDisplay: React.FC = () => {
  const [lineSearchQuery, setLineSearchQuery] = useState('');
  const [filledSearchQuery, setFilledSearchQuery] = useState('');
  const [illustSearchQuery, setIllustSearchQuery] = useState('');
  const [illustCategory, setIllustCategory] = useState<string[]>(['All']);
  const [activeTab, setActiveTab] = useState('line');
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetConfig, setSheetConfig] = useState<SheetConfig>({ color: '#374151', size: 20 });

  const { icons } = designSystemData;

  const lineIcons = icons.line.line_icons as string[];
  const filledIcons = icons.filled.filled_icons as string[];
  const illustrationCollections = icons.illustration as IllustrationCollections;
  const filenameMapping = icons.filenameMapping as {
    line_icons: FilenameMapping;
    filled_icons: FilenameMapping;
  };

  const tabs = [
    { name: 'Line Icons', value: 'line' },
    { name: 'Filled Icons', value: 'filled' },
    { name: 'Illustration Icons', value: 'illustration' },
  ];

  const illustCategoryNames: Record<string, string> = useMemo(() => {
    const categories: Record<string, string> = {};

    Object.entries(illustrationCollections).forEach(([categoryKey, data]) => {
      if (categoryKey === 'icon_assets_notes' || !data.subfolder) {
        return;
      }

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
    });

    return categories;
  }, [illustrationCollections]);

  const allIllustrationIcons = useMemo(() => {
    const iconList: IllustrationIconItem[] = [];

    Object.entries(illustrationCollections).forEach(([categoryKey, data]) => {
      if (categoryKey === 'icon_assets_notes' || !data.subfolder) {
        return;
      }

      Object.keys(allSvgModules)
        .filter((key) =>
          key.toLowerCase().startsWith(`/src/assets/icons/illust/${data.subfolder}/`.toLowerCase())
        )
        .forEach((moduleKey) => {
          const filename = moduleKey.split('/').pop()?.replace('.svg', '');
          if (filename) {
            iconList.push({ filename, category: categoryKey, subfolder: data.subfolder as string });
          }
        });
    });

    return iconList;
  }, [illustrationCollections]);

  const filteredIllustrations = useMemo(() => {
    return allIllustrationIcons.filter((icon) => {
      const matchesSearch = icon.filename.toLowerCase().includes(illustSearchQuery.toLowerCase());
      const matchesCategory = illustCategory.includes('All') || illustCategory.includes(icon.category);
      return matchesSearch && matchesCategory;
    });
  }, [allIllustrationIcons, illustCategory, illustSearchQuery]);

  const lineIconCount = lineIcons.length;
  const filledIconCount = filledIcons.length;
  const illustIconCount = filteredIllustrations.length;

  const handleIconClick = (
    name: string,
    category: IconCategory,
    filename: string,
    color: string,
    subfolder?: string
  ) => {
    setSelectedIcon({ name, category, filename, subfolder, color });
    setSheetConfig({ color, size: 20 });
    setIsSheetOpen(true);
  };

  const SvgPreview = selectedIcon
    ? getSvgComponentFromFilename(selectedIcon.filename, selectedIcon.category, selectedIcon.subfolder)
    : null;

  const usageCode = useMemo(() => {
    if (!selectedIcon) {
      return '';
    }

    const componentName = selectedIcon.filename
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const sizeClass =
      sheetConfig.size === 16
        ? 'w-4 h-4'
        : sheetConfig.size === 20
          ? 'w-5 h-5'
          : 'w-6 h-6';

    return `<${componentName} className="${sizeClass}" style={{ color: '${sheetConfig.color}' }} />`;
  }, [selectedIcon, sheetConfig.color, sheetConfig.size]);

  return (
    <div>
      <AnimatedTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="doc-content-stack"
      >
        <AnimatedTabsContent value="line">
          <div className="doc-content-stack">
            <h2 className="sr-only">라인 아이콘 (Line Icons)</h2>
            <IconSection
              iconList={lineIcons}
              categoryType="line"
              filenameMapping={filenameMapping.line_icons}
              searchQuery={lineSearchQuery}
              onIconClick={handleIconClick}
              searchInput={
                <SearchBar
                  placeholder={`${lineIconCount}개 아이콘 검색...`}
                  value={lineSearchQuery}
                  onChange={(event) => setLineSearchQuery(event.target.value)}
                />
              }
            />
          </div>
        </AnimatedTabsContent>

        <AnimatedTabsContent value="filled">
          <div className="doc-content-stack">
            <h2 className="sr-only">필드 아이콘 (Filled Icons)</h2>
            <IconSection
              iconList={filledIcons}
              categoryType="fill"
              filenameMapping={filenameMapping.filled_icons}
              searchQuery={filledSearchQuery}
              onIconClick={handleIconClick}
              searchInput={
                <SearchBar
                  placeholder={`${filledIconCount}개 아이콘 검색...`}
                  value={filledSearchQuery}
                  onChange={(event) => setFilledSearchQuery(event.target.value)}
                />
              }
            />
          </div>
        </AnimatedTabsContent>

        <AnimatedTabsContent value="illustration">
          <div className="doc-content-stack">
            <h2 className="sr-only">일러스트 아이콘 (Illustration Icons)</h2>

            <div className="flex items-center gap-2 w-full flex-wrap">
              <SmartFilterDropdown
                triggerText={
                  illustCategory.includes('All') || illustCategory.length === 0
                    ? '전체'
                    : illustCategory.length === 1
                      ? illustCategoryNames[illustCategory[0]] || illustCategory[0]
                      : `${illustCategory.length}개 선택됨`
                }
                items={Object.entries(illustCategoryNames).map(([key, label]) => ({ value: key, label }))}
                selectedValues={illustCategory}
                onSelectionChange={setIllustCategory}
              />
              <SearchBar
                placeholder={`${illustIconCount}개 아이콘 검색...`}
                value={illustSearchQuery}
                onChange={(event) => setIllustSearchQuery(event.target.value)}
              />
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-2">
              {filteredIllustrations.length > 0 ? (
                filteredIllustrations.map((icon, index) => {
                  const SvgComponent = getSvgComponentFromFilename(icon.filename, 'illust', icon.subfolder);
                  const defaultIllustColor = '#374151';

                  return (
                    <TooltipProvider key={`${icon.filename}-${index}`} delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card
                            className="shadow-none w-full aspect-square flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-all duration-200 hover:-translate-y-1"
                            onClick={() =>
                              handleIconClick(icon.filename, 'illust', icon.filename, defaultIllustColor, icon.subfolder)
                            }
                          >
                            <CardContent className="p-0">
                              {SvgComponent ? (
                                <SvgComponent className="w-8 h-8 text-foreground" />
                              ) : (
                                <span className="text-xs">N/A</span>
                              )}
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
                <p className="text-muted-foreground text-sm col-span-full">검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>

      {selectedIcon && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="bottom" className="sm:max-w-full" onOpenAutoFocus={(event) => event.preventDefault()}>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span className="font-mono text-lg">{selectedIcon.name}</span>
              </SheetTitle>
            </SheetHeader>

            <div className="py-6 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-secondary/30 rounded-lg border border-border p-4 md:p-6 gap-6">
                <DocSubsection title="프리뷰 크기" className="gap-3" contentClassName="gap-3">
                  <div className="flex items-end gap-4 justify-center md:justify-start flex-wrap">
                    {(selectedIcon.category === 'illust' ? [16, 20, 24, 28, 32, 40] : [16, 20, 24]).map((size) => (
                      <div
                        key={size}
                        className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${sheetConfig.size === size ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                        onClick={() => setSheetConfig((prev) => ({ ...prev, size }))}
                      >
                        <div
                          className={`flex items-center justify-center border border-black/5 bg-white rounded-md ${sheetConfig.size === size ? 'border-black' : ''}`}
                          style={{ width: size + 16, height: size + 16 }}
                        >
                          {SvgPreview && (
                            <SvgPreview width={size} height={size} style={{ color: sheetConfig.color }} />
                          )}
                        </div>
                        <span className={`text-xs font-mono ${sheetConfig.size === size ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                          {size}px
                        </span>
                      </div>
                    ))}
                  </div>
                </DocSubsection>

                {selectedIcon.category !== 'illust' && (
                  <DocSubsection title="아이콘 컬러" className="gap-3" contentClassName="gap-3">
                    <ColorPalette
                      purpose="icon"
                      onColorSelect={(color) => setSheetConfig((prev) => ({ ...prev, color }))}
                    />
                  </DocSubsection>
                )}
              </div>

              <div className="flex flex-col gap-6 flex-1">
                <DocSubsection title="메타 정보" className="gap-3" contentClassName="gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold block mb-1">카테고리</span>
                      <span className="capitalize">{selectedIcon.category}</span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1">파일명</span>
                      <span className="font-mono text-muted-foreground break-all">{selectedIcon.filename}</span>
                    </div>
                    {selectedIcon.subfolder && (
                      <div>
                        <span className="font-semibold block mb-1">서브폴더</span>
                        <span className="font-mono text-muted-foreground">{selectedIcon.subfolder}</span>
                      </div>
                    )}
                  </div>
                </DocSubsection>

                <DocSubsection title="사용 코드" className="gap-3" contentClassName="gap-3">
                  <div className="bg-muted p-4 rounded-md flex items-start sm:items-center justify-between gap-2 font-mono text-xs border border-border flex-col sm:flex-row">
                    <code className="break-all flex-1">{usageCode}</code>
                    <Clipboard value={usageCode} />
                  </div>
                </DocSubsection>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default IconDisplay;
