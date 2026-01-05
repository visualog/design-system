import React from 'react';
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

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: color }}></div>
  );

  return (
    <div className="container mx-auto py-8 flex flex-col gap-12">
      {Object.entries(colors.semanticMapping).map(([category, mappings]) => (
        <section key={category} className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold capitalize">{category.replace(/_/g, ' ')}</h3>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Semantic Token / Description</TableHead>
                  <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Mapped To</TableHead>
                  <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Light Mode</TableHead>
                  <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Dark Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(mappings).map(([semanticVar, themeVar]) => {
                  const { light, dark } = resolveSemanticToken(semanticVar);


                  return (
                    <TableRow key={semanticVar}>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <span>${semanticVar}</span>
                          <Clipboard value={`$${semanticVar}`} />
                        </div>
                        {semanticDescriptions[semanticVar] && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {semanticDescriptions[semanticVar]}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center">
                          <span>${themeVar as string}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ColorSwatch color={light} />
                          <span>{light || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
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