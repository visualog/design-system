import React, { createContext, useContext, useState, useEffect } from 'react';
import { showExperimentalToast } from '../utils/experimentalToast';
import { useLocation } from 'react-router-dom';

interface ExperimentalContextType {
    isExperimental: boolean;
    toggleExperimental: () => void;
}

const ExperimentalContext = createContext<ExperimentalContextType | undefined>(undefined);

export const ExperimentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isExperimental, setIsExperimental] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const stored = localStorage.getItem('experimental-design');
        if (stored === 'true' || document.documentElement.classList.contains('experimental-design')) {
            document.documentElement.classList.add('experimental-design');
            setIsExperimental(true);
        }
    }, []);

    const toggleExperimental = () => {
        const newVal = !isExperimental;
        if (newVal) {
            document.documentElement.classList.add('experimental-design');
            showExperimentalToast(location.pathname);
        } else {
            document.documentElement.classList.remove('experimental-design');
        }
        localStorage.setItem('experimental-design', newVal ? 'true' : 'false');
        setIsExperimental(newVal);
    };

    return (
        <ExperimentalContext.Provider value={{ isExperimental, toggleExperimental }}>
            {children}
        </ExperimentalContext.Provider>
    );
};

export const useExperimental = () => {
    const context = useContext(ExperimentalContext);
    if (context === undefined) {
        throw new Error('useExperimental must be used within an ExperimentalProvider');
    }
    return context;
};
