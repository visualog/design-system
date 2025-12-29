import React, { useState } from 'react';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";

const ColorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('raw');
  const tabs = [
    { name: 'Raw Colors', value: 'raw' },
    { name: 'Theme Colors', value: 'theme' },
    { name: 'Semantic Colors', value: 'semantic' }
  ];

  return (
    <div id="colors" className="mb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Colors</h1>
      
      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="raw">
          <ColorPaletteDisplay />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="theme">
          <ThemeColorMappingDisplay />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="semantic">
          <SemanticColorMappingDisplay />
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default ColorsPage;