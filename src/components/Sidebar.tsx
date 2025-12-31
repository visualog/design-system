import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const foundationPaths = ["/colors", "/typography", "/spacing", "/icons", "/shadows"];
  const [isFoundationOpen, setIsFoundationOpen] = useState(false);

  useEffect(() => {
    // If the root or a sub-path of foundation is active on load, open the foundation menu
    if (location.pathname === '/' || foundationPaths.some(p => location.pathname.startsWith(p))) {
      setIsFoundationOpen(true);
    }
  }, [location.pathname]); // Re-evaluate when pathname changes

  const activeClassName = "flex items-center text-sm text-blue-600 bg-blue-50 p-2 rounded-md";
  const inactiveClassName = "flex items-center text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors duration-200";

  const toggleFoundationMenu = () => {
    setIsFoundationOpen(!isFoundationOpen);
  };

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 h-screen w-60 bg-white p-4 border-r border-gray-200 z-50 transform md:translate-x-0 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden p-1"
          onClick={toggleSidebar}
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-8 px-2">Design System</h1>
        <nav>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={toggleFoundationMenu}
                className="w-full flex items-center justify-between text-base text-gray-800 font-semibold p-2 rounded-md hover:bg-gray-100"
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
                    <NavLink to="/icons" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Icons</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shadows" className={({ isActive }) => isActive ? activeClassName : inactiveClassName} onClick={toggleSidebar}>Shadows</NavLink>
                  </li>
                </ul>
              )}
            </li>
            {/* Add other top-level menu items here in the future */}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;