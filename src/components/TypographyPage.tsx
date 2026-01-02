import React from 'react';
import TypographyDisplay from './TypographyDisplay';

const TypographyPage: React.FC = () => {
  return (
    <div id="typography" className="mb-16">
      <h2 className="text-4xl font-bold text-foreground mb-8">Typography</h2>
      <TypographyDisplay />
    </div>
  );
};

export default TypographyPage;