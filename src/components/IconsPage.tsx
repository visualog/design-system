import React, { useState } from 'react';
import IconDisplay from './IconDisplay';
import { Input } from '@/components/ui/input';

const IconsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div id="icons" className="mb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Icons</h1>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search icons..."
          className="w-full px-4 py-2 rounded-lg shadow-none border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <IconDisplay searchQuery={searchQuery} />
    </div>
  );
};

export default IconsPage;