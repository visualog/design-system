import React from 'react';
import SpacingLayoutDisplay from './SpacingLayoutDisplay';

const SpacingLayoutPage: React.FC = () => {
  return (
    <div id="spacing" className="mb-16">
      <h2 className="text-4xl font-bold text-foreground mb-8">Spacing & Layout</h2>
      <SpacingLayoutDisplay />
    </div>
  );
};

export default SpacingLayoutPage;