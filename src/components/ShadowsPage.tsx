import React from 'react';
import ShadowsDisplay from './ShadowsDisplay';
import ShadowsUsage from './ShadowsUsage';
import { FoundationPageLayout } from './FoundationPageLayout';

const ShadowsPage: React.FC = () => {
  return (
    <FoundationPageLayout
      title="Shadows"
      description="그림자 시스템은 계층과 강조를 시각적으로 구분하는 기준을 정의합니다. 스케일, 사용 가이드, 토큰 정의를 순서대로 확인합니다."
    >
      <div className="doc-content-stack">
        <ShadowsDisplay />
        <ShadowsUsage />
      </div>
    </FoundationPageLayout>
  );
};

export default ShadowsPage;
