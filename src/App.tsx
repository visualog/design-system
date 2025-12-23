import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

// Import individual page components
import ColorsPage from './components/ColorsPage';
import TypographyPage from './components/TypographyPage';
import SpacingLayoutPage from './components/SpacingLayoutPage';
import IconsPage from './components/IconsPage';
import ShadowsPage from './components/ShadowsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
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
    </BrowserRouter>
  );
}

export default App;