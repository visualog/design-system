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

const ShadowsDisplay: React.FC = () => {
  const { shadows } = designSystemData;

  return (
    <div className="flex flex-col gap-12 font-pretendard">
      {/* Visual Overview */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">스케일</h2>
        </div>

        <div className="w-full border border-border rounded-xl bg-secondary p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {shadows.shadow_tokens.map((shadow: any, index: number) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div
                  className="w-full h-32 bg-white rounded-xl flex items-center justify-center border border transition-shadow duration-300"
                  style={{ boxShadow: shadow.css_value }}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    Elevation {shadow.token.replace('shadow_', '').charAt(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">토큰</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">토큰명</TableHead>
                <TableHead className="w-1/3">값</TableHead>
                <TableHead className="w-1/3">설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shadows.shadow_tokens.map((shadow: any, index: number) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">${shadow.token}</span>
                      <Clipboard value={shadow.token} />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {shadow.css_value}
                  </TableCell>
                  <TableCell className="text-sm">{shadow.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default ShadowsDisplay;