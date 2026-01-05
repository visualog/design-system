import React from 'react';
import ShadowsDisplay from './ShadowsDisplay';

const ShadowsPage: React.FC = () => {
  return (
    <div id="shadows" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Shadows</h1>
        <p className="text-base text-muted-foreground">
          그림자는 인터페이스에 깊이와 계층감을 더합니다. 광원과 일관된 방식으로 컴포넌트를 강조하여 명확한 레이어링을 표현하는 데 사용하세요.
        </p>
      </div>
      <ShadowsDisplay />
    </div>
  );
};

export default ShadowsPage;