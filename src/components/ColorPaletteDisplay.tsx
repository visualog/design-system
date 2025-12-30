import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { getContrastingTextColor } from '../lib/utils';

// --- Reusable Color Swatch (already exists) ---
interface ColorProps {
  level: string; // Changed from name to level
  hex: string;
  variable: string;
  rgb: string;
}

const ColorSwatch: React.FC<ColorProps> = ({ level, hex, variable, rgb }) => { // Changed name to level
  let backgroundColor = rgb; // Initialize with rgb

  if (level && level.toLowerCase().includes('alpha')) { // Changed name to level
    const opacityMatch = level.match(/\((\d+)%\)/); // Extracts the percentage, e.g., "alpha (10%)"
    if (opacityMatch && opacityMatch[1]) {
      const opacity = parseInt(opacityMatch[1], 10) / 100;
      // Reconstructs "rgb(r, g, b)" into "rgba(r, g, b, opacity)"
      backgroundColor = backgroundColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
  }

  return (
    <div 
      className="w-12 h-12 relative group" 
      style={{ backgroundColor: backgroundColor }}
    >
      {/* All text content removed as requested */}
    </div>
  );
};

// --- New Grid-based Display Component ---
const ColorGrid: React.FC<{ families: [string, any[]][], levels: string[] }> = ({ families, levels }) => (
  <div className="grid items-center gap-0.5" style={{ gridTemplateColumns: `minmax(7.5rem, auto) repeat(${levels.length}, 3rem)` }}>
    {/* Header Row */}
    <div /> {/* Empty cell for color family name column */}
    {levels.map(level => (
      <div key={level} className="text-center text-xs font-medium text-gray-400 w-12">{level}</div>
    ))}

    {/* Color Family Rows */}
    {families.map(([familyName, shades]) => (
      <React.Fragment key={familyName}>
        <div className="text-sm capitalize text-gray-400">{familyName.replace(/([A-Z])/g, ' $1').trim()}</div>
        {levels.map(level => {
          const shade = shades.find(s => s.level === level);
          return (
            <div key={`${familyName}-${level}`} className="w-12 h-12 flex items-center justify-center">
              {shade ? <ColorSwatch {...shade} /> : (
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="material-symbols-rounded text-gray-200 text-lg" style={{ fontVariationSettings: "'wght' 300" }}>
                    format_color_reset
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </div>
);


// --- New component for the Tokens table ---
const TokensDisplay: React.FC<{ colors: any }> = ({ colors }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Token
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Value (Hex)
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Preview
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Object.entries(colors).flatMap(([colorFamily, shades]) =>
          (shades as any[]).map((color: any, index: number) => (
            <tr key={`${colorFamily}-${index}`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{`$color.palette.${colorFamily.toLowerCase()}-${color.level}`}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{color.hex}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);


// --- Main component, restructured ---
const ColorPaletteDisplay: React.FC = () => {
  const { colors } = designSystemData;

  const allShades = Object.values(colors.palette).flat();
  const unwantedLevels = [
    "10 (10%)", "20 (20%)", "30 (30%)", "40 (40%)", "50 (50%)",
    "60 (60%)", "70 (70%)", "80 (80%)", "90 (90%)"
  ];
  const allLevels = [...new Set(allShades.map(s => s.level))].filter(level => !unwantedLevels.includes(level));

  const sortedLevels = allLevels.sort((a, b) => {
    const levelA = String(a).toLowerCase();
    const levelB = String(b).toLowerCase();
    if (levelA === 'white') return -1;
    if (levelB === 'white') return 1;
    const isAlphaA = levelA.includes('alpha');
    const isAlphaB = levelB.includes('alpha');
    if (isAlphaA && !isAlphaB) return 1;
    if (!isAlphaA && isAlphaB) return -1;
    const numA = parseFloat(levelA);
    const numB = parseFloat(levelB);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return levelA.localeCompare(levelB);
  });

  const nonAlphaLevels = sortedLevels.filter(level => !level.toLowerCase().includes('alpha'));
  const alphaOnlyLevels = sortedLevels.filter(level => level.toLowerCase().includes('alpha'));

  const grayFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase() === 'gray');
  const alphaFamilies = Object.entries(colors.palette).filter(([family]) => family.toLowerCase().includes('alpha'));
  const chromaticFamilies = Object.entries(colors.palette).filter(([family]) => 
    !family.toLowerCase().includes('gray') && !family.toLowerCase().includes('alpha')
  );

  return (
    <div className="py-8 flex flex-col gap-12">
      
      {/* --- Gray Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Gray</h3>
        <ColorGrid families={grayFamilies} levels={nonAlphaLevels} />
      </section>

      {/* --- Chromatic Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Chromatic</h3>
        <ColorGrid families={chromaticFamilies} levels={sortedLevels} />
      </section>

      {/* --- Alpha Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Alpha</h3>
        <ColorGrid families={alphaFamilies} levels={alphaOnlyLevels} />
      </section>

      {/* --- Tokens Section --- */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Tokens</h3>
        <TokensDisplay colors={colors.palette} />
      </section>
    </div>
  );
};

export default ColorPaletteDisplay;