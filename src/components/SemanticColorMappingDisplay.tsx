import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import { SmartFilterDropdown } from "./ui/SmartFilterDropdown";
import ColorSwatch from '@/components/ui/ColorSwatch';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { resolveSemanticToken } from '../lib/colorUtils';

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

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedAvatarGroup, setSelectedAvatarGroup] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const AVATAR_SORT_ORDER = [
    'red', 'orange', 'yellowOrange', 'green', 'deepGreen',
    'cyan', 'lightBlue', 'deepBlue', 'purple', 'pink',
    'coolGray', 'blackAlpha'
  ];

  // Definition of display groups with custom filtering logic
  const displayGroups = [
    {
      id: 'text',
      label: 'Text',
      dataKey: 'text',
      filter: (t: any) => !t.devToken.includes('.interactive')
    },
    {
      id: 'text-interactive',
      label: 'Text Interactive',
      dataKey: 'text',
      filter: (t: any) => t.devToken.includes('.interactive')
    },
    {
      id: 'icon',
      label: 'Icon',
      dataKey: 'icon',
      filter: (t: any) => !t.devToken.includes('.interactive')
    },
    {
      id: 'icon-interactive',
      label: 'Icon Interactive',
      dataKey: 'icon',
      filter: (t: any) => t.devToken.includes('.interactive')
    },
    {
      id: 'bg',
      label: 'BG',
      dataKey: 'bg',
      filter: (t: any) => !t.devToken.includes('.interactive')
    },
    {
      id: 'bg-interactive',
      label: 'BG Interactive',
      dataKey: 'bg',
      filter: (t: any) => t.devToken.includes('.interactive')
    },
    {
      id: 'border',
      label: 'Border',
      dataKey: 'border',
      filter: (t: any) => !t.devToken.includes('.interactive')
    },
    {
      id: 'border-interactive',
      label: 'Border Interactive',
      dataKey: 'border',
      filter: (t: any) => t.devToken.includes('.interactive')
    },
    {
      id: 'avatar',
      label: 'Avatar',
      dataKey: 'avatar',
      filter: () => true
    },
  ];

  // Extract unique avatar groups
  const avatarTokens = (colors.semanticMapping['avatar'] || []) as any[];
  const uniqueAvatarGroups = Array.from(new Set(
    avatarTokens.map(token => {
      const parts = token.devToken.split('.');
      // avatar.red.bg -> red
      if (parts.length >= 2) return parts[1];
      return '';
    }).filter(Boolean)
  )).sort((a, b) => {
    const idxA = AVATAR_SORT_ORDER.indexOf(a);
    const idxB = AVATAR_SORT_ORDER.indexOf(b);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  const getAvatarDropdownText = () => {
    return selectedAvatarGroup === 'All' ? '전체 색상' : selectedAvatarGroup;
  };

  const handleCategorySelection = (categoryId: string) => {
    // Reset avatar sub-filter when changing from avatar to something else
    // (Though with multi-select logic, implies mixed usage, but usually single select focused)
    if (categoryId !== 'avatar' && !selectedCategories.includes('avatar')) {
      setSelectedAvatarGroup('All');
    }

    if (categoryId === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newSelection = selectedCategories.includes('All')
        ? [categoryId]
        : selectedCategories.includes(categoryId)
          ? selectedCategories.filter(c => c !== categoryId)
          : [...selectedCategories, categoryId];

      setSelectedCategories(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  const getDropdownTriggerText = () => {
    if (selectedCategories.includes('All') || selectedCategories.length === 0) {
      return '전체';
    }
    if (selectedCategories.length === 1) {
      const group = displayGroups.find(g => g.id === selectedCategories[0]);
      return group ? group.label : selectedCategories[0];
    }
    return `${selectedCategories.length}개 그룹`;
  };

  // Calculate filtered token count based on selected display groups
  const filteredTokenCount = selectedCategories.includes('All')
    ? displayGroups.reduce((sum, group) => {
      const tokens = ((colors.semanticMapping as any)[group.dataKey] || []) as any[];
      // Filter by group logic (interactive vs non-interactive)
      let groupTokens = tokens.filter(group.filter);

      // If this group is avatar and a specific avatar group is selected, filter further
      if (group.id === 'avatar' && selectedAvatarGroup !== 'All') {
        groupTokens = groupTokens.filter((t: any) => {
          const parts = t.devToken.split('.');
          return parts.length >= 2 && parts[1] === selectedAvatarGroup;
        });
      }
      return sum + groupTokens.length;
    }, 0)
    : displayGroups
      .filter(group => selectedCategories.includes(group.id))
      .reduce((sum, group) => {
        const tokens = ((colors.semanticMapping as any)[group.dataKey] || []) as any[];
        // Filter by group logic (interactive vs non-interactive)
        let groupTokens = tokens.filter(group.filter);

        // If this group is avatar and a specific avatar group is selected, filter further
        if (group.id === 'avatar' && selectedAvatarGroup !== 'All') {
          groupTokens = groupTokens.filter((t: any) => {
            const parts = t.devToken.split('.');
            return parts.length >= 2 && parts[1] === selectedAvatarGroup;
          });
        }
        return sum + groupTokens.length;
      }, 0);

  // --- Internal ColorSwatch removed ---

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SmartFilterDropdown
          triggerText={getDropdownTriggerText()}
          items={displayGroups.map(g => ({ value: g.id, label: g.label }))}
          selectedValues={selectedCategories}
          onSelectionChange={setSelectedCategories}
          width="w-40"
        />

        {/* Secondary Dropdown for Avatar Groups */}
        {selectedCategories.length === 1 && selectedCategories[0] === 'avatar' && (
          <SmartFilterDropdown
            triggerText={getAvatarDropdownText()}
            items={uniqueAvatarGroups.map(g => ({ value: g, label: g }))}
            selectedValues={[selectedAvatarGroup]}
            onSelectionChange={(vals) => setSelectedAvatarGroup(vals.includes('All') || vals.length === 0 ? 'All' : vals[vals.length - 1])}
            width="w-40"
          />
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
            id="dark-mode-semantic"
          />
          <label htmlFor="dark-mode-semantic" className="text-xs font-medium leading-none cursor-pointer whitespace-nowrap text-gray-500">
            {isDarkMode ? 'Dark' : 'Light'}
          </label>
        </div>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%] px-4 text-xs h-auto">토큰명</TableHead>
              <TableHead className="w-[25%] px-4 text-xs h-auto">매핑</TableHead>
              <TableHead className="w-[25%] px-4 text-xs h-auto">값</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayGroups.map((group) => {
              if (!selectedCategories.includes('All') && !selectedCategories.includes(group.id)) {
                return null;
              }

              const rawTokens = ((colors.semanticMapping as any)[group.dataKey] || []) as any[];
              // First filter by group logic (interactive vs non-interactive)
              const groupTokens = rawTokens.filter(group.filter);

              // Then filter by search term & avatar subgroup
              const filteredEntries = groupTokens.filter((token: any) => {
                const devToken = token.devToken || '';
                const designToken = token.designToken || '';
                const val = token.value || '';

                // Avatar Sub-filter
                if (group.id === 'avatar' && selectedAvatarGroup !== 'All') {
                  const parts = devToken.split('.');
                  if (parts.length >= 2 && parts[1] !== selectedAvatarGroup) {
                    return false;
                  }
                }

                const termString = searchTerm.toLowerCase();
                // Split by comma for OR logic
                const orGroups = termString.split(',').map(g => g.trim()).filter(g => g.length > 0);

                if (orGroups.length === 0) return true;

                // Match if ANY OR-group is satisfied
                // An OR-group is satisfied if ALL its AND-terms (split by +) match
                return orGroups.some(group => {
                  const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
                  if (andTerms.length === 0) return true;

                  return andTerms.every(term =>
                    devToken.toLowerCase().includes(term) ||
                    designToken.toLowerCase().includes(term) ||
                    val.toLowerCase().includes(term)
                  );
                });
              }).sort((a: any, b: any) => {
                // Sorting mostly for Avatar or if needed later
                if (group.id !== 'avatar') return 0;

                const getGroup = (dt: string) => {
                  const parts = dt.split('.');
                  return parts.length >= 2 ? parts[1] : '';
                };
                const groupA = getGroup(a.devToken || '');
                const groupB = getGroup(b.devToken || '');
                const idxA = AVATAR_SORT_ORDER.indexOf(groupA);
                const idxB = AVATAR_SORT_ORDER.indexOf(groupB);

                if (groupA === groupB) {
                  const getTypePriority = (token: string) => {
                    const parts = token.split('.');
                    if (parts.length < 3) return 99;
                    const type = parts[2];
                    if (type.startsWith('text')) return 1;
                    if (type.startsWith('icon')) return 2;
                    if (type.startsWith('bg')) return 3;
                    if (type.startsWith('border')) return 4;
                    return 99;
                  };

                  const pA = getTypePriority(a.devToken || '');
                  const pB = getTypePriority(b.devToken || '');

                  if (pA !== pB) return pA - pB;

                  return (a.devToken || '').localeCompare(b.devToken || '');
                }
                return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
              });

              if (filteredEntries.length === 0) return null;

              return (
                <React.Fragment key={group.id}>
                  {filteredEntries.map((token: any) => {
                    const { devToken, designToken } = token;
                    const { light, dark } = resolveSemanticToken(devToken);
                    const displayColor = isDarkMode ? dark : light;

                    return (
                      <TableRow key={devToken}>
                        <TableCell className="font-mono text-sm font-medium">
                          <div className="flex flex-col gap-1 py-1">
                            <div className="flex items-center gap-2">
                              <ColorSwatch
                                colorValue={displayColor}
                                size="md"
                                className="rounded-full border-black/10"
                              />
                              <span className="text-foreground font-semibold whitespace-nowrap">
                                <HighlightText text={designToken || '-'} highlight={searchTerm} />
                              </span>
                            </div>
                            <div className="flex items-center gap-2 pl-7">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                <HighlightText text={devToken} highlight={searchTerm} />
                              </span>
                              <Clipboard value={devToken} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap align-top pt-4">
                          <HighlightText text={token.value} highlight={searchTerm} />
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap align-top pt-4">
                          <span className="uppercase">
                            {displayColor}
                            {isDarkMode && <span className="text-gray-400 normal-case"> (Dark)</span>}
                          </span>
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

export default SemanticColorMappingDisplay;