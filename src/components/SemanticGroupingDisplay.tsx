import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
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

  // Definition of display groups by usage context
  const contextGroups = [
    {
      id: 'background',
      label: 'Background',
      title: '배경 색상 (Backgrounds)',
      description: '페이지, 카드, 모달 등 UI 요소의 배경으로 사용되는 색상입니다.',
      groups: ['bg', 'bg-interactive', 'avatar'] // Aggregating related raw groups
    },
    {
      id: 'text',
      label: 'Text & Icon',
      title: '텍스트 및 아이콘 색상 (Text & Icons)',
      description: '타이포그래피와 아이콘에 사용되어 가독성과 의미를 전달합니다.',
      groups: ['text', 'text-interactive', 'icon', 'icon-interactive']
    },
    {
      id: 'border',
      label: 'Border',
      title: '테두리 색상 (Borders)',
      description: '영역을 구분하거나 입력 필드의 경계선 등으로 사용됩니다.',
      groups: ['border', 'border-interactive']
    }
  ];

  // Helper to map old group IDs to data keys
  const getGroupData = (groupId: string) => {
    if (groupId.startsWith('text')) return { key: 'text', isInteractive: groupId.includes('interactive') };
    if (groupId.startsWith('icon')) return { key: 'icon', isInteractive: groupId.includes('interactive') };
    if (groupId.startsWith('bg')) return { key: 'bg', isInteractive: groupId.includes('interactive') };
    if (groupId.startsWith('border')) return { key: 'border', isInteractive: groupId.includes('interactive') };
    if (groupId === 'avatar') return { key: 'avatar', isInteractive: false }; // Avatar is special
    return { key: '', isInteractive: false };
  };

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
      return '전체 속성';
    }
    if (selectedCategories.length === 1) {
      const group = contextGroups.find(g => g.id === selectedCategories[0]);
      return group ? group.label : selectedCategories[0];
    }
    return `${selectedCategories.length}개 속성`;
  };

  // Calculate filtered token count (Simplified for new grouping)
  const filteredTokenCount = contextGroups.reduce((total, contextGroup) => {
    if (!selectedCategories.includes('All') && !selectedCategories.includes(contextGroup.id)) return total;

    const contextTotal = contextGroup.groups.reduce((sum, rawGroupId) => {
      const { key, isInteractive } = getGroupData(rawGroupId);
      const tokens = ((colors.semanticMapping as any)[key] || []) as any[];
      const filtered = tokens.filter((t: any) => {
        if (key === 'avatar') return true;
        return isInteractive ? t.devToken.includes('.interactive') : !t.devToken.includes('.interactive');
      });
      return sum + filtered.length;
    }, 0);
    return total + contextTotal;
  }, 0);

  // --- Internal ColorSwatch removed ---

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
            <DropdownMenuItem onSelect={() => handleCategorySelection('All')}>전체 속성</DropdownMenuItem>
            {contextGroups.map((group) => (
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

      <div className="flex flex-col gap-12">
        {contextGroups.map((contextGroup) => {
          if (!selectedCategories.includes('All') && !selectedCategories.includes(contextGroup.id)) {
            return null;
          }

          return (
            <section key={contextGroup.id} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {contextGroup.title}
                </h3>
                <p className="text-sm text-muted-foreground">{contextGroup.description}</p>
              </div>

              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%] px-4 py-3 h-auto font-semibold">토큰명</TableHead>
                      <TableHead className="w-[25%] px-4 py-3 h-auto font-semibold">매핑</TableHead>
                      <TableHead className="w-[25%] px-4 py-3 h-auto font-semibold">값</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contextGroup.groups.map(rawGroupId => {
                      const { key, isInteractive } = getGroupData(rawGroupId);
                      const rawTokens = ((colors.semanticMapping as any)[key] || []) as any[];

                      const groupTokens = rawTokens.filter((t: any) => {
                        if (key === 'avatar') return true;
                        return isInteractive ? t.devToken.includes('.interactive') : !t.devToken.includes('.interactive');
                      });

                      const filteredEntries = groupTokens.filter((token: any) => {
                        const devToken = token.devToken || '';
                        const designToken = token.designToken || '';
                        const val = token.value || '';

                        // Avatar Sub-filter
                        if (key === 'avatar' && selectedAvatarGroup !== 'All') {
                          const parts = devToken.split('.');
                          if (parts.length >= 2 && parts[1] !== selectedAvatarGroup) {
                            return false;
                          }
                        }

                        const termString = searchTerm.toLowerCase();
                        const orGroups = termString.split(',').map(g => g.trim()).filter(g => g.length > 0);
                        if (orGroups.length === 0) return true;

                        return orGroups.some(group => {
                          const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
                          if (andTerms.length === 0) return true;
                          return andTerms.every(term =>
                            devToken.toLowerCase().includes(term) ||
                            designToken.toLowerCase().includes(term) ||
                            val.toLowerCase().includes(term)
                          );
                        });
                      });

                      return filteredEntries.map((token: any) => {
                        const { devToken, designToken } = token;
                        const { light, dark } = resolveSemanticToken(devToken);
                        const displayColor = isDarkMode ? dark : light;

                        return (
                          <TableRow key={devToken} className="hover:bg-muted/50">
                            <TableCell className="font-mono text-sm font-medium">
                              <div className="flex flex-col gap-1 py-1">
                                <div className="flex items-center gap-2">
                                  <ColorSwatch
                                    colorValue={displayColor}
                                    size="md"
                                    className="rounded-full border-black/10 shrink-0"
                                  />
                                  <span className="text-foreground font-semibold">
                                    <HighlightText text={designToken || '-'} highlight={searchTerm} />
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 pl-7">
                                  <span className="text-xs text-muted-foreground">
                                    <HighlightText text={devToken} highlight={searchTerm} />
                                  </span>
                                  <Clipboard value={devToken} />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground align-middle">
                              <HighlightText text={token.value} highlight={searchTerm} />
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground align-middle">
                              <span className="uppercase">
                                {displayColor}
                                {isDarkMode && <span className="text-gray-400 normal-case"> (Dark)</span>}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      });
                    })}
                  </TableBody>
                </Table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default SemanticColorMappingDisplay;