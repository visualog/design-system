import React from 'react';

import LayoutDisplay from './LayoutDisplay';
import { FoundationPageLayout } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const LayoutPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Layout"
            description="레이아웃 시스템은 해상도, 반응형 전환 기준, 마진/거터 규칙을 정의합니다. 해상도, 브레이크포인트, 메인 레이아웃 기준을 순서대로 확인합니다."
        >
            <DocSection
                title="레이아웃 기준"
                description="해상도, 중단점, 디바이스별 메인 레이아웃 규칙을 확인합니다."
            >
                <LayoutDisplay />
            </DocSection>
        </FoundationPageLayout>
    );
};

export default LayoutPage;
