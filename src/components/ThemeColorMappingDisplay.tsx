import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);

  // Group name mapping for display
  const groupNames: Record<string, string> = {
    'brand': 'Brand',
    'neutral': 'Neutral',
    'request_status': 'Request Status',
    'avatar': 'Avatar',
    'foundations': 'Foundations'
  };

  const handleCategorySelection = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newSelection = selectedCategories.includes('All')
        ? [category]
        : selectedCategories.includes(category)
          ? selectedCategories.filter(c => c !== category)
          : [...selectedCategories, category];

      setSelectedCategories(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  const getDropdownTriggerText = () => {
    if (selectedCategories.includes('All') || selectedCategories.length === 0) {
      return '전체';
    }
    if (selectedCategories.length === 1) {
      return groupNames[selectedCategories[0]] || selectedCategories[0];
    }
    return `${selectedCategories.length}개 그룹`;
  };

  const findColorDataByVariable = (variableName: string) => {
    if (!variableName || typeof variableName !== 'string') return { shade: null, paletteFamily: null };

    const parts = variableName.split('_');

    // Handle simple color names like "color_white" or "color_black"
    if (parts.length === 2 && parts[0] === 'color') {
      const palette = colors.palette as Record<string, any[]>;

      // Search for the color in all palette families
      for (const paletteFamily in palette) {
        const shade = palette[paletteFamily].find(s =>
          s.variable && s.variable.toLowerCase() === variableName.toLowerCase()
        );
        if (shade) {
          return { shade, paletteFamily };
        }
      }
    }

    // Handle standard pattern: color_Family_Level
    if (parts.length < 3) return { shade: null, paletteFamily: null };

    const family = parts[1];
    const level = parts[2];

    const palette = colors.palette as Record<string, any[]>;

    for (const paletteFamily in palette) {
      if (paletteFamily.replace(/\s/g, '').toLowerCase() === family.toLowerCase()) {
        // Try exact match first
        let shade = palette[paletteFamily].find(s => String(s.level) === level);

        // If level is 'alpha' and not found, try matching level that contains 'alpha'
        if (!shade && level === 'alpha') {
          shade = palette[paletteFamily].find(s =>
            String(s.level).toLowerCase().includes('alpha')
          );
        }

        if (shade) {
          return { shade, paletteFamily };
        }
      }
    }
    return { shade: null, paletteFamily: null };
  };

  // Calculate filtered token count based on selected categories
  const filteredTokenCount = selectedCategories.includes('All')
    ? Object.values(colors.themeMapping).reduce((sum, mappings) => sum + Object.keys(mappings).length, 0)
    : Object.entries(colors.themeMapping)
      .filter(([category]) => selectedCategories.includes(category))
      .reduce((sum, [, mappings]) => sum + Object.keys(mappings).length, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-48 justify-between shadow-none">
              <span>{getDropdownTriggerText()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            <DropdownMenuItem onSelect={() => handleCategorySelection('All')}>전체</DropdownMenuItem>
            {Object.entries(groupNames).map(([key, name]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={selectedCategories.includes(key)}
                onCheckedChange={() => handleCategorySelection(key)}
              >
                {name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <SearchBar
          placeholder={`${filteredTokenCount}개 토큰 검색...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 px-4 text-xs h-auto">
                토큰
              </TableHead>
              <TableHead className="w-1/2 px-4 text-xs h-auto">
                매핑
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(colors.themeMapping).map(([category, mappings]) => {
              // Apply category filter
              if (!selectedCategories.includes('All') && !selectedCategories.includes(category)) {
                return null;
              }

              const filteredEntries = Object.entries(mappings).filter(([themeVar, rawVar]) => {
                const term = searchTerm.toLowerCase();
                return themeVar.toLowerCase().includes(term) || (rawVar as string).toLowerCase().includes(term);
              });

              if (filteredEntries.length === 0) return null;

              return (
                <React.Fragment key={category}>

                  {/* Token Rows */}
                  {filteredEntries.map(([themeVar, rawVar]) => {
                    const { shade: color, paletteFamily } = findColorDataByVariable(rawVar as string);

                    let rawTokenName = rawVar as string;
                    if (color && paletteFamily) {
                      const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
                      rawTokenName = `$color_${paletteFamily.toLowerCase().replace(/\s/g, '_')}_${displayLevel}`;
                    }

                    return (
                      <TableRow key={themeVar} className="group">
                        <TableCell className="px-4 font-mono text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {color ? (() => {
                              const isAlpha = themeVar.toLowerCase().includes('alpha');
                              let chipStyle: React.CSSProperties = {};

                              if (isAlpha) {
                                // For alpha tokens, use checkered pattern background with alpha color overlay
                                // Add white background layer at the bottom to isolate from row hover effects
                                const opacity = 0.1; // 10% opacity for alpha tokens
                                const rgbaColor = color.rgb.replace('rgb', 'rgba').replace(')', `, ${opacity})`);

                                chipStyle = {
                                  backgroundImage: `
                                    linear-gradient(${rgbaColor}, ${rgbaColor}),
                                    linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
                                    linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
                                    linear-gradient(#fff, #fff)
                                  `,
                                  backgroundSize: `100%, 8px 8px, 8px 8px, 100%`,
                                  backgroundPosition: `0 0, 0 0, 4px 4px, 0 0`
                                };
                              } else {
                                chipStyle = { backgroundColor: color.hex };
                              }

                              return <div className="w-5 h-5 rounded-full border border-black/10" style={chipStyle}></div>;
                            })() : (
                              <div className="w-5 h-5 rounded-full bg-gray-200 border border-black/10"></div>
                            )}
                            <span className="text-primary">
                              $<HighlightText text={themeVar} highlight={searchTerm} />
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 font-mono text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <span><HighlightText text={rawTokenName} highlight={searchTerm} /></span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ThemeColorMappingDisplay;