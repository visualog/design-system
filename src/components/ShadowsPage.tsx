import React from 'react';
import ShadowsDisplay from './ShadowsDisplay';

const ShadowsPage: React.FC = () => {
  return (
    <div id="shadows" className="mb-16 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Shadows</h1>
      <ShadowsDisplay />
    </div>
  );
};

export default ShadowsPage;