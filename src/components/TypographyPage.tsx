import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TypographyDisplay from './TypographyDisplay';
import TypographyNewDisplay from './TypographyNewDisplay';
import TypographyUsage from './TypographyUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TypographyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [viewMode, setViewMode] = useState<'legacy' | 'new'>('new');

  const legacyTabs = [
    {
      value: 'overview',
      label: '개요',
      content: <TypographyDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <div className="mt-6">
          <TypographyUsage />
        </div>
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
        <div className="mt-6">
          <TypographyUsage />
        </div>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Typography"
      description="타이포그래피 시스템은 플랫폼 전반에 걸쳐 가독성과 계층 구조를 보장합니다. 프리텐다드(Pretendard) 폰트 패밀리를 사용하며, 다양한 디바이스에 최적화된 반응형 타입 스케일을 정의합니다."
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