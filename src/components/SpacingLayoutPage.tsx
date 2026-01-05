import React from 'react';
import SpacingLayoutDisplay from './SpacingLayoutDisplay';

const SpacingLayoutPage: React.FC = () => {
  return (
    <div id="spacing" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Spacing & Layout</h1>
        <p className="text-base text-muted-foreground">
          간격 시스템은 4px 그리드를 기반으로 합니다. 일관된 패딩, 마진 및 레이아웃 구조를 제공하여 모든 화면 크기에서 시각적 조화와 반응형 정렬을 보장합니다.
        </p>
      </div>
      <SpacingLayoutDisplay />
    </div>
  );
};

export default SpacingLayoutPage;