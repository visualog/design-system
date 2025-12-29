import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';

const ThemeColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Theme Color Mapping</h2>
      {Object.entries(colors.themeMapping).map(([category, mappings]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(mappings).map(([themeVar, rawVar], index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center text-base font-medium font-mono mb-1">
                  <span>{themeVar}</span>
                  <Clipboard value={themeVar} />
                </div>
                <div className="flex items-center text-sm text-gray-600 font-mono">
                  <span>Mapped to: {rawVar as string}</span>
                  <Clipboard value={rawVar as string} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeColorMappingDisplay;