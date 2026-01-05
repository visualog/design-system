import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';

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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { ChevronDown, X } from 'lucide-react';

// --- Reusable Color Swatch (already exists) ---
interface ColorProps {
  level: string; // Changed from name to level
  hex: string;
  variable: string;
  rgb: string;
  familyName: string;
}

const ColorSwatch: React.FC<ColorProps> = ({ level, hex, rgb, familyName }) => {
  let finalStyle: React.CSSProperties = {};
  const isAlpha = level && (level.toLowerCase().includes('alpha') || level.includes('%'));
  let displayHex = hex;

  if (isAlpha) {
    const opacityMatch = level.match(/\((\d+)%\)/);
    if (opacityMatch && opacityMatch[1]) {
      const opacityValue = parseInt(opacityMatch[1], 10);
      const opacity = opacityValue / 100;
      const rgbaColor = rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);

      finalStyle = {
        backgroundImage: `
              linear-gradient(${rgbaColor}, ${rgbaColor}),
              linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
              linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)
            `,
        backgroundSize: `100%, 16px 16px, 16px 16px`,
        backgroundPosition: `0 0, 0 0, 8px 8px`
      };

      const alphaHex = Math.round(opacityValue * 2.55).toString(16).padStart(2, '0').toUpperCase();
      displayHex = `${hex}${alphaHex}`;

    } else {
      finalStyle = { backgroundColor: rgb };
    }
  } else {
    finalStyle = { backgroundColor: rgb };
  }

  const displayLevel = String(level).replace(/\s\(.*\)/, '');
  let finalDisplayLevel = displayLevel;
  if (finalDisplayLevel === 'alpha') {
    finalDisplayLevel = 'alpha_10';
  }
  const formattedFamily = familyName.toLowerCase().replace(/\s/g, '_');
  const capitalizedFormattedFamily = formattedFamily.split('_').map(word => capitalizeFirstLetter(word)).join('_');
  const tokenName = `$color_${capitalizedFormattedFamily}_${finalDisplayLevel}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="w-12 h-12 relative group"
          style={finalStyle}
        >
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-1 text-center p-1">
          <span className="font-mono text-xs">{tokenName}</span>
          <span className="font-bold">{displayHex}</span>
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
}> = ({ families, levels, iconlessEmptyLevels, hiddenHeaderLevels }) => (
  <div className="grid items-center gap-0.5" style={{ gridTemplateColumns: `minmax(7.5rem, auto) repeat(${levels.length}, 3rem)` }}>
    {/* Header Row */}
    <div /> {/* Empty cell for color family name column */}
    {levels.map(level => {
      const displayLevel = level === 'alpha (10%)' ? '10%' : level;
      return (
        <div key={level} className="w-12 h-6 flex items-center justify-center text-xs font-medium text-gray-400">
          {hiddenHeaderLevels?.includes(level) ? '' : displayLevel}
        </div>
      );
    })}

    {/* Color Family Rows */}
    {families.map(([familyName, shades]) => (
      <React.Fragment key={familyName}>
        <div className="text-sm capitalize text-gray-400">{familyName.replace(/([A-Z])/g, ' $1').trim()}</div>
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
            <div key={`${familyName}-${level}`} className="w-12 h-12 flex items-center justify-center">
              {shade ? <ColorSwatch {...shade} familyName={familyName} /> : (
                iconlessEmptyLevels?.includes(level) ? <div /> : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-rounded text-gray-200 text-lg" style={{ fontVariationSettings: "'wght' 300" }}>
                      format_color_reset
                    </span>
                  </div>
                )
              )}
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </div>
);

// Helper to capitalize first letter
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// --- New component for the Tokens table ---
const TokensDisplay: React.FC<{ colors: any }> = ({ colors }) => (
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
        {Object.entries(colors).flatMap(([colorFamily, shades]) =>
          (shades as any[]).map((color: any, index: number) => {
            let finalChipStyle: React.CSSProperties = { backgroundColor: color.hex }; // Default style
            let displayHex = color.hex;
            const levelString = String(color.level).toLowerCase();

            const isAlpha = colorFamily.toLowerCase().includes('alpha') || levelString.includes('alpha') || levelString.includes('%');

            if (isAlpha) {
              const opacityMatch = String(color.level).match(/\((\d+)%\)/);
              if (opacityMatch && opacityMatch[1]) {
                const opacityValue = parseInt(opacityMatch[1], 10);
                const rgbaColor = color.rgb.replace('rgb', 'rgba').replace(')', `, ${opacityValue / 100})`);

                finalChipStyle = {
                  backgroundImage: `
                      linear-gradient(${rgbaColor}, ${rgbaColor}),
                      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
                      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)
                    `,
                  backgroundSize: `100%, 16px 16px, 16px 16px`,
                  backgroundPosition: `0 0, 0 0, 8px 8px`
                };

                const alphaHex = Math.round(opacityValue * 2.55).toString(16).padStart(2, '0').toUpperCase();
                displayHex = `${color.hex}${alphaHex}`;
              }
            } else {
              finalChipStyle = { backgroundColor: color.hex };
            }

            const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
            let finalDisplayLevel = displayLevel;

            if (finalDisplayLevel === 'alpha') {
              finalDisplayLevel = 'alpha_10';
            }

            const formattedFamily = colorFamily.toLowerCase().replace(/\s/g, '_');
            const capitalizedFormattedFamily = formattedFamily.split('_').map(word => capitalizeFirstLetter(word)).join('_');
            const tokenName = `$color_${capitalizedFormattedFamily}_${finalDisplayLevel}`;

            return (
              <TableRow key={`${colorFamily}-${index}`} className="bg-white">
                <TableCell className="px-4 font-mono text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-black/10" style={finalChipStyle}></div>
                    <span>{tokenName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-mono">{displayHex}</span>
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
const ColorPaletteDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(['All']);

  const allShades = Object.values(colors.palette).flat();
  const allLevels = [...new Set(allShades.map(s => s.level))];

  const grayFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase() === 'gray');
  const alphaFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase().includes('alpha'));
  const chromaticFamilies = Object.entries(colors.palette).filter(([family]) =>
    !family.toLowerCase().includes('gray') && !family.toLowerCase().includes('alpha')
  );

  const sortedLevels = allLevels.sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    if (a === 'white') return -1;
    if (b === 'white') return 1;
    if (a.includes('alpha') && !b.includes('alpha')) return 1;
    if (!a.includes('alpha') && b.includes('alpha')) return -1;
    return a.localeCompare(b);
  });

  const nonAlphaLevels = sortedLevels.filter(level => !level.toLowerCase().includes('alpha') && !level.includes('%'));
  const grayDisplayLevels = [...nonAlphaLevels, 'alpha (10%)'];

  const chromaticOnlyLevels = sortedLevels.filter(level =>
    ((!level.toLowerCase().includes('alpha') && !level.includes('%')) || level === 'alpha (10%)')
  );

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
      const filteredShades = shades.filter((color: any) => {
        const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
        let finalDisplayLevel = displayLevel;
        if (finalDisplayLevel === 'alpha') {
          finalDisplayLevel = 'alpha_10';
        }
        const formattedFamily = family.toLowerCase().replace(/\s/g, '_');
        const capitalizedFormattedFamily = formattedFamily.split('_').map(word => capitalizeFirstLetter(word)).join('_');
        const tokenName = `$color_${capitalizedFormattedFamily}_${finalDisplayLevel}`;

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
        return tokenName.toLowerCase().includes(searchTermLower) || displayHex.toLowerCase().includes(searchTermLower);
      });

      if (filteredShades.length > 0) {
        acc[family] = filteredShades;
      }
      return acc;
    }, {} as Record<string, any[]>);

  const tokenCount = Object.values(filteredColors).flat().length;
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

      {/* --- Gray Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Gray</h3>
        <ColorGrid families={grayFamilies} levels={grayDisplayLevels} iconlessEmptyLevels={['alpha (10%)']} hiddenHeaderLevels={['alpha (10%)']} />
      </section>

      {/* --- Chromatic Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Chromatic</h3>
        <ColorGrid families={chromaticFamilies} levels={chromaticOnlyLevels} iconlessEmptyLevels={['white']} hiddenHeaderLevels={['white']} />
      </section>

      {/* --- Alpha Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Alpha</h3>
        <ColorGrid families={alphaFamilies} levels={grayDisplayLevels} hiddenHeaderLevels={['white', '100', 'alpha (10%)']} iconlessEmptyLevels={['white', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', 'alpha (10%)']} />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">토큰</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                placeholder={`${tokenCount}개 토큰 검색...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 shadow-none pr-9"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-48 justify-between shadow-none">
                  <span>{getDropdownTriggerText()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto">
                <DropdownMenuItem onSelect={() => handleFamilySelection('All')}>전체</DropdownMenuItem>
                {Object.keys(colors.palette).map(family => (
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
          </div>
        </div>
        <TokensDisplay colors={filteredColors} />
      </section>
    </div>
  );
};

export default ColorPaletteDisplay;