import React from 'react';
import MotionDisplay from '@/components/MotionDisplay';

const MotionPage: React.FC = () => {
    return (
        <div id="motion" className="mb-16 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-foreground">Motion</h1>
                <p className="text-base text-muted-foreground">
                    Motion 토큰은 애니메이션의 지속 시간과 가속도를 정의하여 자연스럽고 반응성 있는 인터페이스 느낌을 만듭니다.
                </p>
            </div>

            <div className="pt-4">
                <MotionDisplay />
            </div>
        </div>
    );
};

export default MotionPage;
