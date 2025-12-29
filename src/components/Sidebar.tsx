import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const foundationPaths = ["/colors", "/typography", "/spacing", "/icons", "/shadows"];
  const [isFoundationOpen, setIsFoundationOpen] = useState(foundationPaths.some(p => location.pathname.startsWith(p)));

  const activeClassName = "flex items-center text-lg text-blue-600 bg-blue-50 p-2 rounded-md";
  const inactiveClassName = "flex items-center text-lg text-gray-700 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200";

  const toggleFoundationMenu = () => {
    setIsFoundationOpen(!isFoundationOpen);
  };

  return (
    <aside className="w-64 bg-white p-4 h-screen sticky top-0 border-r border-gray-200 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 px-2">Design System</h1>
      <nav>
        <ul className="space-y-1">
          <li>
            <button 
              onClick={toggleFoundationMenu}
              className="w-full flex items-center justify-between text-lg text-gray-800 font-semibold p-2 rounded-md hover:bg-gray-100"
            >
              <span>Foundation</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${isFoundationOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {isFoundationOpen && (
              <ul className="pt-2 pl-4 space-y-1">
                <li>
                  <NavLink to="/colors" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Colors</NavLink>
                </li>
                <li>
                  <NavLink to="/typography" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Typography</NavLink>
                </li>
                <li>
                  <NavLink to="/spacing" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Spacing & Layout</NavLink>
                </li>
                <li>
                  <NavLink to="/icons" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Icons</NavLink>
                </li>
                <li>
                  <NavLink to="/shadows" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Shadows</NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Add other top-level menu items here in the future */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;