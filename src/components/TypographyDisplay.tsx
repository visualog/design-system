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
          <SheetContent side="bottom" className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Typography Detail: ${selectedStyle.style_name}</SheetTitle>
              <SheetDescription>
                Detailed information for the selected typography style.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-xl mb-4"
                 style={{
                   fontSize: `${selectedStyle.size}px`,
                   lineHeight: `${selectedStyle.line_height}px`,
                   fontWeight: getFontWeight(selectedStyle.weight),
                 }}>
                {selectedStyle.text_style || "Example Text"}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold">Variable</h4>
                  <p className="font-mono text-foreground">${selectedStyle.style_name} <Clipboard value={selectedStyle.style_name} /></p>
                </div>
                <div>
                  <h4 className="font-semibold">Text Style</h4>
                  <p>{selectedStyle.text_style}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Size</h4>
                  <p>{selectedStyle.size}px</p>
                </div>
                <div>
                  <h4 className="font-semibold">Line Height</h4>
                  <p>{selectedStyle.line_height}px</p>
                </div>
                <div>
                  <h4 className="font-semibold">Weight</h4>
                  <p>{selectedStyle.weight}</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};