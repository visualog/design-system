import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
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

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedAvatarGroup, setSelectedAvatarGroup] = useState('All');

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

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="w-5 h-5 rounded-full border border-border relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
    </div>
  );

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
            {displayGroups.map((group) => (
              <DropdownMenuCheckboxItem
                key={group.id}
                checked={selectedCategories.includes(group.id)}
                onCheckedChange={() => handleCategorySelection(group.id)}
              >
                {group.label}
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
                const term = searchTerm.toLowerCase();
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

                return devToken.toLowerCase().includes(term) ||
                  designToken.toLowerCase().includes(term) ||
                  val.toLowerCase().includes(term);
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
                    const { light } = resolveSemanticToken(devToken);

                    return (
                      <TableRow key={devToken}>
                        <TableCell className="font-mono text-sm font-medium">
                          <div className="flex flex-col gap-1 py-1">
                            <div className="flex items-center gap-2">
                              <ColorSwatch color={light} />
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
                          <span className="uppercase">{light}</span>
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