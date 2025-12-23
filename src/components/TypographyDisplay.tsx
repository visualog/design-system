import React from 'react';
import { designSystemData } from '../utils/dataLoader';

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;

  return (
    <div className="container mx-auto py-8 font-['Pretendard']">
      <h2 className="text-3xl font-bold mb-8">Typography Styles</h2>
      <p className="mb-8 text-lg">Font Family: {typography.font_family}</p>

      {Object.entries(typography).filter(([key]) => key !== 'font_family').map(([category, styles]: [string, any]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {styles.map((style: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-xl font-bold mb-2">{style.text_style}</p>
                <p className="text-sm font-mono text-gray-700 mb-1">{style.style_name}</p>
                <p className="text-sm text-gray-600">Size: {style.size}px</p>
                <p className="text-sm text-gray-600">Line Height: {style.line_height}px</p>
                <p className="text-sm text-gray-600">Weight: {style.weight}</p>
                {/* Visual example */}
                <p
                  className="mt-4"
                  style={{
                    fontSize: `${style.size}px`,
                    lineHeight: `${style.line_height}px`,
                    fontWeight: style.weight.includes('Bold') ? 'bold' : style.weight.includes('Medium') ? '500' : 'normal',
                  }}
                >
                  Example text for {style.text_style}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypographyDisplay;