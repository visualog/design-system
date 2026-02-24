import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RadiusDisplay from './RadiusDisplay';
import NestedRadiusDisplay from './NestedRadiusDisplay';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const RadiusPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const tabs = [
        {
            value: 'overview',
            label: '개요',
            content: (
                <DocSection
                    title="라디우스 스케일"
                    description="라디우스 스케일과 토큰별 규칙을 확인합니다."
                >
                    <RadiusDisplay />
                </DocSection>
            )
        },
        {
            value: 'usage',
            label: '사용 가이드',
            content: (
                <DocSection
                    title="사용 가이드"
                    description="중첩 라디우스 계산 규칙을 인터랙티브 예시로 확인합니다."
                >
                    <NestedRadiusDisplay />
                </DocSection>
            )
        }
    ];

    return (
        <FoundationPageLayout
            title="Radius"
            description="라디우스 시스템은 UI 요소의 모서리 곡률 기준을 정의합니다. 스케일 토큰과 중첩 계산 규칙을 순서대로 확인합니다."
        >
            <FoundationPageTabs
                items={tabs}
                defaultValue={tabFromUrl || 'overview'}
            />
        </FoundationPageLayout>
    );
};

export default RadiusPage;
