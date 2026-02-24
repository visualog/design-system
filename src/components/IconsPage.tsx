import React from 'react';
import { useSearchParams } from 'react-router-dom';
import IconDisplay from './IconDisplay';
import IconsUsage from './IconsUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const IconsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const tabs = [
    {
      value: 'overview',
      label: '개요',
      content: (
        <DocSection
          title="아이콘 탐색"
          description="라인(Line), 필드(Filled), 일러스트(Illustration) 아이콘 세트를 검색/필터 기반으로 탐색합니다."
        >
          <IconDisplay />
        </DocSection>
      )
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <DocSection
          title="사용 가이드"
          description="아이콘 크기/색상/맥락 사용 규칙을 권장/비권장 예시로 정리합니다."
        >
          <IconsUsage />
        </DocSection>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Icons"
      description="아이콘 시스템은 의미 전달과 탐색을 위한 시각 언어를 정의합니다. 라인(Line)/필드(Filled)/일러스트(Illustration) 아이콘 탐색과 사용 기준을 순서대로 확인합니다."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default IconsPage;
