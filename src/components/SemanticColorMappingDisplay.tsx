import React from 'react';
import { designSystemData } from '../utils/dataLoader';

const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Semantic Color Mapping</h2>
      {Object.entries(colors.semanticMapping).map(([category, mappings]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(mappings).map(([semanticVar, themeVar], index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-base font-medium font-mono mb-1">{semanticVar}</p>
                <p className="text-sm text-gray-600 font-mono">Mapped to: {themeVar}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SemanticColorMappingDisplay;