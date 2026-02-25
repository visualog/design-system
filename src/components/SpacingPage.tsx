import React from 'react';
import SpacingDisplay from './SpacingDisplay';
import SpacingUsage from './SpacingUsage';
import { FoundationPageLayout } from './FoundationPageLayout';

const SpacingPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Spacing"
            description="간격 시스템은 4px 그리드를 기준으로 패딩, 마진, 요소 간 간격을 정의합니다. 토큰 스케일과 적용 기준을 순서대로 확인합니다."
        >
            <div className="doc-content-stack">
                <SpacingDisplay />
                <SpacingUsage />
            </div>
        </FoundationPageLayout>
    );
};

export default SpacingPage;
