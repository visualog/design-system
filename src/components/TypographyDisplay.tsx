import React, { useState } from 'react';
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<any>(null);

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

  const closeSheet = () => {
    setIsSheetOpen(false);
    setSelectedStyle(null);
  };

  return (
    <div className="container mx-auto py-8 font-pretendard">
      <p className="mb-10 text-lg text-muted-foreground">
        The design system uses the <span className="font-semibold">Pretendard</span> font family.
      </p>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variable</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Line Height</TableHead>
              <TableHead>Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(typography)
              .filter(([key]) => key !== 'font_family')
              .flatMap(([category, styles]: [string, any]) =>
                styles.map((style: any, index: number) => (
                  <TableRow key={`${category}-${index}`} onClick={() => handleRowClick(style)} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center">
                        <span>${style.style_name}</span>
                        <Clipboard value={style.style_name} />
                      </div>
                    </TableCell>
                    <TableCell>{style.size}px</TableCell>
                    <TableCell>{style.line_height}px</TableCell>
                    <TableCell>{style.weight}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedStyle && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="bottom" className="sm:max-w-full" onOpenAutoFocus={(e) => e.preventDefault()}>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">${selectedStyle.style_name}</span>
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
                <h4 className="font-semibold mb-2">한글</h4>
                <p className="border border-border p-4 rounded-md"
                   style={{
                     fontSize: `${selectedStyle.size}px`,
                     lineHeight: `${selectedStyle.line_height}px`,
                     fontWeight: getFontWeight(selectedStyle.weight),
                     background: `linear-gradient(to bottom, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)`,
                     backgroundSize: `100% 4px`
                   }}>
                  디자인 시스템 폰트 미리보기입니다. 폰트의 가독성을 확인합니다. 1234567890!@#$%^&*()_+
                </p>
              </div>

              {/* Fourth Row: English Sample */}
              <div>
                <h4 className="font-semibold mb-2">영문</h4>
                <p className="border border-border p-4 rounded-md"
                   style={{
                     fontSize: `${selectedStyle.size}px`,
                     lineHeight: `${selectedStyle.line_height}px`,
                     fontWeight: getFontWeight(selectedStyle.weight),
                     background: `linear-gradient(to bottom, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)`,
                     backgroundSize: `100% 4px`
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