import React from 'react';
import { useSearchParams } from 'react-router-dom';
import IconDisplay from './IconDisplay';
import IconsUsage from './IconsUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const IconsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const tabs = [
    {
      value: 'overview',
      label: '개요 (Overview)',
      content: <IconDisplay />
    },
    {
      value: 'usage',
      label: '사용 가이드 (Usage)',
      content: (
        <div className="mt-6">
          <IconsUsage />
        </div>
      )
    }
  ];

  return (
    <FoundationPageLayout
      title="Icons"
      description="다양한 사용 사례를 위한 포괄적인 아이콘 세트입니다. Line, Filled, Illustration 스타일을 제공하며, 내비게이션 및 시각적 커뮤니케이션을 강화하는 데 사용됩니다."
    >
      <FoundationPageTabs
        items={tabs}
        defaultValue={tabFromUrl || 'overview'}
      />
    </FoundationPageLayout>
  );
};

export default IconsPage;