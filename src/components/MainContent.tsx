import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-8 md:p-12 lg:p-16 md:pl-60">
      {children}
    </main>
  );
};

export default MainContent;