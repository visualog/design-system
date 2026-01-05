import React, { useState } from 'react';
import IconDisplay from './IconDisplay';
import { Input } from '@/components/ui/input';

const IconsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div id="icons" className="mb-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Icons</h1>
        <p className="text-base text-muted-foreground">
          다양한 사용 사례를 위한 포괄적인 아이콘 세트입니다. Line, Filled, Illustration 스타일을 제공하며, 내비게이션 및 시각적 커뮤니케이션을 강화하는 데 사용됩니다.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <Input
            type="text"
            placeholder="496개 아이콘 검색..."
            className="w-full px-4 py-2 rounded-lg shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <IconDisplay searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default IconsPage;