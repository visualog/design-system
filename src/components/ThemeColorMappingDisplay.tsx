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

const ThemeColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

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
    <div className="container mx-auto py-8 flex flex-col gap-12">
      {Object.entries(colors.themeMapping).map(([category, mappings]) => (
        <section key={category} className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold capitalize">{category.replace(/_/g, ' ')}</h3>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2 px-4 py-2 text-xs uppercase h-auto">
                    Theme Token
                  </TableHead>
                  <TableHead className="w-1/2 px-4 py-2 text-xs uppercase h-auto">
                    Mapped To
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(mappings).map(([themeVar, rawVar]) => {
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
                      <TableCell className="px-4 py-2 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          {color ? (
                            <div className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200 border border-black/10"></div>
                          )}
                          <span>${themeVar}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-2 font-mono text-sm text-gray-500">
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