import React, { useState } from 'react';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";

const ColorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('raw');
  const tabs = [
    { name: '전체 색상 (Raw Colors)', value: 'raw' },
    { name: '테마 색상 (Theme Colors)', value: 'theme' },
    { name: '시맨틱 색상 (Semantic Colors)', value: 'semantic' }
  ];

  return (
    <div id="colors" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Colors</h1>
        <p className="text-base text-muted-foreground">
          색상 시스템은 접근성과 일관성을 고려하여 설계되었습니다. 전체 색상 팔레트(Raw Palette), 라이트/다크 모드에 매핑된 테마 색상(Theme Colors), 그리고 사용 목적에 따른 시맨틱 색상(Semantic Colors)으로 구성되어 있습니다.
        </p>
      </div>

      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="raw">
          <div className="pt-8">
            <ColorPaletteDisplay />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="theme">
          <div className="pt-8">
            <ThemeColorMappingDisplay />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="semantic">
          <div className="pt-8">
            <SemanticColorMappingDisplay />
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default ColorsPage;