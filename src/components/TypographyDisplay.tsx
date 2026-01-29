import React, { useState } from 'react';
import { HighlightText } from './ui/HighlightText';
import { SearchBar } from './SearchBar';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getFontWeight = (weight: string) => {
    if (weight.includes('Bold')) return 700;
    if (weight.includes('Medium')) return 500;
    if (weight.includes('Regular')) return 400;
    return 400;
  };

  const handleRowClick = (style: any) => {
    setSelectedStyle(style);
    setIsSheetOpen(true);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);

  const handleCategorySelection = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
      return;
    }

    let newSelection = selectedCategories.filter(c => c !== 'All');

    if (newSelection.includes(category)) {
      newSelection = newSelection.filter(c => c !== category);
    } else {
      newSelection.push(category);
    }

    if (newSelection.length === 0) {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories(newSelection);
    }
  };

  const getDropdownTriggerText = () => {
    if (selectedCategories.includes('All') || selectedCategories.length === 0) {
      return '전체';
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }
    return `${selectedCategories.length}개 선택됨`;
  };

  const availableCategories = Object.keys(typography).filter(key => key !== 'font_family');

  const filteredTypography = Object.entries(typography)
    .filter(([key]) => key !== 'font_family')
    .flatMap(([category, styles]: [string, any]) =>
      styles.map((style: any) => ({ ...style, category }))
    )
    .filter((style) => {
      const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(style.category);

      const termString = searchQuery.toLowerCase();
      const orGroups = termString.split(',').map(g => g.trim()).filter(g => g.length > 0);

      const matchesSearch = orGroups.length === 0 || orGroups.some(group => {
        const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
        if (andTerms.length === 0) return true;

        return andTerms.every(term =>
          style.style_name.toLowerCase().includes(term)
        );
      });
      return matchesCategory && matchesSearch;
    });



  return (
    <div className="font-pretendard flex flex-col gap-4">

      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-48 justify-between shadow-none">
              <span className="capitalize">{getDropdownTriggerText().replace(/_/g, ' ')}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            <DropdownMenuItem onSelect={() => handleCategorySelection('All')}>전체</DropdownMenuItem>
            {availableCategories.map(category => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategorySelection(category)}
                className="capitalize"
              >
                {category.replace(/_/g, ' ')}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>


        <SearchBar
          placeholder={`${filteredTypography.length}개 토큰 검색...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 px-4 text-xs h-auto">토큰명</TableHead>
              <TableHead className="w-1/4 px-4 text-xs h-auto">크기</TableHead>
              <TableHead className="w-1/4 px-4 text-xs h-auto">행간</TableHead>
              <TableHead className="w-1/4 px-4 text-xs h-auto">굵기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTypography.map((style: any, index: number) => (
              <TableRow key={`${style.category}-${index}`} onClick={() => handleRowClick(style)} className="cursor-pointer hover:bg-accent/50 transition-colors">
                <TableCell className="font-mono text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">
                      <HighlightText text={style.style_name} highlight={searchQuery} />
                    </span>
                    <Clipboard value={style.style_name} />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">{style.size}px</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">{style.line_height}px</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">{style.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Type Tester */}
      <section className="mt-8 border rounded-xl p-6 bg-card">
        <h2 className="text-xl font-bold mb-4">Type Tester</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Preview Text</label>
            <input
              type="text"
              placeholder="Type something here..."
              className="w-full bg-background border border-input rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              defaultValue="The quick brown fox jumps over the lazy dog."
              onChange={(e) => {
                const previewElements = document.querySelectorAll('.type-preview');
                previewElements.forEach((el) => {
                  (el as HTMLElement).innerText = e.target.value || 'The quick brown fox jumps over the lazy dog.';
                });
              }}
            />
          </div>

          <div className="space-y-6 mt-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">Display Large (64px)</p>
              <p className="text-display-lg font-bold text-foreground type-preview break-all">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">Heading XL (36px)</p>
              <p className="text-heading-xl font-bold text-foreground type-preview break-all">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">Body Medium (15px)</p>
              <p className="text-body-md text-foreground type-preview">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </div>
      </section>

      {selectedStyle && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="bottom" className="sm:max-w-full z-[100]" onOpenAutoFocus={(e) => e.preventDefault()}>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{selectedStyle.style_name}</span>
                  <Clipboard value={selectedStyle.style_name} />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="py-4 flex flex-col gap-6">
              {/* Second Row: Details */}
              <div className="grid grid-cols-4 gap-4 text-sm font-semibold">
                <div>Style: <span className="font-normal">{selectedStyle.text_style}</span></div>
                <div>Size: <span className="font-normal">{selectedStyle.size}px</span></div>
                <div>Line Height: <span className="font-normal">{selectedStyle.line_height}px</span></div>
                <div>Weight: <span className="font-normal">{selectedStyle.weight}</span></div>
              </div>

              {/* Third Row: Korean Sample */}
              <div>
                <h4 className="font-semibold mb-2 text-lg">한글</h4>
                <p className="p-4"
                  style={{
                    fontSize: `${selectedStyle.size}px`,
                    lineHeight: `${selectedStyle.line_height}px`,
                    fontWeight: getFontWeight(selectedStyle.weight),
                    backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: `100% 4px`,
                    backgroundRepeat: 'repeat'
                  }}>
                  디자인 시스템 폰트 미리보기입니다. 폰트의 가독성을 확인합니다. 1234567890!@#$%^&*()_+
                </p>
              </div>

              {/* Fourth Row: English Sample */}
              <div>
                <h4 className="font-semibold mb-2 text-lg">영문</h4>
                <p className="p-4"
                  style={{
                    fontSize: `${selectedStyle.size}px`,
                    lineHeight: `${selectedStyle.line_height}px`,
                    fontWeight: getFontWeight(selectedStyle.weight),
                    backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: `100% 4px`,
                    backgroundRepeat: 'repeat'
                  }}>
                  The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default TypographyDisplay;