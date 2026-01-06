import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { resolveSemanticToken } from '../lib/colorUtils';
import { semanticDescriptions } from '../data/semantic_descriptions';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { X, ChevronDown } from 'lucide-react';
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

  // Group name mapping for display
  const groupNames: Record<string, string> = {
    'text': 'Text',
    'background': 'Background',
    'border': 'Border',
    'icon': 'Icon'
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

  // Calculate filtered token count based on selected categories
  const filteredTokenCount = selectedCategories.includes('All')
    ? Object.values(colors.semanticMapping).reduce((sum, mappings) => sum + Object.keys(mappings).length, 0)
    : Object.entries(colors.semanticMapping)
      .filter(([category]) => selectedCategories.includes(category))
      .reduce((sum, [, mappings]) => sum + Object.keys(mappings).length, 0);

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: color }}></div>
  );

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
        <div className="relative">
          <Input
            placeholder={`${filteredTokenCount}개 토큰 검색...`}
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
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 px-4 text-xs h-auto">토큰</TableHead>
              <TableHead className="w-1/2 px-4 text-xs h-auto">매핑</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(colors.semanticMapping).map(([category, mappings]) => {
              // Apply category filter
              if (!selectedCategories.includes('All') && !selectedCategories.includes(category)) {
                return null;
              }

              const filteredEntries = Object.entries(mappings).filter(([semanticVar, themeVar]) => {
                const term = searchTerm.toLowerCase();
                const description = semanticDescriptions[semanticVar as string] || '';
                return semanticVar.toLowerCase().includes(term) ||
                  (themeVar as string).toLowerCase().includes(term) ||
                  description.toLowerCase().includes(term);
              });

              if (filteredEntries.length === 0) return null;

              return (
                <React.Fragment key={category}>
                  {filteredEntries.map(([semanticVar, themeVar]) => {
                    const { light } = resolveSemanticToken(semanticVar);

                    return (
                      <TableRow key={semanticVar}>
                        <TableCell className="font-mono text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <ColorSwatch color={light} />
                            <span className="text-primary">${semanticVar}</span>
                            <Clipboard value={`$${semanticVar}`} />
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                          <div className="flex items-center">
                            <span>${themeVar as string}</span>
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

export default SemanticColorMappingDisplay;