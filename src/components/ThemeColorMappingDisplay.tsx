import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ThemeColorMappingDisplay: React.FC = () => {
  const { colors } = designSystemData;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Theme Color Mapping</h2>
      {Object.entries(colors.themeMapping).map(([category, mappings]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(mappings).map(([themeVar, rawVar], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-mono text-base">{themeVar}</span>
                    <Clipboard value={themeVar} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">Maps to:</p>
                  <div className="flex items-center justify-between font-mono text-sm bg-gray-100 p-2 rounded">
                    <span>{rawVar as string}</span>
                    <Clipboard value={rawVar as string} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeColorMappingDisplay;