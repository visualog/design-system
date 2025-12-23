import React from 'react';
import { designSystemData } from '../utils/dataLoader';

const ShadowsDisplay: React.FC = () => {
  const { shadows } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Shadow Tokens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shadows.shadow_tokens.map((shadow: any, index: number) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center justify-center shadow-sm">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4" style={{ boxShadow: shadow.css_value === "none" ? "none" : shadow.css_value }}>
              {shadow.css_value === "none" && <span className="text-sm text-gray-500">No Shadow</span>}
            </div>
            <h3 className="text-lg font-semibold mb-1">{shadow.token}</h3>
            <p className="text-sm font-mono text-gray-600 mb-2">{shadow.css_value}</p>
            <p className="text-xs text-gray-500">{shadow.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShadowsDisplay;