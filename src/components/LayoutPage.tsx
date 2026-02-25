import React from 'react';

import LayoutDisplay from './LayoutDisplay';
import { FoundationPageLayout } from './FoundationPageLayout';

const LayoutPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Layout"
            description="레이아웃 시스템은 해상도, 반응형 전환 기준, 마진/거터 규칙을 정의합니다. 해상도, 브레이크포인트, 메인 레이아웃 기준을 순서대로 확인합니다."
        >
            <LayoutDisplay />
        </FoundationPageLayout>
    );
};

export default LayoutPage;
