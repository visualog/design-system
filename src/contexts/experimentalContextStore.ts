import { createContext } from 'react';

export interface ExperimentalContextType {
    isExperimental: boolean;
    toggleExperimental: () => void;
}

export const ExperimentalContext = createContext<ExperimentalContextType | undefined>(undefined);

