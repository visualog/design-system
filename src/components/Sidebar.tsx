import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, X, Github, Moon, Sun, Grid, LogOut } from 'lucide-react';
import { version } from '../../package.json';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  showGrid: boolean;
  toggleGrid: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, showGrid, toggleGrid }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const foundationPaths = ["/colors", "/typography", "/spacing", "/radius", "/icons", "/shadows"];
  const settingsPaths = ["/site-settings"];
  const [isFoundationOpen, setIsFoundationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // If the root or a sub-path of foundation is active on load, open the foundation menu
    if (location.pathname === '/' || foundationPaths.some(p => location.pathname.startsWith(p))) {
      setIsFoundationOpen(true);
    }
    if (settingsPaths.some(p => location.pathname.startsWith(p))) {
      setIsSettingsOpen(true);
    }
  }, [location.pathname]); // Re-evaluate when pathname changes

  // Dark mode state init
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  // ... (skip down to return)

  // Ensure no duplicate code blocks here

  const [showFooterBorder, setShowFooterBorder] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowFooterBorder(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [isFoundationOpen]); // Re-check when menu expands/collapses

  // Use ResizeObserver for robust layout change detection
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(scrollContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const activeClassName = "flex items-center text-body-sm font-medium text-primary bg-accent p-2 rounded-md";
  const inactiveClassName = "flex items-center text-body-sm text-foreground hover:bg-accent p-2 rounded-md transition-colors duration-200";

  const toggleFoundationMenu = () => {
    setIsFoundationOpen(!isFoundationOpen);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 h-screen bg-background border-r border-border z-[80] transform md:translate-x-0 transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 'var(--sidebar-width)' }}
      >

        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden p-1"
          onClick={toggleSidebar}
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        <div
          ref={scrollContainerRef}
          className="p-4 flex-1 overflow-y-auto"
        >
          <div className="mb-8 px-2 flex items-baseline gap-2">
            <h1 className="text-heading-sm font-bold text-foreground">MIS</h1>
            <span className="text-label-sm text-muted-foreground">Design System</span>
            <span className="text-micro text-muted-foreground/80 font-mono">v{version}</span>
          </div>
          <nav>
            <ul className="flex flex-col gap-1">
              <li className="flex flex-col gap-1">
                <button
                  onClick={toggleFoundationMenu}
                  className="w-full flex items-center justify-between text-label-md text-foreground p-2 rounded-md hover:bg-accent"
                >
                  <span>Foundation</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isFoundationOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isFoundationOpen && (
                  <ul className="pl-4 flex flex-col gap-1">
                    <li>
                      <NavLink
                        to="/overview"
                        className={({ isActive }) => (isActive || location.pathname === '/') ? activeClassName : inactiveClassName}
                        onClick={toggleSidebar}
                      >
                        Overview
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/colors"
                        className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                        onClick={toggleSidebar}
                      >
                        Colors
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/typography" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Typography</NavLink>
                    </li>
                    <li>
                      <NavLink to="/spacing" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Spacing</NavLink>
                    </li>
                    <li>
                      <NavLink to="/layout" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Layout</NavLink>
                    </li>
                    <li>
                      <NavLink to="/radius" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Radius</NavLink>
                    </li>
                    {/* Motion page hidden for now
                    <li>
                      <NavLink to="/motion" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Motion</NavLink>
                    </li>
                    */}
                    <li>
                      <NavLink to="/icons" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Icons</NavLink>
                    </li>
                    <li>
                      <NavLink to="/shadows" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Shadows</NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div className="h-px bg-border my-2 mx-1" />
              </li>
              <li className="flex flex-col gap-1">
                <button
                  onClick={toggleSettingsMenu}
                  className="w-full flex items-center justify-between text-label-md text-foreground p-2 rounded-md hover:bg-accent"
                >
                  <span>Site Settings</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isSettingsOpen && (
                  <ul className="pl-4 flex flex-col gap-1">
                    <li>
                      <NavLink to="/site-settings/theme" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Theme</NavLink>
                    </li>
                    <li>
                      <NavLink to="/site-settings/layout" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Layout</NavLink>
                    </li>
                    <li>
                      <NavLink to="/site-settings/typography" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Typography</NavLink>
                    </li>
                    <li>
                      <NavLink to="/site-settings/components" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Components</NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className={`p-3 border-t flex items-center justify-between gap-1 transition-colors duration-200 ${showFooterBorder ? 'border-border' : 'border-transparent'}`}>
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors duration-200 text-foreground"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleGrid}
            className={`flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors duration-200 ${showGrid ? 'text-primary bg-accent' : 'text-foreground'}`}
            title={showGrid ? "Hide Grid Overlay" : "Show Grid Overlay"}
          >
            <Grid className="w-5 h-5" />
          </button>

          <a
            href="https://github.com/visualog/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors duration-200 text-foreground"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={logout}
            className="flex items-center justify-center p-2 rounded-md hover:bg-accent hover:text-destructive transition-colors duration-200 text-foreground"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside >
    </>
  );
};

export default Sidebar;