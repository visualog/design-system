import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RadiusDisplay from './RadiusDisplay';
import NestedRadiusDisplay from './NestedRadiusDisplay';
import { FoundationPageLayout, FoundationPageTabs } from './FoundationPageLayout';

const RadiusPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const tabs = [
        {
            value: 'overview',
            label: '개요',
            content: <RadiusDisplay />
        },
        {
            value: 'usage',
            label: '사용 가이드',
            content: (
                <div className="mt-6">
                    <NestedRadiusDisplay />
                </div>
            )
        }
    ];

    return (
        <FoundationPageLayout
            title="Radius"
            description="Radius 토큰은 UI 요소의 모서리 둥글기를 정의하여, 친근하고 현대적인 인터페이스를 만듭니다. 일관된 형태 사용은 브랜드 아이덴티티를 강화하고 더 부드러운 사용자 경험을 제공합니다."
        >
            <FoundationPageTabs
                items={tabs}
                defaultValue={tabFromUrl || 'overview'}
            />
        </FoundationPageLayout>
    );
};

export default RadiusPage;
