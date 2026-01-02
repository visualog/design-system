import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';

const TypographyDisplay: React.FC = () => {
  const { typography } = designSystemData;

  const getFontWeight = (weight: string) => {
    if (weight.includes('Bold')) return 700;
    if (weight.includes('Medium')) return 500;
    if (weight.includes('Regular')) return 400;
    return 400;
  };

  return (
    <div className="container mx-auto py-8 font-pretendard">
      <p className="mb-10 text-lg text-gray-600">
        The design system uses the <span className="font-semibold">Pretendard</span> font family.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Style</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Size</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Line Height</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Weight</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Variable</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typography)
              .filter(([key]) => key !== 'font_family')
              .flatMap(([category, styles]: [string, any]) =>
                styles.map((style: any, index: number) => (
                  <tr key={`${category}-${index}`} className="border-b border-border">
                    <td className="p-4">
                      <p style={{
                        fontSize: `${style.size}px`,
                        lineHeight: `${style.line_height}px`,
                        fontWeight: getFontWeight(style.weight),
                      }}>
                        {style.text_style}
                      </p>
                    </td>
                    <td className="p-4 text-foreground">{style.size}px</td>
                    <td className="p-4 text-foreground">{style.line_height}px</td>
                    <td className="p-4 text-foreground">{style.weight}</td>
                    <td className="p-4 font-mono text-sm">
                      <div className="flex items-center">
                        <span>{style.style_name}</span>
                        <Clipboard value={style.style_name} />
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypographyDisplay;