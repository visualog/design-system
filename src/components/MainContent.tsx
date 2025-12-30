import React from 'react';
import Breadcrumb from './ui/Breadcrumb';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-6 md:p-8 lg:p-12 md:pl-60">
      <article className="max-w-3xl mx-auto flex flex-col gap-4">
        <Breadcrumb />
        {children}
      </article>
    </main>
  );
};

export default MainContent;