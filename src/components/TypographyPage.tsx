import React from 'react';
import TypographyDisplay from './TypographyDisplay';
import TypographyUsage from './TypographyUsage';
import { FoundationPageLayout } from './FoundationPageLayout';

const TypographyPage: React.FC = () => {
  return (
    <FoundationPageLayout
      title="Typography"
      description="타이포그래피 시스템은 읽기 흐름과 정보 위계를 명확히 정의합니다. 타입 스케일, 프리뷰 테스트, 사용 원칙을 순서대로 확인합니다."
    >
      <div className="doc-content-stack">
        <TypographyDisplay showTester={false} />
        <TypographyUsage />
      </div>
    </FoundationPageLayout>
  );
};

export default TypographyPage;
