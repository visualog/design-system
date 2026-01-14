import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';
import { Switch } from "./ui/switch"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

// --- Reusable Color Swatch (already exists) ---
interface ColorProps {
  level: string; // Changed from name to level
  hex: string;
  hexDark?: string;
  variable: string;
  rgb: string;
  familyName: string;
}

const ColorSwatch: React.FC<ColorProps & { isDarkMode?: boolean }> = ({ level, hex, hexDark, rgb, familyName, isDarkMode }) => {
  let finalStyle: React.CSSProperties = {};

  // Define displayHex first
  let displayHex = isDarkMode ? hexDark : hex;

  // Check if color is valid for current mode
  if (!displayHex) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-sm">
            <span className="material-symbols-rounded text-gray-200 text-xs" style={{ fontVariationSettings: "'wght' 300" }}>
              -
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">Defined only in {isDarkMode ? 'Light' : 'Dark'} Mode</div>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Determine if alpha based on family name or level format or hex length
  const isAlpha =
    (level && (level.toLowerCase().includes('alpha') || level.includes('%'))) ||
    familyName.toLowerCase().includes('alpha') ||
    (displayHex && displayHex.length === 9); // #RRGGBBAA

  if (isAlpha) {
    // Calculate opacity
    let opacity = 1;

    // Try to get opacity from Hex first (most accurate)
    if (displayHex && displayHex.length === 9) {
      const alphaHex = displayHex.substring(7, 9);
      opacity = parseInt(alphaHex, 16) / 255;
    }
    // Fallback to level parsing (e.g. "10" -> 10% for Alpha families)
    else if (level.match(/\((\d+)%\)/)) {
      const match = level.match(/\((\d+)%\)/);
      if (match && match[1]) opacity = parseInt(match[1], 10) / 100;
    }
    else if (/^\d+$/.test(level) && familyName.toLowerCase().includes('alpha')) {
      // Assume level 10 = 10% etc for Alpha families
      opacity = parseInt(level, 10) / 100;
    }

    // Construct RGBA for gradient
    let r = 0, g = 0, b = 0;
    // Use hex to rgb conversion if possible, or fallback to provided rgb prop (which might be solid black)
    // If displayHex is available, use it.
    if (displayHex && displayHex.length >= 7) {
      r = parseInt(displayHex.substring(1, 3), 16);
      g = parseInt(displayHex.substring(3, 5), 16);
      b = parseInt(displayHex.substring(5, 7), 16);
    } else {
      // Fallback to parsing rgb string "rgb(0, 0, 0)"
      const rgbMatch = rgb.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        r = parseInt(rgbMatch[0], 10);
        g = parseInt(rgbMatch[1], 10);
        b = parseInt(rgbMatch[2], 10);
      }
    }

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;

    finalStyle = {
      backgroundImage: `
            linear-gradient(${rgbaColor}, ${rgbaColor}),
            linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
            linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
            linear-gradient(#fff, #fff)
          `,
      backgroundSize: `100%, 16px 16px, 16px 16px, 100%`,
      backgroundPosition: `0 0, 0 0, 8px 8px, 0 0`
    };
  } else {
    // Solid color
    finalStyle = { backgroundColor: displayHex };
  }

  const displayLevel = String(level).replace(/\s\(.*\)/, '');

  // Clean token name logic
  // "DeepBlue" -> "Deep Blue"
  // But we want to preserve original key if possible?
  // User asked to match Primitives.md which uses "Blue/10".
  // familyName passed from grid loop is the key (e.g. "BlackAlpha", "Blue").
  // So we can just use familyName directly.

  const tokenName = `${familyName}/${displayLevel}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="w-full h-full relative group rounded-sm"
          style={finalStyle}
        >
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-1 text-center p-1">
          <span className="font-mono text-xs">{tokenName}</span>
          <span className="font-bold">{displayHex}</span>
          {isDarkMode && hexDark && <span className="text-[10px] text-gray-400">(Dark)</span>}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

// --- New Grid-based Display Component ---
const ColorGrid: React.FC<{
  families: [string, any[]][];
  levels: string[];
  iconlessEmptyLevels?: string[];
  hiddenHeaderLevels?: string[];
  hideHeaderRow?: boolean; // Added prop
  isDarkMode?: boolean;
}> = ({ families, levels, iconlessEmptyLevels, hiddenHeaderLevels, hideHeaderRow, isDarkMode }) => (
  <div className="flex flex-col gap-2 w-full">
    {/* Header Row */}
    {!hideHeaderRow && (
      <div className="flex items-center gap-1">
        <div className="w-24 flex-shrink-0" /> {/* Empty cell for color family name column */}
        <div className="flex-1 flex gap-1">
          {levels.map(level => {
            const displayLevel = level === 'alpha (10%)' ? '10%' : level;
            return (
              <div key={level} className="flex-1 flex items-center justify-center text-[10px] md:text-xs font-medium text-gray-400 min-w-0">
                {hiddenHeaderLevels?.includes(level) ? '' : displayLevel}
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* Color Family Rows */}
    {families.map(([familyName, shades]) => (
      <div key={familyName} className="flex items-stretch gap-1">
        <div className="w-24 flex-shrink-0 flex items-center text-sm capitalize text-foreground break-words">
          {familyName.replace(/([A-Z])/g, ' $1').trim()}
        </div>
        <div className="flex-1 flex gap-1">
          {levels.map(level => {
            const shade = shades.find(s => {
              let normalizedShadeLevel = String(s.level);
              const numericPercentageMatch = String(s.level).match(/^(\d+)\s\((\d+)%\)/); // Matches "10 (10%)"
              if (numericPercentageMatch) {
                normalizedShadeLevel = numericPercentageMatch[1]; // Extracts "10"
              }
              return normalizedShadeLevel === level;
            });
            return (
              <div key={`${familyName}-${level}`} className="flex-1 aspect-square min-w-0">
                {shade ? <ColorSwatch {...shade} familyName={familyName} isDarkMode={isDarkMode} /> : (
                  iconlessEmptyLevels?.includes(level) ? <div /> : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-sm">
                      <span className="material-symbols-rounded text-gray-200 text-xs" style={{ fontVariationSettings: "'wght' 300" }}>
                        -
                      </span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

// Helper to capitalize first letter


// --- New component for the Tokens table ---
const TokensDisplay: React.FC<{ colors: any; searchTerm: string; isDarkMode: boolean }> = ({ colors, searchTerm, isDarkMode }) => (
  <div className="overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2 px-4 text-xs h-auto">
            토큰명
          </TableHead>
          <TableHead className="w-1/2 px-4 text-xs h-auto">
            값
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(colors)
          .sort(([a], [b]) => {
            const tableOrder = ['Blue', 'Gray', 'Red', 'Orange', 'YellowOrange', 'Green', 'DeepGreen', 'Cyan', 'LightBlue', 'DeepBlue', 'Purple', 'Pink', 'CoolGray', 'BlackAlpha'];
            const idxA = tableOrder.indexOf(a);
            const idxB = tableOrder.indexOf(b);
            const valA = idxA === -1 ? 999 : idxA;
            const valB = idxB === -1 ? 999 : idxB;
            return valA - valB;
          })
          .flatMap(([colorFamily, shades]) =>
            (shades as any[]).map((color: any, index: number) => {
              let finalChipStyle: React.CSSProperties = {};

              let displayHex = isDarkMode ? color.hexDark : color.hex;

              // Handle missing color for current mode
              if (!displayHex) {
                return null;
              }

              const levelString = String(color.level).toLowerCase();

              const isAlpha =
                colorFamily.toLowerCase().includes('alpha') ||
                levelString.includes('alpha') ||
                levelString.includes('%') ||
                (displayHex && displayHex.length === 9);

              if (isAlpha) {
                let opacity = 1;
                if (displayHex && displayHex.length === 9) {
                  const alphaHex = displayHex.substring(7, 9);
                  opacity = parseInt(alphaHex, 16) / 255;
                }
                else if (levelString.match(/\((\d+)%\)/)) {
                  const match = levelString.match(/\((\d+)%\)/);
                  if (match && match[1]) opacity = parseInt(match[1], 10) / 100;
                }
                else if (/^\d+$/.test(levelString) && colorFamily.toLowerCase().includes('alpha')) {
                  opacity = parseInt(levelString, 10) / 100;
                }

                let r = 0, g = 0, b = 0;
                if (displayHex && displayHex.length >= 7) {
                  r = parseInt(displayHex.substring(1, 3), 16);
                  g = parseInt(displayHex.substring(3, 5), 16);
                  b = parseInt(displayHex.substring(5, 7), 16);
                } else {
                  // Fallback to parsing rgb string
                  const rgbMatch = color.rgb.match(/\d+/g);
                  if (rgbMatch && rgbMatch.length >= 3) {
                    r = parseInt(rgbMatch[0], 10);
                    g = parseInt(rgbMatch[1], 10);
                    b = parseInt(rgbMatch[2], 10);
                  }
                }

                const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;

                finalChipStyle = {
                  backgroundImage: `
                      linear-gradient(${rgbaColor}, ${rgbaColor}),
                      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
                      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
                      linear-gradient(#fff, #fff)
                    `,
                  backgroundSize: `100%, 16px 16px, 16px 16px, 100%`,
                  backgroundPosition: `0 0, 0 0, 8px 8px, 0 0`
                };
              } else {
                finalChipStyle = { backgroundColor: displayHex };
              }

              const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
              const tokenName = `${colorFamily}/${displayLevel}`;

              return (
                <TableRow key={`${colorFamily}-${index}`} className="bg-white">
                  <TableCell className="px-4 font-mono text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-black/10" style={finalChipStyle}></div>
                      <span><HighlightText text={tokenName} highlight={searchTerm} /></span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-mono"><HighlightText text={displayHex} highlight={searchTerm} /></span>
                      {isDarkMode && color.hexDark && <span className="text-[10px] text-gray-400 ml-1">(Dark)</span>}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
      </TableBody>
    </Table>
  </div>
);


// --- Main component, restructured ---
interface ColorPaletteDisplayProps {
  view?: 'all' | 'grid' | 'table';
}

const ColorPaletteDisplay: React.FC<ColorPaletteDisplayProps> = ({ view = 'all' }) => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(['All']);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const allShades = Object.values(colors.palette).flat();
  const allLevels = [...new Set(allShades.map((s: any) => s.level))];

  const scaleOrder = ['Blue', 'Red', 'Orange', 'YellowOrange', 'Green', 'DeepGreen', 'Cyan', 'LightBlue', 'DeepBlue', 'Purple', 'Pink', 'CoolGray'];
  const tableOrder = ['Blue', 'Gray', 'Red', 'Orange', 'YellowOrange', 'Green', 'DeepGreen', 'Cyan', 'LightBlue', 'DeepBlue', 'Purple', 'Pink', 'CoolGray', 'BlackAlpha'];

  const grayFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase() === 'gray');
  const alphaFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase().includes('alpha'));
  const chromaticFamilies = Object.entries(colors.palette)
    .filter(([family]) => family.toLowerCase() !== 'gray' && !family.toLowerCase().includes('alpha'))
    .sort(([a], [b]) => {
      const idxA = scaleOrder.indexOf(a);
      const idxB = scaleOrder.indexOf(b);
      // If not found, put at end
      const valA = idxA === -1 ? 999 : idxA;
      const valB = idxB === -1 ? 999 : idxB;
      return valA - valB;
    });

  const sortedLevels = allLevels.sort((a: any, b: any) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (a === 'white') return -1;
    if (b === 'white') return 1;
    if (a.includes('alpha') && !b.includes('alpha')) return 1;
    if (!a.includes('alpha') && b.includes('alpha')) return -1;
    return a.localeCompare(b);
  });

  const nonAlphaLevels = sortedLevels.filter((level: any) => !level.toLowerCase().includes('alpha') && !level.includes('%'));
  const grayDisplayLevels = [...nonAlphaLevels, 'alpha (10%)'];



  const handleFamilySelection = (family: string) => {
    if (family === 'All') {
      setSelectedFamilies(['All']);
      return;
    }

    let newSelection = selectedFamilies.filter(f => f !== 'All');

    if (newSelection.includes(family)) {
      newSelection = newSelection.filter(f => f !== family);
    } else {
      newSelection.push(family);
    }

    if (newSelection.length === 0) {
      setSelectedFamilies(['All']);
    } else {
      setSelectedFamilies(newSelection);
    }
  };

  // Filtering logic for TokensDisplay
  const filteredColors = Object.entries(colors.palette)
    .filter(([family]) => selectedFamilies.includes('All') || selectedFamilies.includes(family))
    .reduce((acc, [family, shades]) => {
      const filteredShades = (shades as any[]).filter((color: any) => {
        const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
        let finalDisplayLevel = displayLevel;
        // Only add _10 suffix for Black alpha tokens
        if (finalDisplayLevel === 'alpha' && family.toLowerCase().includes('black')) {
          finalDisplayLevel = 'alpha_10';
        }

        // Clean token logic for filtering
        const tokenName = `${family}/${displayLevel}`;

        let displayHex = color.hex;
        const levelString = String(color.level).toLowerCase();
        const isAlpha = family.toLowerCase().includes('alpha') || levelString.includes('alpha') || levelString.includes('%');
        if (isAlpha) {
          const opacityMatch = String(color.level).match(/\((\d+)%\)/);
          if (opacityMatch && opacityMatch[1]) {
            const opacityValue = parseInt(opacityMatch[1], 10);
            const alphaHex = Math.round(opacityValue * 2.55).toString(16).padStart(2, '0').toUpperCase();
            displayHex = `${color.hex}${alphaHex}`;
          }
        }

        const searchTermLower = searchTerm.toLowerCase();
        const orGroups = searchTermLower.split(',').map(g => g.trim()).filter(g => g.length > 0);

        // If no terms, match all
        if (orGroups.length === 0) return true;

        // Match if ANY OR-group is satisfied
        return orGroups.some(group => {
          const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
          if (andTerms.length === 0) return true;

          return andTerms.every(term =>
            tokenName.toLowerCase().includes(term) ||
            displayHex.toLowerCase().includes(term)
          );
        });
      });

      if (filteredShades.length > 0) {
        acc[family] = filteredShades;
      }
      return acc;
    }, {} as Record<string, any[]>);

  const tokenCount = Object.values(filteredColors).flat().filter((color: any) => {
    return isDarkMode ? !!color.hexDark : !!color.hex;
  }).length;
  // const placeholderText = `Search ${tokenCount} tokens...`; // Unused

  const getDropdownTriggerText = () => {
    if (selectedFamilies.includes('All') || selectedFamilies.length === 0) {
      return '전체';
    }
    if (selectedFamilies.length === 1) {
      return selectedFamilies[0];
    }
    return `${selectedFamilies.length}개 선택됨`;
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Visual Grids - Show if view is 'all' or 'grid' */}
      {view !== 'table' && (
        <div className="mt-4 flex flex-col gap-6">
          {/* Master Header Row with Toggle */}
          <div className="flex items-center gap-1">
            <div className="w-24 flex-shrink-0 flex items-center justify-start pl-1">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  id="dark-mode"
                  className="h-5 w-9"
                />
                <label htmlFor="dark-mode" className="text-xs font-medium leading-none cursor-pointer whitespace-nowrap text-gray-500">
                  {isDarkMode ? 'Dark' : 'Light'}
                </label>
              </div>
            </div>
            <div className="flex-1 flex gap-1">
              {grayDisplayLevels.map(level => { // Use grayDisplayLevels as the superset (White...10%)
                const displayLevel = level === 'alpha (10%)' ? '10%' : level;
                return (
                  <div key={level} className="flex-1 flex items-center justify-center text-[10px] md:text-xs font-medium text-gray-400 min-w-0">
                    {displayLevel}
                  </div>
                )
              })}
            </div>
          </div>

          {/* --- Chromatic Section --- */}
          <section className="flex flex-col gap-4">
            <ColorGrid
              families={chromaticFamilies}
              levels={grayDisplayLevels} // Use common superset
              iconlessEmptyLevels={[]} // Hide empty slots only for white
              hiddenHeaderLevels={[]} // Not used since hideHeaderRow is true
              hideHeaderRow={true} // Use master header
              isDarkMode={isDarkMode}
            />
          </section>

          {/* --- Gray Section --- */}
          <section className="flex flex-col gap-4">
            <ColorGrid
              families={grayFamilies}
              levels={grayDisplayLevels}
              iconlessEmptyLevels={[]}
              hiddenHeaderLevels={[]}
              hideHeaderRow={true}
              isDarkMode={isDarkMode}
            />
          </section>

          {/* --- Alpha Section --- */}
          <section className="flex flex-col gap-4">
            <ColorGrid
              families={alphaFamilies}
              levels={grayDisplayLevels}
              hiddenHeaderLevels={['white', '100', 'alpha (10%)']}
              iconlessEmptyLevels={[]}
              hideHeaderRow={true}
              isDarkMode={isDarkMode}
            />
          </section>
        </div>
      )}

      {/* Tokens Table - Show if view is 'all' or 'table' */}
      {view !== 'grid' && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 justify-between shadow-none">
                  <span>{getDropdownTriggerText()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 max-h-64 overflow-y-auto">
                <DropdownMenuItem onSelect={() => handleFamilySelection('All')}>전체</DropdownMenuItem>
                {Object.keys(colors.palette)
                  .sort((a, b) => {
                    const idxA = tableOrder.indexOf(a);
                    const idxB = tableOrder.indexOf(b);
                    const valA = idxA === -1 ? 999 : idxA;
                    const valB = idxB === -1 ? 999 : idxB;
                    return valA - valB;
                  })
                  .map(family => (
                    <DropdownMenuCheckboxItem
                      key={family}
                      checked={selectedFamilies.includes(family)}
                      onCheckedChange={() => handleFamilySelection(family)}
                      className="capitalize"
                    >
                      {family}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <SearchBar
              placeholder={`${tokenCount}개 토큰 검색...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex items-center gap-2 ml-auto">
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                id="dark-mode-table"
              />
              <label htmlFor="dark-mode-table" className="text-xs font-medium leading-none cursor-pointer whitespace-nowrap text-gray-500">
                {isDarkMode ? 'Dark' : 'Light'}
              </label>
            </div>
          </div>
          <TokensDisplay colors={filteredColors} searchTerm={searchTerm} isDarkMode={isDarkMode} />
        </section>
      )
      }
    </div >
  );
};

export default ColorPaletteDisplay;