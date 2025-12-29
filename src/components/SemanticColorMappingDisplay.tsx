import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveSemanticToken } from '../lib/colorUtils';
import { getContrastingTextColor } from '../lib/utils';

const SemanticColorCard: React.FC<{ semanticVar: string, themeVar: string }> = ({ semanticVar, themeVar }) => {
  const { light, dark } = resolveSemanticToken(semanticVar);
  const lightTextColor = getContrastingTextColor(light);
  const darkTextColor = getContrastingTextColor(dark);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-mono text-base">{semanticVar}</span>
          <Clipboard value={semanticVar} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <div className="w-1/2 p-4" style={{ backgroundColor: light, color: lightTextColor }}>
            <p className="font-bold">Light</p>
            <p className="text-sm font-mono">{light}</p>
          </div>
          <div className="w-1/2 p-4" style={{ backgroundColor: dark, color: darkTextColor }}>
            <p className="font-bold">Dark</p>
            <p className="text-sm font-mono">{dark}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">Maps to Theme Token:</p>
          <div className="flex items-center justify-between font-mono text-sm bg-gray-100 p-2 rounded">
            <span>{themeVar}</span>
            <Clipboard value={themeVar} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


const SemanticColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      {Object.entries(colors.semanticMapping).map(([category, mappings]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mappings).map(([semanticVar, themeVar], index) => (
              <SemanticColorCard 
                key={index} 
                semanticVar={semanticVar}
                themeVar={themeVar as string} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SemanticColorMappingDisplay;