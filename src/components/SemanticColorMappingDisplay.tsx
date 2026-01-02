import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { resolveSemanticToken } from '../lib/colorUtils';
import { getContrastingTextColor } from '../lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  const ColorSwatch: React.FC<{ color: string, textColor: string }> = ({ color, textColor }) => (
    <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: color }}></div>
  );

  return (
    <div className="container mx-auto py-8 flex flex-col gap-12">
      {Object.entries(colors.semanticMapping).map(([category, mappings]) => (
        <div key={category}>
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category.replace(/_/g, ' ')}</h3>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Semantic Token</TableHead>
                  <TableHead className="w-1/4">Mapped To</TableHead>
                  <TableHead className="w-1/4">Light Mode</TableHead>
                  <TableHead className="w-1/4">Dark Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(mappings).map(([semanticVar, themeVar]) => {
                  const { light, dark } = resolveSemanticToken(semanticVar);
                  const lightTextColor = getContrastingTextColor(light); // Not directly used in this table layout, but good to keep
                  const darkTextColor = getContrastingTextColor(dark); // Not directly used in this table layout, but good to keep

                  return (
                    <TableRow key={semanticVar}>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <span>${semanticVar}</span>
                          <Clipboard value={`$${semanticVar}`} />
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center">
                          <span>${themeVar as string}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ColorSwatch color={light} textColor={lightTextColor} />
                          <span>{light || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ColorSwatch color={dark} textColor={darkTextColor} />
                          <span>{dark || 'N/A'}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SemanticColorMappingDisplay;