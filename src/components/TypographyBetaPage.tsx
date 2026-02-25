import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TypographyNewDisplay from './TypographyNewDisplay';
import TypographyUsage from './TypographyUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const TypographyBetaPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const tabs = [
    {
      value: 'overview',
      label: '개요',
      content: <TypographyNewDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드',
      content: (
        <div>
          <TypographyUsage />
        </div>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Typography Beta"
      description="뉴 타이포그래피 시스템을 검토하기 위한 베타 문서입니다."
      showExperimental={true}
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default TypographyBetaPage;
