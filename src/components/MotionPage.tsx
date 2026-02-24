import React from 'react';
import MotionDisplay from '@/components/MotionDisplay';
import { FoundationPageLayout } from './FoundationPageLayout';
import { DocSection } from './ui/DocLayout';

const MotionPage: React.FC = () => {
    return (
        <FoundationPageLayout
            title="Motion"
            description="모션 시스템은 애니메이션의 지속 시간과 가속도 기준을 정의합니다. 인터랙션 플레이그라운드와 토큰 표를 순서대로 확인합니다."
        >
            <DocSection
                title="모션 토큰"
                description="지속 시간과 가속도 토큰을 플레이그라운드와 표로 확인합니다."
            >
                <MotionDisplay />
            </DocSection>
        </FoundationPageLayout>
    );
};

export default MotionPage;
