import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white p-6 h-screen sticky top-0 border-r border-gray-200 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Design System</h1>
      <nav>
        <ul>
          <li className="mb-3">
            <Link to="/colors" className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200">Colors</Link>
          </li>
          <li className="mb-3">
            <Link to="/typography" className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200">Typography</Link>
          </li>
          <li className="mb-3">
            <Link to="/spacing" className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200">Spacing & Layout</Link>
          </li>
          <li className="mb-3">
            <Link to="/icons" className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200">Icons</Link>
          </li>
          <li className="mb-3">
            <Link to="/shadows" className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200">Shadows</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;