import React from 'react';
import TypographyDisplay from './TypographyDisplay';

const TypographyPage: React.FC = () => {
  return (
    <div id="typography" className="mb-16 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Typography</h1>
      <TypographyDisplay />
    </div>
  );
};

export default TypographyPage;