import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TypographyDisplay from './TypographyDisplay';
import TypographyNewDisplay from './TypographyNewDisplay';
import TypographyUsage from './TypographyUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocSection } from './ui/DocLayout';

const TypographyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [viewMode, setViewMode] = useState<'legacy' | 'new'>('new');

  const legacyTabs = [
    {
      value: 'overview',
      label: '개요',
      content: (
        <DocSection
          title="타입 스케일"
          description="타입 스케일 토큰과 카테고리별 사용 예시를 확인합니다."
        >
          <TypographyDisplay />
        </DocSection>
      )
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <DocSection
          title="사용 가이드"
          description="타이포그래피 위계와 가독성 원칙을 권장/비권장 예시로 정리합니다."
        >
          <TypographyUsage />
        </DocSection>
      )
    }
  ];

  const newTabs = [
    {
      value: 'overview',
      label: '개요',
      content: <TypographyNewDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <DocSection
          title="사용 가이드"
          description="타이포그래피 위계와 가독성 원칙을 권장/비권장 예시로 정리합니다."
        >
          <TypographyUsage />
        </DocSection>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Typography"
      description="타이포그래피 시스템은 읽기 흐름과 정보 위계를 명확히 정의합니다. 타입 스케일, 프리뷰 테스트, 사용 원칙을 순서대로 확인합니다."
      actions={
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'legacy' | 'new')} className="w-auto">
          <TabsList>
            <TabsTrigger value="new">New System</TabsTrigger>
            <TabsTrigger value="legacy">Legacy</TabsTrigger>
          </TabsList>
        </Tabs>
      }
      showExperimental={true}
    >
      <FoundationPageTabs
        key={viewMode}
        items={viewMode === 'new' ? newTabs : legacyTabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default TypographyPage;
