import React from 'react';
import Breadcrumb from './ui/Breadcrumb';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 pt-8 md:p-12 lg:p-16 md:pl-60">
      <article>
        <Breadcrumb />
        {children}
      </article>
    </main>
  );
};

export default MainContent;