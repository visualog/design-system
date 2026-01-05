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
import { X } from 'lucide-react';

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;
  const [searchTerm, setSearchTerm] = useState('');

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: color }}></div>
  );

  return (
    <div className="flex flex-col gap-12">
      {Object.entries(colors.semanticMapping).map(([category, mappings]) => (
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
                  <TableHead className="w-1/4 px-4 text-xs h-auto">Token</TableHead>
                  <TableHead className="w-1/4 px-4 text-xs h-auto">Mapped To</TableHead>
                  <TableHead className="w-1/4 px-4 text-xs h-auto">Light Mode</TableHead>
                  <TableHead className="w-1/4 px-4 text-xs h-auto">Dark Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(mappings)
                  .filter(([semanticVar, themeVar]) => {
                    const term = searchTerm.toLowerCase();
                    const description = semanticDescriptions[semanticVar as string] || '';
                    return semanticVar.toLowerCase().includes(term) ||
                      (themeVar as string).toLowerCase().includes(term) ||
                      description.toLowerCase().includes(term);
                  })
                  .map(([semanticVar, themeVar]) => {
                    const { light, dark } = resolveSemanticToken(semanticVar);


                    return (
                      <TableRow key={semanticVar}>
                        <TableCell className="font-mono text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-primary">${semanticVar}</span>
                            <Clipboard value={`$${semanticVar}`} />
                          </div>
                          {semanticDescriptions[semanticVar] && (
                            <div className="text-xs text-muted-foreground mt-1 font-sans font-normal">
                              {semanticDescriptions[semanticVar]}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                          <div className="flex items-center">
                            <span>${themeVar as string}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <ColorSwatch color={light} />
                            <span>{light || 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <ColorSwatch color={dark} />
                            <span>{dark || 'N/A'}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </section>
      ))
      }
    </div >
  );
};

export default SemanticColorMappingDisplay;