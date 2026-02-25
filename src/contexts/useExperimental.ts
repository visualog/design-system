import { useContext } from 'react';
import { ExperimentalContext } from './experimentalContextStore';

export const useExperimental = () => {
    const context = useContext(ExperimentalContext);
    if (context === undefined) {
        throw new Error('useExperimental must be used within an ExperimentalProvider');
    }
    return context;
};

