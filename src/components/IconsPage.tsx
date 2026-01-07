import React from 'react';
import IconDisplay from './IconDisplay';

const IconsPage: React.FC = () => {
  return (
    <div id="icons" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Icons</h1>
        <p className="text-base text-muted-foreground">
          다양한 사용 사례를 위한 포괄적인 아이콘 세트입니다. Line, Filled, Illustration 스타일을 제공하며, 내비게이션 및 시각적 커뮤니케이션을 강화하는 데 사용됩니다.
        </p>
      </div>
      <IconDisplay />
    </div>
  );
};

export default IconsPage;