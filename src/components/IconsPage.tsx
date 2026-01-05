import React, { useState } from 'react';
import IconDisplay from './IconDisplay';
import { Input } from '@/components/ui/input';

const IconsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div id="icons" className="mb-16 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Icons</h1>
      <div>
        <Input
          type="text"
          placeholder="Search 496 icons..."
          className="w-full px-4 py-2 rounded-lg shadow-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <IconDisplay searchQuery={searchQuery} />
    </div>
  );
};

export default IconsPage;