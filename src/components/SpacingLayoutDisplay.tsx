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

const SpacingLayoutDisplay: React.FC = () => {
  const { spacing, layout } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      {/* Spacing System Table */}
      <h2 className="text-3xl font-bold mb-8">Spacing System</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 px-4 py-2 text-xs h-auto">Name</TableHead>
              <TableHead className="w-1/3 px-4 py-2 text-xs h-auto">Value (px)</TableHead>
              <TableHead className="w-1/3 px-4 py-2 text-xs h-auto">Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spacing.spacing_values.map((s: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center">
                    <span>{s.variable}</span>
                    <Clipboard value={s.variable} />
                  </div>
                </TableCell>
                <TableCell>{s.px}px / {s.rem}rem</TableCell>
                <TableCell>
                  <div className="bg-blue-200" style={{ height: '24px', width: `${s.px}px` }}></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Device Resolutions Table */}
      <h2 className="text-3xl font-bold mb-8">Device Resolutions</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Device</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">CSS Width</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">CSS Height</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Aspect Ratio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layout.deviceResolutions.device_resolutions.map((device: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{device.device}</TableCell>
                <TableCell>{device.css_width}</TableCell>
                <TableCell>{device.css_height}</TableCell>
                <TableCell>{device.aspect_ratio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Breakpoints Table */}
      <h2 className="text-3xl font-bold mb-8">Breakpoints</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Breakpoint</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Class Infix</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Dimensions</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layout.breakpoints.breakpoints.map((bp: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{bp.breakpoint}</TableCell>
                <TableCell>{bp.class_infix}</TableCell>
                <TableCell>{bp.dimensions}</TableCell>
                <TableCell>{bp.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Main Layouts (Mobile/Tablet) Table */}
      <h2 className="text-3xl font-bold mb-8">Main Layouts (Mobile/Tablet)</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Device Width Range</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Left Margin</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Right Margin</TableHead>
              <TableHead className="w-1/4 px-4 py-2 text-xs h-auto">Gutter</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layout.mainLayouts.mobile_tablet_layouts.map((ml: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{ml.device_width_range}</TableCell>
                <TableCell>{ml.left_margin}</TableCell>
                <TableCell>{ml.right_margin}</TableCell>
                <TableCell>{ml.gutter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Main Layouts (Desktop) Table */}
      <h2 className="text-3xl font-bold mb-8">Main Layouts (Desktop)</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Device Width Range</TableHead>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Left Margin</TableHead>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Right Margin</TableHead>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Gutter</TableHead>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Body Width</TableHead>
              <TableHead className="w-1/6 px-4 py-2 text-xs h-auto">Column Width</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layout.mainLayouts.desktop_layouts.map((dl: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{dl.device_width_range}</TableCell>
                <TableCell>{dl.left_margin}</TableCell>
                <TableCell>{dl.right_margin}</TableCell>
                <TableCell>{dl.gutter}</TableCell>
                <TableCell>{dl.body_width || '-'}</TableCell>
                <TableCell>{dl.column_width || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {layout.mainLayouts.notes && layout.mainLayouts.notes.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Layout Notes</h3>
          <ul className="list-disc pl-5">
            {layout.mainLayouts.notes.map((note: string, index: number) => (
              <li key={index} className="text-muted-foreground">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpacingLayoutDisplay;