import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ShadowsDisplay from './ShadowsDisplay';
import ShadowsUsage from './ShadowsUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const ShadowsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const tabs = [
    {
      value: 'overview',
      label: '토큰 (Tokens)',
      content: <ShadowsDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드 (Usage)',
      content: (
        <div className="mt-6">
          <ShadowsUsage />
        </div>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Shadows"
      description="그림자는 인터페이스에 깊이와 계층감을 더합니다. 광원과 일관된 방식으로 컴포넌트를 강조하여 명확한 레이어링을 표현하는 데 사용하세요."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default ShadowsPage;