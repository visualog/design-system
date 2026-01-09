import React from 'react';
import RadiusDisplay from './RadiusDisplay';
import NestedRadiusDisplay from './NestedRadiusDisplay';

const RadiusPage: React.FC = () => {
    return (
        <div id="radius" className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-foreground">Radius</h1>
                <p className="text-base text-muted-foreground">
                    Radius 토큰은 UI 요소의 모서리 둥글기를 정의하여, 친근하고 현대적인 인터페이스를 만듭니다. 일관된 형태 사용은 브랜드 아이덴티티를 강화하고 더 부드러운 사용자 경험을 제공합니다.
                </p>
            </div>

            <RadiusDisplay />
            {/* <NestedRadiusDisplay /> */}
        </div>
    );
};

export default RadiusPage;
