import React, { useState } from 'react';
import IconDisplay from './IconDisplay';

const IconsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div id="icons" className="mb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Icons</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search icons..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <IconDisplay searchQuery={searchQuery} />
    </div>
  );
};

export default IconsPage;