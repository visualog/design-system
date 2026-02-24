import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ShadowsDisplay from './ShadowsDisplay';
import ShadowsUsage from './ShadowsUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const ShadowsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const tabs = [
    {
      value: 'overview',
      label: '개요',
      content: (
        <DocSection
          title="그림자 스케일"
          description="그림자 스케일, 인터랙티브 플레이그라운드, 토큰 표를 확인합니다."
        >
          <ShadowsDisplay />
        </DocSection>
      )
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <DocSection
          title="사용 가이드"
          description="엘리베이션 계층과 대표 컴포넌트 사용 사례를 확인합니다."
        >
          <ShadowsUsage />
        </DocSection>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Shadows"
      description="그림자 시스템은 계층과 강조를 시각적으로 구분하는 기준을 정의합니다. 스케일, 인터랙티브 시뮬레이션, 토큰 정의를 순서대로 확인합니다."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default ShadowsPage;
