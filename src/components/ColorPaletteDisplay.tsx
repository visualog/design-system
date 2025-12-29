import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { getContrastingTextColor } from '../lib/utils';

interface ColorProps {
  name: string;
  hex: string;
  variable: string;
}

const ColorSwatch: React.FC<ColorProps> = ({ name, hex, variable }) => {
  const textColor = getContrastingTextColor(hex);

  return (
    <div 
      className="h-28 flex-1 min-w-[80px] flex flex-col justify-between p-3 relative group" 
      style={{ backgroundColor: hex, color: textColor }}
    >
      <div className="font-semibold">{name}</div>
      <div className="text-sm">
        <div className="flex items-center">
          <span>{hex}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Clipboard value={hex} />
          </div>
        </div>
        <div className="flex items-center font-mono text-xs">
          <span>{variable}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Clipboard value={variable} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorPaletteDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Raw Color Palette</h2>
      {Object.entries(colors.palette).map(([colorFamily, shades]) => (
        <div key={colorFamily} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 capitalize">{colorFamily.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <div className="flex flex-row overflow-hidden rounded-lg border border-gray-200">
            {shades.map((color: any, index: number) => (
              <ColorSwatch
                key={index}
                name={color.level}
                hex={color.hex}
                variable={color.variable}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPaletteDisplay;