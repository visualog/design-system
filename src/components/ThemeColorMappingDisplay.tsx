import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';

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
import { X } from 'lucide-react';

const ThemeColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');

  const findColorDataByVariable = (variableName: string) => {
    if (!variableName || typeof variableName !== 'string') return { shade: null, paletteFamily: null };

    const parts = variableName.split('_');
    if (parts.length < 3) return { shade: null, paletteFamily: null };

    const family = parts[1];
    const level = parts[2];

    const palette = colors.palette as Record<string, any[]>;

    for (const paletteFamily in palette) {
      if (paletteFamily.replace(/\s/g, '').toLowerCase() === family.toLowerCase()) {
        const shade = palette[paletteFamily].find(s => String(s.level) === level);
        if (shade) {
          return { shade, paletteFamily };
        }
      }
    }
    return { shade: null, paletteFamily: null };
  };

  return (
    <div className="flex flex-col gap-12">
      {Object.entries(colors.themeMapping).map(([category, mappings]) => (
        <section key={category} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold capitalize">{category.replace(/_/g, ' ')}</h3>
            <div className="relative">
              <Input
                placeholder={`${Object.keys(mappings).length}개 토큰 검색...`}
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
                  <TableHead className="w-1/2 px-4 text-xs h-auto">
                    Token
                  </TableHead>
                  <TableHead className="w-1/2 px-4 text-xs h-auto">
                    Mapped To
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(mappings)
                  .filter(([themeVar, rawVar]) => {
                    const term = searchTerm.toLowerCase();
                    return themeVar.toLowerCase().includes(term) || (rawVar as string).toLowerCase().includes(term);
                  })
                  .map(([themeVar, rawVar]) => {
                    const { shade: color, paletteFamily } = findColorDataByVariable(rawVar as string);

                    let rawTokenName = rawVar as string;
                    if (color && paletteFamily) {
                      const displayLevel = String(color.level).replace(/\s\(.*\)/, '');
                      let finalDisplayLevel = displayLevel;

                      if (finalDisplayLevel === 'alpha') {
                        finalDisplayLevel = 'alpha_10';
                      }
                      rawTokenName = `$color_${paletteFamily.toLowerCase().replace(/\s/g, '_')}_${finalDisplayLevel}`;
                    }

                    return (
                      <TableRow key={themeVar} className="group">
                        <TableCell className="px-4 font-mono text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {color ? (
                              <div className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-200 border border-black/10"></div>
                            )}
                            <span className="text-primary">${themeVar}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 font-mono text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <span>{rawTokenName}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ThemeColorMappingDisplay;