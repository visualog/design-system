import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const activeClassName = "text-lg text-blue-600 bg-blue-50 p-2 rounded-md";
  const inactiveClassName = "text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-md";

  return (
    <aside className="w-64 bg-white p-6 h-screen sticky top-0 border-r border-gray-200 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Design System</h1>
      <nav>
        <ul className="space-y-2">
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
      </nav>
    </aside>
  );
};

export default Sidebar;