import React from 'react';
import { designSystemData } from '../utils/dataLoader';

const SpacingLayoutDisplay: React.FC = () => {
  const { spacing, layout } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Spacing System</h2>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-12">
        {spacing.spacing_values.map((value: string, index: number) => (
          <div key={index} className="p-2 border border-gray-200 rounded-lg text-center shadow-sm">
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-8">Device Resolutions</h2>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Device</th>
              <th className="py-2 px-4 border-b">CSS Width</th>
              <th className="py-2 px-4 border-b">CSS Height</th>
              <th className="py-2 px-4 border-b">Aspect Ratio</th>
            </tr>
          </thead>
          <tbody>
            {layout.deviceResolutions.device_resolutions.map((device: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{device.device}</td>
                <td className="py-2 px-4 border-b">{device.css_width}</td>
                <td className="py-2 px-4 border-b">{device.css_height}</td>
                <td className="py-2 px-4 border-b">{device.aspect_ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold mb-8">Breakpoints</h2>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Breakpoint</th>
              <th className="py-2 px-4 border-b">Class Infix</th>
              <th className="py-2 px-4 border-b">Dimensions</th>
              <th className="py-2 px-4 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {layout.breakpoints.breakpoints.map((bp: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{bp.breakpoint}</td>
                <td className="py-2 px-4 border-b">{bp.class_infix}</td>
                <td className="py-2 px-4 border-b">{bp.dimensions}</td>
                <td className="py-2 px-4 border-b">{bp.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold mb-8">Main Layouts (Mobile/Tablet)</h2>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Device Width Range</th>
              <th className="py-2 px-4 border-b">Left Margin</th>
              <th className="py-2 px-4 border-b">Right Margin</th>
              <th className="py-2 px-4 border-b">Gutter</th>
            </tr>
          </thead>
          <tbody>
            {layout.mainLayouts.mobile_tablet_layouts.map((ml: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{ml.device_width_range}</td>
                <td className="py-2 px-4 border-b">{ml.left_margin}</td>
                <td className="py-2 px-4 border-b">{ml.right_margin}</td>
                <td className="py-2 px-4 border-b">{ml.gutter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold mb-8">Main Layouts (Desktop)</h2>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Device Width Range</th>
              <th className="py-2 px-4 border-b">Left Margin</th>
              <th className="py-2 px-4 border-b">Right Margin</th>
              <th className="py-2 px-4 border-b">Gutter</th>
              <th className="py-2 px-4 border-b">Body Width</th>
              <th className="py-2 px-4 border-b">Column Width</th>
            </tr>
          </thead>
          <tbody>
            {layout.mainLayouts.desktop_layouts.map((dl: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{dl.device_width_range}</td>
                <td className="py-2 px-4 border-b">{dl.left_margin}</td>
                <td className="py-2 px-4 border-b">{dl.right_margin}</td>
                <td className="py-2 px-4 border-b">{dl.gutter}</td>
                <td className="py-2 px-4 border-b">{dl.body_width || '-'}</td>
                <td className="py-2 px-4 border-b">{dl.column_width || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {layout.mainLayouts.notes && layout.mainLayouts.notes.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Layout Notes</h3>
          <ul className="list-disc pl-5">
            {layout.mainLayouts.notes.map((note: string, index: number) => (
              <li key={index} className="text-gray-700">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpacingLayoutDisplay;