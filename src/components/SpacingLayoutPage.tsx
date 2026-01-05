import React from 'react';
import SpacingLayoutDisplay from './SpacingLayoutDisplay';

const SpacingLayoutPage: React.FC = () => {
  return (
    <div id="spacing" className="mb-16 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Spacing & Layout</h1>
      <SpacingLayoutDisplay />
    </div>
  );
};

export default SpacingLayoutPage;