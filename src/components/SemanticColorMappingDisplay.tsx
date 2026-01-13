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

  // Extract unique avatar groups
  const avatarTokens = (colors.semanticMapping['avatar'] || []) as any[];
  const uniqueAvatarGroups = Array.from(new Set(
    avatarTokens.map(token => {
      const parts = token.devToken.split('.');
      // avatar.red.bg -> red
      // avatar.lightBlue.bg -> lightBlue
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

  // Group name mapping for display
  const groupNames: Record<string, string> = {
    'text': 'Text',
    'bg': 'Background',
    'border': 'Border',
    'icon': 'Icon',
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

  // Calculate filtered token count based on selected categories
  const filteredTokenCount = selectedCategories.includes('All')
    ? Object.values(colors.semanticMapping).reduce((sum, tokens) => sum + (Array.isArray(tokens) ? tokens.length : 0), 0)
    : Object.entries(colors.semanticMapping)
      .filter(([category]) => selectedCategories.includes(category))
      .reduce((sum, [, tokens]) => sum + (Array.isArray(tokens) ? (tokens as any[]).length : 0), 0);

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: color }}></div>
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
              <TableHead className="w-[50%] px-4 text-xs h-auto">토큰명</TableHead>
              <TableHead className="w-[25%] px-4 text-xs h-auto">매핑</TableHead>
              <TableHead className="w-[25%] px-4 text-xs h-auto">값</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(colors.semanticMapping).map(([category, tokens]) => {
              if (!selectedCategories.includes('All') && !selectedCategories.includes(category)) {
                return null;
              }

              const tokenList = Array.isArray(tokens) ? tokens : [];

              const filteredEntries = tokenList.filter((token: any) => {
                const term = searchTerm.toLowerCase();
                const devToken = token.devToken || '';
                const designToken = token.designToken || '';
                const val = token.value || '';

                // Avatar Sub-filter
                if (category === 'avatar' && selectedAvatarGroup !== 'All') {
                  const parts = devToken.split('.');
                  if (parts.length >= 2 && parts[1] !== selectedAvatarGroup) {
                    return false;
                  }
                }

                return devToken.toLowerCase().includes(term) ||
                  designToken.toLowerCase().includes(term) ||
                  val.toLowerCase().includes(term);
              }).sort((a: any, b: any) => {
                if (category !== 'avatar') return 0;
                const getGroup = (dt: string) => {
                  const parts = dt.split('.');
                  return parts.length >= 2 ? parts[1] : '';
                };
                const groupA = getGroup(a.devToken || '');
                const groupB = getGroup(b.devToken || '');
                const idxA = AVATAR_SORT_ORDER.indexOf(groupA);
                const idxB = AVATAR_SORT_ORDER.indexOf(groupB);

                if (groupA === groupB) {
                  return (a.devToken || '').localeCompare(b.devToken || '');
                }
                return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
              });

              if (filteredEntries.length === 0) return null;

              return (
                <React.Fragment key={category}>
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