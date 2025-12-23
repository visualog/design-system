import React from 'react';
import IconDisplay from './IconDisplay';

const IconsPage: React.FC = () => {
  return (
    <div id="icons" className="mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Icons</h2>
      <IconDisplay />
    </div>
  );
};

export default IconsPage;