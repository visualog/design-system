import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import ColorSwatch from '@/components/ui/ColorSwatch';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';
import { Switch } from "./ui/switch"
import { SmartFilterDropdown } from '@/components/ui/SmartFilterDropdown';

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

// --- New Grid-based Display Component ---
const ColorGrid: React.FC<{
  families: [string, any[]][];
  levels: string[];
  iconlessEmptyLevels?: string[];
  hiddenHeaderLevels?: string[];
  hideHeaderRow?: boolean;
  isDarkMode?: boolean;
}> = ({ families, levels, iconlessEmptyLevels, hiddenHeaderLevels, hideHeaderRow, isDarkMode }) => (
  <div className="flex flex-col gap-2 w-full">
    {/* Header Row */}
    {!hideHeaderRow && (
      <div className="flex items-center gap-1">
        <div className="w-24 flex-shrink-0" />
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
              const numericPercentageMatch = String(s.level).match(/^(\d+)\s\((\d+)%\)/);
              if (numericPercentageMatch) {
                normalizedShadeLevel = numericPercentageMatch[1];
              }
              return normalizedShadeLevel === level;
            });
            return (
              <div key={`${familyName}-${level}`} className="flex-1 aspect-square min-w-0">
                {shade ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full h-full">
                        <ColorSwatch
                          colorValue={isDarkMode ? (shade.hexDark || shade.hex) : shade.hex}
                          size="xs"
                          className="w-full h-full"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex flex-col gap-1 text-center p-1">
                        <span className="font-mono text-xs">{familyName}/{String(shade.level).replace(/\s\(.*\)/, '')}</span>
                        <span className="font-bold">{isDarkMode ? (shade.hexDark || shade.hex) : shade.hex}</span>
                        {isDarkMode && shade.hexDark && <span className="text-[10px] text-gray-400">(Dark)</span>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ) : (
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
              const displayHex = isDarkMode ? (color.hexDark || color.hex) : color.hex;
              const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
              const tokenName = `${colorFamily}/${displayLevel}`;

              return (
                <TableRow key={`${colorFamily}-${index}`} className="bg-white">
                  <TableCell className="px-4 font-mono text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ColorSwatch
                        colorValue={displayHex}
                        size="md"
                        className="rounded-full border-black/10"
                      />
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



  const filteredColors = Object.entries(colors.palette)
    .filter(([family]) => selectedFamilies.includes('All') || selectedFamilies.includes(family))
    .reduce((acc, [family, shades]) => {
      const filteredShades = (shades as any[]).filter((color: any) => {
        const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
        const tokenName = `${family}/${displayLevel}`;
        let displayHex = color.hex;

        const searchTermLower = searchTerm.toLowerCase();
        const orGroups = searchTermLower.split(',').map(g => g.trim()).filter(g => g.length > 0);

        if (orGroups.length === 0) return true;

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
      {view !== 'table' && (
        <div className="mt-4 flex flex-col gap-6">
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
              {grayDisplayLevels.map(level => {
                const displayLevel = level === 'alpha (10%)' ? '10%' : level;
                return (
                  <div key={level} className="flex-1 flex items-center justify-center text-[10px] md:text-xs font-medium text-gray-400 min-w-0">
                    {displayLevel}
                  </div>
                )
              })}
            </div>
          </div>

          <section className="flex flex-col gap-4">
            <ColorGrid
              families={chromaticFamilies}
              levels={grayDisplayLevels}
              iconlessEmptyLevels={[]}
              hiddenHeaderLevels={[]}
              hideHeaderRow={true}
              isDarkMode={isDarkMode}
            />
          </section>

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

      {view !== 'grid' && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SmartFilterDropdown
              triggerText={getDropdownTriggerText()}
              items={Object.keys(colors.palette)
                .sort((a, b) => {
                  const idxA = tableOrder.indexOf(a);
                  const idxB = tableOrder.indexOf(b);
                  const valA = idxA === -1 ? 999 : idxA;
                  const valB = idxB === -1 ? 999 : idxB;
                  return valA - valB;
                })
                .map(family => ({ value: family, label: family }))}
              selectedValues={selectedFamilies}
              onSelectionChange={setSelectedFamilies}
              width="w-40"
            />
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
      )}
    </div>
  );
};

export default ColorPaletteDisplay;