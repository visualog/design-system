import React from 'react';
import IconDisplay from './IconDisplay';
import IconsUsage from './IconsUsage';
import { FoundationPageLayout } from './FoundationPageLayout';

const IconsPage: React.FC = () => {
  return (
    <FoundationPageLayout
      title="Icons"
      description="아이콘 시스템은 의미 전달과 탐색을 위한 시각 언어를 정의합니다. 라인(Line)/필드(Filled)/일러스트(Illustration) 아이콘 탐색과 사용 기준을 순서대로 확인합니다."
    >
      <div className="doc-content-stack">
        <IconDisplay />
        <IconsUsage />
      </div>
    </FoundationPageLayout>
  );
};

export default IconsPage;
