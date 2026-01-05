import React from 'react';
import TypographyDisplay from './TypographyDisplay';

const TypographyPage: React.FC = () => {
  return (
    <div id="typography" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Typography</h1>
        <p className="text-base text-muted-foreground">
          타이포그래피 시스템은 플랫폼 전반에 걸쳐 가독성과 계층 구조를 보장합니다. 프리텐다드(Pretendard) 폰트 패밀리를 사용하며, 다양한 디바이스에 최적화된 반응형 타입 스케일을 정의합니다.
        </p>
      </div>
      <TypographyDisplay />
    </div>
  );
};

export default TypographyPage;