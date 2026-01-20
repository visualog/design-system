import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import ColorUsage from './ColorUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const ColorsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  // URL param sync logic can be handled by the parent or within Tabs if needed, 
  // but for now relying on defaultValue is simplest or we can lift state if FoundationPageTabs supports it.
  // FoundationPageTabs takes defaultValue, but doesn't expose controlled state props in the interface I defined yet.
  // For this step, I will let the internal state of Tabs handle switching, 
  // but if deep linking is critical, I might need to update FoundationPageLayout to accept value/onValueChange.
  // Given the props I defined: items, defaultValue.

  // Let's stick to the defined interface for now.

  const tabs = [
    {
      value: 'scale',
      label: '스케일',
      content: (
        <div className="mt-6">
          <ColorPaletteDisplay view="grid" />
        </div>
      )
    },
    {
      value: 'raw',
      label: '원시 컬러',
      content: <ColorPaletteDisplay view="table" />
    },
    {
      value: 'theme',
      label: '테마 컬러',
      content: <ThemeColorMappingDisplay />
    },
    {
      value: 'semantic',
      label: '시맨틱 컬러',
      content: <SemanticColorMappingDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <div className="mt-6">
          <ColorUsage />
        </div>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Colors"
      description="컬러 시스템은 접근성과 일관성을 고려하여 설계되었습니다. 전체 컬러 팔레트(Raw Palette), 라이트/다크 모드에 매핑된 테마 컬러(Theme Colors), 그리고 사용 목적에 따른 시맨틱 컬러(Semantic Colors)로 구성되어 있습니다."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'scale'}
      />
    </FoundationPageLayout>
  );
};

export default ColorsPage;