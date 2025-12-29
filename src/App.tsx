import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Menu } from 'lucide-react';

// Import individual page components
import ColorsPage from './components/ColorsPage';
import TypographyPage from './components/TypographyPage';
import SpacingLayoutPage from './components/SpacingLayoutPage';
import IconsPage from './components/IconsPage';
import ShadowsPage from './components/ShadowsPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-4 fixed top-0 left-0 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 transition-all duration-300">
          <Routes>
            <Route path="/" element={<MainContent><ColorsPage /></MainContent>} /> {/* Default to Colors */}
            <Route path="/colors" element={<MainContent><ColorsPage /></MainContent>} />
            <Route path="/typography" element={<MainContent><TypographyPage /></MainContent>} />
            <Route path="/spacing" element={<MainContent><SpacingLayoutPage /></MainContent>} />
            <Route path="/icons" element={<MainContent><IconsPage /></MainContent>} />
            <Route path="/shadows" element={<MainContent><ShadowsPage /></MainContent>} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<MainContent><div>404 Not Found</div></MainContent>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;