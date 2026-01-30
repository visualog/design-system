import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Menu } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// Import individual page components
import ColorsPage from './components/ColorsPage';
import TypographyPage from './components/TypographyPage';
import SpacingPage from './components/SpacingPage';
import LayoutPage from './components/LayoutPage';
import RadiusPage from './components/RadiusPage';
import MotionPage from './components/MotionPage';
import IconsPage from './components/IconsPage';
import ShadowsPage from './components/ShadowsPage';
import SiteSettingsPage from './components/SiteSettingsPage';
import SiteComponentsPage from './components/SiteComponentsPage';
import SiteThemePage from './components/SiteThemePage';
import SiteLayoutPage from './components/SiteLayoutPage';
import SiteTypographyPage from './components/SiteTypographyPage';
import ComponentDetailPage from './components/ComponentDetailPage';

import { GridOverlay } from './components/ui/GridOverlay';

import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  // Close sidebar automatically when screen width is large enough (desktop)
  // This prevents the mobile sidebar from staying open when resizing from mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/*"
                element={
                  <div className="flex min-h-screen bg-background">
                    {/* Sidebar */}
                    <Sidebar
                      isOpen={isSidebarOpen}
                      toggleSidebar={toggleSidebar}
                      showGrid={showGrid}
                      toggleGrid={toggleGrid}
                    />

                    {/* Main content area */}
                    <div
                      className="flex-1 flex flex-col transition-all duration-300 relative ml-0 md:ml-[240px]"
                    >
                      {showGrid && <GridOverlay />}

                      {/* Mobile Header */}
                      <header className="md:hidden flex items-center h-14 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[60]">
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="-ml-2 mr-2">
                          <Menu className="w-5 h-5" />
                          <span className="sr-only">Toggle Menu</span>
                        </Button>
                        <h1 className="font-semibold text-lg">Design System</h1>
                      </header>

                      <Routes>
                        <Route path="/" element={<MainContent maxWidth="wide"><ColorsPage /></MainContent>} /> {/* Default to Colors */}
                        <Route path="/colors" element={<MainContent maxWidth="wide"><ColorsPage /></MainContent>} />
                        <Route path="/typography" element={<MainContent maxWidth="wide"><TypographyPage /></MainContent>} />
                        <Route path="/spacing" element={<MainContent maxWidth="wide"><SpacingPage /></MainContent>} />
                        <Route path="/layout" element={<MainContent maxWidth="wide"><LayoutPage /></MainContent>} />
                        <Route path="/radius" element={<MainContent maxWidth="wide"><RadiusPage /></MainContent>} />
                        <Route path="/motion" element={<MainContent maxWidth="wide"><MotionPage /></MainContent>} />
                        <Route path="/icons" element={<MainContent maxWidth="wide"><IconsPage /></MainContent>} />
                        <Route path="/shadows" element={<MainContent maxWidth="wide"><ShadowsPage /></MainContent>} />
                        <Route path="/site-settings" element={<MainContent><SiteSettingsPage /></MainContent>} />
                        <Route path="/site-settings/components" element={<MainContent maxWidth="wide"><SiteComponentsPage /></MainContent>} />
                        <Route path="/site-settings/theme" element={<MainContent maxWidth="wide"><SiteThemePage /></MainContent>} />
                        <Route path="/site-settings/layout" element={<MainContent maxWidth="wide"><SiteLayoutPage /></MainContent>} />
                        <Route path="/site-settings/typography" element={<MainContent maxWidth="wide"><SiteTypographyPage /></MainContent>} />
                        <Route path="/site-settings/components/:componentName" element={<MainContent maxWidth="wide"><ComponentDetailPage /></MainContent>} />
                        {/* Fallback for unknown routes */}
                        <Route path="*" element={<MainContent><div>404 Not Found</div></MainContent>} />
                      </Routes>
                    </div>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;