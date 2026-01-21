import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, X, Settings, Github, Moon, Sun } from 'lucide-react';
import { version } from '../../package.json';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const foundationPaths = ["/colors", "/typography", "/spacing", "/radius", "/icons", "/shadows"];
  const [isFoundationOpen, setIsFoundationOpen] = useState(false);

  useEffect(() => {
    // If the root or a sub-path of foundation is active on load, open the foundation menu
    if (location.pathname === '/' || foundationPaths.some(p => location.pathname.startsWith(p))) {
      setIsFoundationOpen(true);
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

  const activeClassName = "flex items-center text-sm text-primary bg-accent p-2 rounded-md";
  const inactiveClassName = "flex items-center text-sm text-foreground hover:bg-accent p-2 rounded-md transition-colors duration-200";

  const toggleFoundationMenu = () => {
    setIsFoundationOpen(!isFoundationOpen);
    // checkScroll will be triggered by useEffect dependency on isFoundationOpen
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
            <h1 className="text-xl font-bold text-foreground">MDS</h1>
            <span className="text-xs text-muted-foreground font-medium">Design System</span>
            <span className="text-[10px] text-muted-foreground/80 font-mono">v{version}</span>
          </div>
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={toggleFoundationMenu}
                  className="w-full flex items-center justify-between text-base text-foreground font-semibold p-2 rounded-md hover:bg-accent"
                >
                  <span>Foundation</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isFoundationOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isFoundationOpen && (
                  <ul className="pt-2 pl-4 space-y-1">
                    <li>
                      <NavLink
                        to="/colors"
                        className={({ isActive }) => (isActive || location.pathname === '/') ? activeClassName : inactiveClassName}
                        onClick={toggleSidebar}
                      >
                        Colors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/typography" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Typography</NavLink>
                    </li>
                    <li>
                      <NavLink to="/spacing" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Spacing & Layout</NavLink>
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
              <li>
                <NavLink
                  to="/site-settings"
                  className={({ isActive }) => `w-full flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${isActive ? 'text-primary bg-accent' : 'text-foreground hover:bg-accent'}`}
                  onClick={toggleSidebar}
                  title="Site Settings"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-base font-semibold">Site Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className={`p-4 border-t flex items-center justify-end gap-2 flex-wrap transition-colors duration-200 ${showFooterBorder ? 'border-border' : 'border-transparent'}`}>
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center p-2 rounded-md hover:bg-accent transition-colors duration-200 text-foreground"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;