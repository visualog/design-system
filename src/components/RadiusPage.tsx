import React from 'react';
import RadiusDisplay from './RadiusDisplay';
import NestedRadiusDisplay from './NestedRadiusDisplay';
import { FoundationPageLayout } from './FoundationPageLayout';

const RadiusPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Radius"
            description="라디우스 시스템은 UI 요소의 모서리 곡률 기준을 정의합니다. 스케일 토큰과 중첩 계산 규칙을 순서대로 확인합니다."
        >
            <div className="doc-content-stack">
                <RadiusDisplay />
                <NestedRadiusDisplay />
            </div>
        </FoundationPageLayout>
    );
};

export default RadiusPage;
