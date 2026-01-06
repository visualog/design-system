import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Menu } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// Import individual page components
import ColorsPage from './components/ColorsPage';
import TypographyPage from './components/TypographyPage';
import SpacingLayoutPage from './components/SpacingLayoutPage';
import RadiusPage from './components/RadiusPage';
import MotionPage from './components/MotionPage';
import IconsPage from './components/IconsPage';
import ShadowsPage from './components/ShadowsPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main content area */}
          <div className="flex-1 flex flex-col transition-all duration-300 md:pl-60">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center h-14 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[60]">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="-ml-2 mr-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
              <h1 className="font-semibold text-lg">Design System</h1>
            </header>

            <Routes>
              <Route path="/" element={<MainContent><ColorsPage /></MainContent>} /> {/* Default to Colors */}
              <Route path="/colors" element={<MainContent><ColorsPage /></MainContent>} />
              <Route path="/typography" element={<MainContent><TypographyPage /></MainContent>} />
              <Route path="/spacing" element={<MainContent><SpacingLayoutPage /></MainContent>} />
              <Route path="/radius" element={<MainContent><RadiusPage /></MainContent>} />
              <Route path="/motion" element={<MainContent><MotionPage /></MainContent>} />
              <Route path="/icons" element={<MainContent><IconsPage /></MainContent>} />
              <Route path="/shadows" element={<MainContent><ShadowsPage /></MainContent>} />
              {/* Fallback for unknown routes */}
              <Route path="*" element={<MainContent><div>404 Not Found</div></MainContent>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;