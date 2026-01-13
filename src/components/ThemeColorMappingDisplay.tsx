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
  const [selectedAvatarGroup, setSelectedAvatarGroup] = useState('All');

  // Group name mapping for display
  const groupNames: Record<string, string> = {
    'brand': 'Brand',
    'neutral': 'Neutral',
    'error': 'Error',
    'loading': 'Loading',
    'success': 'Success',
    'avatar': 'Avatar'
  };

  const handleCategorySelection = (category: string) => {
    // Reset avatar sub-filter when changing main category
    if (category !== 'avatar') {
      setSelectedAvatarGroup('All');
    }

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

  // Extract unique avatar groups
  const avatarTokens = colors.themeMapping['avatar'] || {};
  const uniqueAvatarGroups = Array.from(new Set(
    Object.keys(avatarTokens).map(key => {
      // color_avatar_red_20 -> red
      // color_avatar_cool_gray_20 -> cool gray
      const parts = key.replace(/^color_avatar_/, '').split('_');
      parts.pop(); // Remove level
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    })
  )).sort();

  const getAvatarDropdownText = () => {
    return selectedAvatarGroup === 'All' ? '전체 색상' : selectedAvatarGroup;
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
    // NEW LOGIC: Try to find by direct variable match in semantic/palette data first
    // This supports the new "Family/Level" format (e.g. "Blue/10") directly
    const palette = colors.palette as Record<string, any[]>;
    for (const paletteFamily in palette) {
      const shade = palette[paletteFamily].find(s => s.variable === variableName);
      if (shade) {
        return { shade, paletteFamily };
      }
    }

    // LEGACY LOGIC: Handle standard pattern: color_Family_Level
    if (parts.length >= 3) {
      const family = parts[1];
      const level = parts[2];

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
            <Button variant="outline" className="w-40 justify-between shadow-none">
              <span>{getDropdownTriggerText()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 max-h-64 overflow-y-auto">
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

        {/* Secondary Dropdown for Avatar Groups */}
        {selectedCategories.length === 1 && selectedCategories[0] === 'avatar' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40 justify-between shadow-none">
                <span>{getAvatarDropdownText()}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 max-h-64 overflow-y-auto">
              <DropdownMenuItem onSelect={() => setSelectedAvatarGroup('All')}>전체 색상</DropdownMenuItem>
              {uniqueAvatarGroups.map(group => (
                <DropdownMenuCheckboxItem
                  key={group}
                  checked={selectedAvatarGroup === group}
                  onCheckedChange={() => setSelectedAvatarGroup(selectedAvatarGroup === group ? 'All' : group)}
                >
                  {group}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

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
                토큰명
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
                // Primary Filter: Search Term
                const term = searchTerm.toLowerCase();
                const matchesSearch = themeVar.toLowerCase().includes(term) || (rawVar as string).toLowerCase().includes(term);
                if (!matchesSearch) return false;

                // Secondary Filter: Avatar Group
                if (category === 'avatar' && selectedAvatarGroup !== 'All') {
                  const parts = themeVar.replace(/^color_avatar_/, '').split('_');
                  parts.pop();
                  const group = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
                  if (group !== selectedAvatarGroup) return false;
                }

                return true;
              });

              if (filteredEntries.length === 0) return null;

              return (
                <React.Fragment key={category}>

                  {/* Token Rows */}
                  {filteredEntries.map(([themeVar, rawVar]) => {
                    const { shade: color, paletteFamily } = findColorDataByVariable(rawVar as string);

                    // Format Raw Token Name: light/Family/Level
                    let rawTokenName = rawVar as string;
                    if (color && paletteFamily) {
                      const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
                      // Remove spaces from paletteFamily (e.g. Yellow Orange -> YellowOrange)
                      const cleanFamily = paletteFamily.replace(/\s/g, '');
                      // Logic to handle alpha in level if needed (e.g. alpha (10%) -> alpha)
                      // MD uses 'alpha' for level 'alpha (10%)'
                      const cleanLevel = displayLevel === 'alpha (10%)' ? 'alpha' : displayLevel;

                      rawTokenName = `${cleanFamily}/${cleanLevel}`;
                    }

                    // Format Theme Token Name: Family/Sub/Level
                    // Strip 'color_'
                    let themeTokenName = themeVar.replace(/^color_/, '');
                    const parts = themeTokenName.split('_');

                    if (parts[0] === 'avatar' && parts.length > 2) {
                      // Special handling for avatar: avatar/yellow orange/20
                      const level = parts.pop(); // Remove level
                      const category = parts.shift(); // Remove avatar
                      const subName = parts.map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join(''); // Join yellow_orange -> yellowOrange
                      themeTokenName = `${category}/${subName}/${level}`;
                    } else {
                      // General case: brand/10, error/20
                      const level = parts.pop();
                      const name = parts.join(' '); // usually single word unless there are others
                      themeTokenName = `${name}/${level}`;
                    }


                    return (
                      <TableRow key={themeVar} className="group">
                        <TableCell className="px-4 font-mono text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {color ? (() => {
                              // Determine if we should treat this as an alpha chip
                              // 1. If Hex has 9 characters (#RRGGBBAA)
                              // 2. If 'alpha' is in the name/level AND we can extract a percentage

                              let opacity = 1;
                              let isActuallyAlpha = false;

                              if (color.hex.length === 9) {
                                isActuallyAlpha = true;
                                const alphaHex = color.hex.substring(7, 9);
                                opacity = parseInt(alphaHex, 16) / 255;
                              } else {
                                // Fallback: try to match (xx%) in level
                                const opacityMatch = String(color.level).match(/\((\d+)%\)/);
                                if (opacityMatch && opacityMatch[1]) {
                                  isActuallyAlpha = true;
                                  opacity = parseInt(opacityMatch[1], 10) / 100;
                                } else if (themeVar.toLowerCase().includes('alpha')) {
                                  // Fallback for 'alpha' named tokens without 9-char hex or % level
                                  // This catches "Red alpha" where level might just be "alpha" (often implies 10% or similar depending on implementation, 
                                  // but if hex is 7 chars it's actually opaque in the hex string? 
                                  // Actually earlier we saw Red alpha had 9 char hex.
                                  // So this might trigger for things that SHOULD have 9 char hex but don't.
                                  // But let's verify if we should force it.
                                  // If strictly relying on data, we only check hex or level %.
                                  // User said "Black alpha/10" was showing weird. Black alpha hexes ARE 9 chars.
                                  // so the first check covers them.
                                }
                              }

                              // Refine isActuallyAlpha: if opacity < 1 or strictly determined
                              if (opacity >= 1 && !isActuallyAlpha) isActuallyAlpha = false;


                              let chipStyle: React.CSSProperties = {};

                              if (isActuallyAlpha) {
                                // For alpha tokens, use checkered pattern background with alpha color overlay
                                const rgbaColor = color.rgb.replace('rgb', 'rgba').replace(')', `, ${opacity.toFixed(2)})`);

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
                              <HighlightText text={themeTokenName} highlight={searchTerm} />
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