import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';

const ShadowsDisplay: React.FC = () => {
  const { shadows } = designSystemData;

  // We need to map the token names to actual CSS shadow classes if they exist,
  // or use the direct css_value. For this example, let's assume we have a utility
  // or a mapping in tailwind config. For simplicity, we'll use inline styles here.
  // In a real scenario, you'd configure these in tailwind.config.js and use classes.

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {shadows.shadow_tokens.map((shadow: any, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-48 h-32 bg-white rounded-xl flex items-center justify-center transition-shadow duration-300"
              style={{ boxShadow: shadow.css_value }}
            >
            </div>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center font-semibold gap-2">
                <span>${shadow.token}</span>
                <Clipboard value={shadow.token} />
              </div>
              <div className="flex items-center justify-center text-xs text-gray-500 font-mono mt-1">
                <span className="truncate max-w-xs">{shadow.css_value}</span>
                <Clipboard value={shadow.css_value} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShadowsDisplay;