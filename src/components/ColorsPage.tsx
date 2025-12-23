import React from 'react';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';

const ColorsPage: React.FC = () => {
  return (
    <div id="colors" className="mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Colors</h2>
      <ColorPaletteDisplay />
      <ThemeColorMappingDisplay />
      <SemanticColorMappingDisplay />
    </div>
  );
};

export default ColorsPage;