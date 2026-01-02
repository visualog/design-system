import React from 'react';
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

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;

  const getFontWeight = (weight: string) => {
    if (weight.includes('Bold')) return 700;
    if (weight.includes('Medium')) return 500;
    if (weight.includes('Regular')) return 400;
    return 400;
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
              <TableHead>Style</TableHead>
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
                  <TableRow key={`${category}-${index}`}>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center">
                        <span>${style.style_name}</span>
                        <Clipboard value={style.style_name} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p style={{
                        fontSize: `${style.size}px`,
                        lineHeight: `${style.line_height}px`,
                        fontWeight: getFontWeight(style.weight),
                      }}>
                        {style.text_style}
                      </p>
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
    </div>
  );
};

export default TypographyDisplay;