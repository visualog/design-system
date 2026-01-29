import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SpacingDisplay from './SpacingDisplay';
import SpacingUsage from './SpacingUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const SpacingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const tabs = [
        {
            value: 'overview',
            label: '개요',
            content: <SpacingDisplay />
        },
        {
            value: 'usage',
            label: '사용 가이드',
            content: (
                <div className="mt-6">
                    <SpacingUsage />
                </div>
            )
        }
    ];

    return (
        <FoundationPageLayout
            title="Spacing"
            description="간격 시스템은 4px 그리드를 기반으로 합니다. 일관된 패딩, 마진 구조를 제공하여 모든 화면 크기에서 시각적 조화와 반응형 정렬을 보장합니다."
        >
            <FoundationPageTabs
                items={tabs}
                defaultValue={tabFromUrl || 'overview'}
            />
        </FoundationPageLayout>
    );
};

export default SpacingPage;
