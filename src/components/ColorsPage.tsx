import React, { useState } from 'react';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import { AnimatedTabs, AnimatedTabsContent } from "@/components/ui/animated-tabs";

import ColorUsage from './ColorUsage';

const ColorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scale');
  const tabs = [
    { name: '스케일', value: 'scale' },
    { name: '원시 컬러', value: 'raw' },
    { name: '테마 컬러', value: 'theme' },
    { name: '시맨틱 컬러', value: 'semantic' },
    { name: '사용 가이드', value: 'usage' }
  ];

  return (
    <div id="colors" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Colors</h1>
        <p className="text-base text-muted-foreground">
          컬러 시스템은 접근성과 일관성을 고려하여 설계되었습니다. 전체 컬러 팔레트(Raw Palette), 라이트/다크 모드에 매핑된 테마 컬러(Theme Colors), 그리고 사용 목적에 따른 시맨틱 컬러(Semantic Colors)로 구성되어 있습니다.
        </p>
      </div>

      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatedTabsContent value="scale">
          <div className="mt-6">
            <ColorPaletteDisplay view="grid" />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="raw">
          <div>
            <ColorPaletteDisplay view="table" />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="theme">
          <div>
            <ThemeColorMappingDisplay />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="semantic">
          <div>
            <SemanticColorMappingDisplay />
          </div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="usage">
          <div className="mt-6">
            <ColorUsage />
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default ColorsPage;