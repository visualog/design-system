import React, { useState } from 'react';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";

const ColorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('palette');
  const tabs = [
    { name: 'Palette', value: 'palette' },
    { name: 'Color System', value: 'system' },
    { name: 'Color Role', value: 'role' }
  ];

  return (
    <div id="colors" className="mb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Colors</h1>
      
      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="palette">
          <ColorPaletteDisplay />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="system">
          <ThemeColorMappingDisplay />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="role">
          <SemanticColorMappingDisplay />
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default ColorsPage;