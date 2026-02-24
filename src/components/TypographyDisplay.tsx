import React, { useMemo, useState } from 'react';
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
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { DocSubsection } from './ui/DocLayout';

interface TypographyToken {
  text_style: string;
  style_name: string;
  size: string;
  line_height: string;
  weight: string;
}

interface TypographyRow extends TypographyToken {
  category: string;
}

type TypographySource = Record<string, string | TypographyToken[]>;

const DEFAULT_PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog.';

const TESTER_PRESETS: Array<{ label: string; className: string; emphasize?: boolean }> = [
  { label: 'Display Large (64px)', className: 'text-display-lg', emphasize: true },
  { label: 'Heading XL (36px)', className: 'text-heading-xl', emphasize: true },
  { label: 'Body Medium (15px)', className: 'text-body-md' },
];

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;
  const typographyData = typography as TypographySource;

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<TypographyRow | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewText, setPreviewText] = useState(DEFAULT_PREVIEW_TEXT);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);

  const getFontWeight = (weight: string) => {
    const weightMatch = weight.match(/\d+/);
    if (weightMatch) {
      return Number(weightMatch[0]);
    }

    if (weight.includes('Bold')) return 700;
    if (weight.includes('Medium')) return 500;
    if (weight.includes('Regular')) return 400;
    return 400;
  };

  const handleRowClick = (style: TypographyRow) => {
    setSelectedStyle(style);
    setIsSheetOpen(true);
  };

  const handleCategorySelection = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
      return;
    }

    let newSelection = selectedCategories.filter((value) => value !== 'All');

    if (newSelection.includes(category)) {
      newSelection = newSelection.filter((value) => value !== category);
    } else {
      newSelection.push(category);
    }

    if (newSelection.length === 0) {
      setSelectedCategories(['All']);
      return;
    }

    setSelectedCategories(newSelection);
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

  const availableCategories = useMemo(
    () =>
      Object.keys(typographyData).filter(
        (key) => key !== 'font_family' && Array.isArray(typographyData[key])
      ),
    [typographyData]
  );

  const typographyRows = useMemo(() => {
    return availableCategories.flatMap((category) => {
      const styles = typographyData[category];
      if (!Array.isArray(styles)) {
        return [] as TypographyRow[];
      }

      return styles.map((style) => ({ ...style, category }));
    });
  }, [availableCategories, typographyData]);

  const filteredTypography = useMemo(() => {
    return typographyRows.filter((style) => {
      const matchesCategory =
        selectedCategories.includes('All') || selectedCategories.includes(style.category);

      const termString = searchQuery.toLowerCase();
      const orGroups = termString
        .split(',')
        .map((group) => group.trim())
        .filter((group) => group.length > 0);

      const matchesSearch =
        orGroups.length === 0 ||
        orGroups.some((group) => {
          const andTerms = group
            .split('+')
            .map((term) => term.trim())
            .filter((term) => term.length > 0);

          if (andTerms.length === 0) {
            return true;
          }

          return andTerms.every((term) => style.style_name.toLowerCase().includes(term));
        });

      return matchesCategory && matchesSearch;
    });
  }, [typographyRows, selectedCategories, searchQuery]);

  const selectedSize = selectedStyle ? Number(selectedStyle.size) : 0;
  const selectedLineHeight = selectedStyle ? Number(selectedStyle.line_height) : 0;

  return (
    <div className="font-pretendard doc-content-stack-tight">
      <DocSubsection
        title="타입 토큰 탐색"
        description="카테고리/검색으로 원하는 타이포그래피 토큰을 빠르게 찾고 상세값을 확인합니다."
      >
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48 justify-between shadow-none group">
                <span className="capitalize">{getDropdownTriggerText().replace(/_/g, ' ')}</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-y-auto">
              <DropdownMenuItem onSelect={() => handleCategorySelection('All')}>전체</DropdownMenuItem>
              {availableCategories.map((category) => (
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
            containerClassName="w-full max-w-md"
            placeholder={`${filteredTypography.length}개 토큰 검색...`}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
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
              {filteredTypography.map((style, index) => (
                <TableRow
                  key={`${style.category}-${style.style_name}-${index}`}
                  onClick={() => handleRowClick(style)}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                >
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
      </DocSubsection>

      <DocSubsection
        title="타입 테스터"
        description="샘플 문장을 바꿔보며 주요 텍스트 스타일의 가독성과 톤을 빠르게 점검합니다."
      >
        <div className="rounded-xl border bg-card p-6 doc-content-stack-tight">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Preview Text</label>
            <input
              type="text"
              placeholder="Type something here..."
              className="w-full bg-background border border-input rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={previewText}
              onChange={(event) =>
                setPreviewText(event.target.value || DEFAULT_PREVIEW_TEXT)
              }
            />
          </div>

          <div className="space-y-6 mt-2">
            {TESTER_PRESETS.map((preset) => (
              <div key={preset.label} className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">{preset.label}</p>
                <p
                  className={`${preset.className} text-foreground break-all ${preset.emphasize ? 'font-bold' : ''}`}
                >
                  {previewText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DocSubsection>

      {selectedStyle && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="bottom"
            className="sm:max-w-full z-[100]"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{selectedStyle.style_name}</span>
                  <Clipboard value={selectedStyle.style_name} />
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="py-4 doc-content-stack-tight">
              <DocSubsection title="토큰 정보" className="gap-3" contentClassName="gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold">
                  <div>
                    Style: <span className="font-normal">{selectedStyle.text_style}</span>
                  </div>
                  <div>
                    Size: <span className="font-normal">{selectedStyle.size}px</span>
                  </div>
                  <div>
                    Line Height: <span className="font-normal">{selectedStyle.line_height}px</span>
                  </div>
                  <div>
                    Weight: <span className="font-normal">{selectedStyle.weight}</span>
                  </div>
                </div>
              </DocSubsection>

              <DocSubsection title="한글 샘플" className="gap-2" contentClassName="gap-2">
                <p
                  className="p-4 rounded-md"
                  style={{
                    fontSize: `${selectedSize}px`,
                    lineHeight: `${selectedLineHeight}px`,
                    fontWeight: getFontWeight(selectedStyle.weight),
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(255,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '100% 4px',
                    backgroundRepeat: 'repeat',
                  }}
                >
                  디자인 시스템 폰트 미리보기입니다. 폰트의 가독성을 확인합니다.
                  {' '}1234567890!@#$%^&*()_+
                </p>
              </DocSubsection>

              <DocSubsection title="영문 샘플" className="gap-2" contentClassName="gap-2">
                <p
                  className="p-4 rounded-md"
                  style={{
                    fontSize: `${selectedSize}px`,
                    lineHeight: `${selectedLineHeight}px`,
                    fontWeight: getFontWeight(selectedStyle.weight),
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(255,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '100% 4px',
                    backgroundRepeat: 'repeat',
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                  {' '}1234567890!@#$%^&*()_+
                </p>
              </DocSubsection>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default TypographyDisplay;
