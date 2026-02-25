import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ColorPaletteDisplay from './ColorPaletteDisplay';
import ThemeColorMappingDisplay from './ThemeColorMappingDisplay';
import SemanticColorMappingDisplay from './SemanticColorMappingDisplay';
import ColorUsage from './ColorUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { Switch } from './ui/switch';

const ColorsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const supportsDarkMode = (tabValue: string) =>
    tabValue === 'scale' || tabValue === 'raw' || tabValue === 'theme' || tabValue === 'semantic';

  const tabs = [
    {
      value: 'scale',
      label: '스케일',
      content: (
        <ColorPaletteDisplay
          view="grid"
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          showDarkModeControl={false}
        />
      )
    },
    {
      value: 'raw',
      label: '원시 컬러',
      content: (
        <ColorPaletteDisplay
          view="table"
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          showDarkModeControl={false}
        />
      )
    },
    {
      value: 'theme',
      label: '테마 컬러',
      content: (
        <ThemeColorMappingDisplay
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          showDarkModeControl={false}
        />
      )
    },
    {
      value: 'semantic',
      label: '시맨틱 컬러',
      content: (
        <SemanticColorMappingDisplay
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          showDarkModeControl={false}
        />
      )
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: <ColorUsage />
    }
  ];

  return (
    <FoundationPageLayout
      title="Colors"
      description="컬러 시스템은 접근성과 일관성을 기준으로 색상 역할을 정의합니다. 컬러 원칙, 스케일, 네이밍 규칙, 사용 가이드를 순서대로 확인합니다."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'scale'}
        floatingAction={(activeTab) =>
          supportsDarkMode(activeTab) ? (
            <div className="inline-flex items-center gap-2">
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                id={`colors-dark-mode-${activeTab}`}
              />
              <label
                htmlFor={`colors-dark-mode-${activeTab}`}
                className="text-xs font-medium leading-none cursor-pointer whitespace-nowrap text-muted-foreground"
              >
                {isDarkMode ? 'Dark' : 'Light'}
              </label>
            </div>
          ) : null
        }
      />
    </FoundationPageLayout>
  );
};

export default ColorsPage;
