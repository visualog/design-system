import React, { useState, useEffect } from 'react';
import { showExperimentalToast } from '../utils/experimentalToast';
import { useLocation } from 'react-router-dom';
import { FEATURE_FLAGS } from '../config/featureFlags';
import { ExperimentalContext } from './experimentalContextStore';

export const ExperimentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isExperimental, setIsExperimental] = useState<boolean>(() => {
        if (!FEATURE_FLAGS.experimentalLab || typeof window === 'undefined') {
            return false;
        }

        const stored = window.localStorage.getItem('experimental-design');
        return stored === 'true' || window.document.documentElement.classList.contains('experimental-design');
    });
    const location = useLocation();

    useEffect(() => {
        if (!FEATURE_FLAGS.experimentalLab) {
            document.documentElement.classList.remove('experimental-design');
            localStorage.removeItem('experimental-design');
            return;
        }

        if (isExperimental) {
            document.documentElement.classList.add('experimental-design');
        } else {
            document.documentElement.classList.remove('experimental-design');
        }
    }, [isExperimental]);

    const toggleExperimental = () => {
        if (!FEATURE_FLAGS.experimentalLab) {
            return;
        }

        const newVal = !isExperimental;
        if (newVal) {
            showExperimentalToast(location.pathname);
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
