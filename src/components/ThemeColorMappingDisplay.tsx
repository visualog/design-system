import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import ColorSwatch from '@/components/ui/ColorSwatch';
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
import { Switch } from "@/components/ui/switch";

const ThemeColorMappingDisplay: React.FC = () => {
  const AVATAR_ORDER = [
    'Red', 'Orange', 'Yellow Orange', 'Green', 'Deep Green',
    'Cyan', 'Light Blue', 'Deep Blue', 'Purple', 'Pink',
    'Cool Gray', 'Black Alpha'
  ];

  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedAvatarGroup, setSelectedAvatarGroup] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Group name mapping for display
  const groupNames: Record<string, string> = {
    'brand': 'Brand',
    'neutral': 'Neutral',
    'error': 'Error',
    'success': 'Success',
    'loading': 'Loading',
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
  )).sort((a, b) => {
    const idxA = AVATAR_ORDER.indexOf(a);
    const idxB = AVATAR_ORDER.indexOf(b);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

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
    ? Object.entries(colors.themeMapping).reduce((sum, [category, mappings]) => {
      if (category === 'avatar' && selectedAvatarGroup !== 'All') {
        const count = Object.keys(mappings).filter(key => {
          const parts = key.replace(/^color_avatar_/, '').split('_');
          parts.pop();
          const group = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
          return group === selectedAvatarGroup;
        }).length;
        return sum + count;
      }
      return sum + Object.keys(mappings).length;
    }, 0)
    : Object.entries(colors.themeMapping)
      .filter(([category]) => selectedCategories.includes(category))
      .reduce((sum, [category, mappings]) => {
        if (category === 'avatar' && selectedAvatarGroup !== 'All') {
          const count = Object.keys(mappings).filter(key => {
            const parts = key.replace(/^color_avatar_/, '').split('_');
            parts.pop();
            const group = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
            return group === selectedAvatarGroup;
          }).length;
          return sum + count;
        }
        return sum + Object.keys(mappings).length;
      }, 0);

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
        <div className="flex items-center gap-2 ml-auto">
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            id="dark-mode-theme"
          />
          <label htmlFor="dark-mode-theme" className="text-xs font-medium leading-none cursor-pointer whitespace-nowrap text-gray-500">
            {isDarkMode ? 'Dark' : 'Light'}
          </label>
        </div>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[35%] px-4 text-xs h-auto">
                토큰명
              </TableHead>
              <TableHead className="w-[35%] px-4 text-xs h-auto">
                매핑
              </TableHead>
              <TableHead className="w-[30%] px-4 text-xs h-auto">
                값
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(colors.themeMapping)
              .sort(([a], [b]) => {
                const keys = Object.keys(groupNames);
                const idxA = keys.indexOf(a);
                const idxB = keys.indexOf(b);
                return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
              })
              .map(([category, mappings]) => {
                // Apply category filter
                if (!selectedCategories.includes('All') && !selectedCategories.includes(category)) {
                  return null;
                }

                const filteredEntries = Object.entries(mappings).filter(([themeVar, rawVar]) => {
                  // Primary Filter: Search Term
                  const termString = searchTerm.toLowerCase();
                  const orGroups = termString.split(',').map(g => g.trim()).filter(g => g.length > 0);

                  const matchesSearch = orGroups.length === 0 || orGroups.some(group => {
                    const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
                    if (andTerms.length === 0) return true;

                    return andTerms.every(term =>
                      themeVar.toLowerCase().includes(term) ||
                      (rawVar as string).toLowerCase().includes(term)
                    );
                  });

                  if (!matchesSearch) return false;

                  // Secondary Filter: Avatar Group
                  if (category === 'avatar' && selectedAvatarGroup !== 'All') {
                    const parts = themeVar.replace(/^color_avatar_/, '').split('_');
                    parts.pop();
                    const group = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
                    if (group !== selectedAvatarGroup) return false;
                  }

                  return true;
                }).sort((a, b) => {
                  if (category !== 'avatar') return 0; // Keep original order for non-avatar
                  const getGroup = (key: string) => {
                    const parts = key.replace(/^color_avatar_/, '').split('_');
                    parts.pop(); // remove level
                    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
                  };
                  const groupA = getGroup(a[0]);
                  const groupB = getGroup(b[0]);
                  const idxA = AVATAR_ORDER.indexOf(groupA);
                  const idxB = AVATAR_ORDER.indexOf(groupB);

                  if (groupA === groupB) {
                    // If same group, sort by level usually, but here just key string compare fallback
                    return a[0].localeCompare(b[0]);
                  }
                  return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
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


                      const displayHexValue = color ? (isDarkMode ? (color.hexDark || color.hex) : color.hex) : '';

                      return (
                        <TableRow key={themeVar} className="group">
                          <TableCell className="px-4 font-mono text-sm font-medium">
                            <div className="flex items-center gap-2">
                              {color ? (
                                <ColorSwatch
                                  colorValue={isDarkMode ? (color.hexDark || color.hex) : color.hex}
                                  size="md"
                                  className="rounded-full border-black/10"
                                />
                              ) : (
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
                          <TableCell className="px-4 font-mono text-xs text-muted-foreground w-[30%]">
                            {displayHexValue ? (
                              <span className="uppercase">
                                {displayHexValue}
                                {isDarkMode && <span className="text-gray-400 normal-case"> (Dark)</span>}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
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