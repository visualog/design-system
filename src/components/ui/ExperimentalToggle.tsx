import React from 'react';
import { FlaskConical } from 'lucide-react';
import { useExperimental } from '../../contexts/ExperimentalContext';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./tooltip";

export const ExperimentalToggle: React.FC = () => {
    const { isExperimental, toggleExperimental } = useExperimental();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={toggleExperimental}
                    className={`
            group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
            ${isExperimental
                            ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]'
                            : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                        }
          `}
                >
                    <FlaskConical className={`w-4 h-4 transition-transform duration-500 ${isExperimental ? 'rotate-[360deg] scale-110' : 'group-hover:rotate-12'}`} />
                    <span className="text-label-sm font-medium">Experimental</span>
                    {isExperimental && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="z-[100]">
                <p>{isExperimental ? 'Disable experimental design features' : 'Try out new design experiments'}</p>
            </TooltipContent>
        </Tooltip>
    );
};
