import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SpacingDisplay from './SpacingDisplay';
import SpacingUsage from './SpacingUsage';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const SpacingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const tabs = [
        {
            value: 'overview',
            label: '개요',
            content: (
                <DocSection
                    title="간격 시스템"
                    description="4px 그리드 기반 간격 시스템과 토큰 스케일을 확인합니다."
                >
                    <SpacingDisplay />
                </DocSection>
            )
        },
        {
            value: 'usage',
            label: '사용 가이드',
            content: (
                <DocSection
                    title="사용 가이드"
                    description="간격 원칙과 간격(gap)/안쪽 여백(padding) 적용 기준을 권장/비권장 예시로 정리합니다."
                >
                    <SpacingUsage />
                </DocSection>
            )
        }
    ];

    return (
        <FoundationPageLayout
            title="Spacing"
            description="간격 시스템은 4px 그리드를 기준으로 패딩, 마진, 요소 간 간격을 정의합니다. 토큰 스케일과 적용 기준을 순서대로 확인합니다."
        >
            <FoundationPageTabs
                items={tabs}
                defaultValue={tabFromUrl || 'overview'}
            />
        </FoundationPageLayout>
    );
};

export default SpacingPage;
