import React from 'react';

import LayoutDisplay from './LayoutDisplay';
import { FoundationPageLayout } from './FoundationPageLayout';

const LayoutPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Layout"
            description="레이아웃 시스템은 12컬럼 그리드를 기본으로 하며, 다양한 디바이스 해상도에 대응하는 반응형 중단점과 여백 규칙을 정의합니다. 일관된 레이아웃 구조를 통해 사용자에게 안정적인 시각적 경험을 제공합니다."
        >
            <LayoutDisplay />
        </FoundationPageLayout>
    );
};

export default LayoutPage;
