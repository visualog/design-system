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
import { Info } from "lucide-react";

const SpacingLayoutDisplay: React.FC = () => {
  const { spacing, layout } = designSystemData;

  return (
    <div className="flex flex-col gap-12">
      {/* Spacing System Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">토큰</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 px-4 text-xs h-auto">토큰명</TableHead>
                <TableHead className="w-1/3 px-4 text-xs h-auto">값</TableHead>
                <TableHead className="w-1/3 px-4 text-xs h-auto">예시</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spacing.spacing_values.map((s: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">${s.variable}</span>
                      <Clipboard value={`$${s.variable}`} />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {s.px}px
                  </TableCell>
                  <TableCell>
                    <div className="bg-blue-200" style={{ height: '24px', width: `${s.px}px` }}></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Device Resolutions Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">해상도</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 px-4 text-xs h-auto">기기</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">너비</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">높이</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">비율</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layout.deviceResolutions.device_resolutions.map((device: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm text-primary">{device.device}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{device.css_width}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{device.css_height}px</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{device.aspect_ratio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Breakpoints Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">중단점</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 px-4 text-xs h-auto">중단점</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">식별자</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">규격</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">비고</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layout.breakpoints.breakpoints.map((bp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm text-primary">{bp.breakpoint}</TableCell>
                  <TableCell className="font-mono text-xs text-primary">{bp.class_infix}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{bp.dimensions}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{bp.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Main Layouts (Mobile/Tablet) Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">메인 레이아웃 (모바일/태블릿)</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 px-4 text-xs h-auto">기기 너비 범위</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">좌측 여백</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">우측 여백</TableHead>
                <TableHead className="w-1/4 px-4 text-xs h-auto">거터</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layout.mainLayouts.mobile_tablet_layouts.map((ml: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm text-primary">{ml.device_width_range}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{ml.left_margin}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{ml.right_margin}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{ml.gutter}px</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Main Layouts (Desktop) Table */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">메인 레이아웃 (데스크톱)</h2>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">기기 너비 범위</TableHead>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">좌측 여백</TableHead>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">우측 여백</TableHead>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">거터</TableHead>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">바디 너비</TableHead>
                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">컬럼 너비</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layout.mainLayouts.desktop_layouts.map((dl: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm text-primary">{dl.device_width_range}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{dl.left_margin}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{dl.right_margin}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{dl.gutter}px</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{dl.body_width ? `${dl.body_width}px` : '-'}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{dl.column_width ? `${dl.column_width}px` : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {layout.mainLayouts.notes && layout.mainLayouts.notes.length > 0 && (
        <div className="mb-12 rounded-lg border bg-muted/30 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Info className="w-4 h-4" />
            참고사항
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {layout.mainLayouts.notes.map((note: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpacingLayoutDisplay;