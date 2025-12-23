import React from 'react';
import { designSystemData } from '../utils/dataLoader';

interface ColorProps {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  variable: string;
}

const ColorSwatch: React.FC<ColorProps> = ({ name, hex, rgb, hsl, variable }) => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm">
      <div className="w-24 h-24 rounded-full mb-4" style={{ backgroundColor: hex }}></div>
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{hex}</p>
      <p className="text-xs text-gray-500">{rgb}</p>
      <p className="text-xs text-gray-500">{hsl}</p>
      <p className="text-xs font-mono text-gray-700 mt-2">{variable}</p>
    </div>
  );
};

const ColorPaletteDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Raw Color Palette</h2>
      {Object.entries(colors.palette).map(([colorFamily, shades]) => (
        <div key={colorFamily} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">{colorFamily}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {shades.map((color: any, index: number) => (
              <ColorSwatch
                key={index}
                name={color.level}
                hex={color.hex}
                rgb={color.rgb}
                hsl={color.hsl}
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