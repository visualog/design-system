import React from 'react';
import ShadowsDisplay from './ShadowsDisplay';

const ShadowsPage: React.FC = () => {
  return (
    <div id="shadows" className="mb-16">
      <h2 className="text-4xl font-bold text-foreground mb-8">Shadows</h2>
      <ShadowsDisplay />
    </div>
  );
};

export default ShadowsPage;