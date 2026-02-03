import React from 'react';
import { FlaskConical } from 'lucide-react';
import { useExperimental } from '../../contexts/ExperimentalContext';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./tooltip";

import { useLocation } from 'react-router-dom';

export const ExperimentalToggle: React.FC = () => {
    const { isExperimental, toggleExperimental } = useExperimental();
    const location = useLocation();

    // 페이지별 실험 기능 개수 정의
    const experimentCounts: Record<string, number> = {
        '/colors': 3,
        '/typography': 2,
        '/site-settings/components': 1
    };

    // 현재 경로에 대한 카운트 가져오기 (기본값 1: 글로벌 테마)
    const currentPath = location.pathname;
    // 정확한 매칭 또는 상위 경로 매칭 확인
    const matchedKey = Object.keys(experimentCounts).find(key => currentPath.startsWith(key));
    const activeCount = matchedKey ? experimentCounts[matchedKey] : 1;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={toggleExperimental}
                    className={`
            group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
            ${isExperimental
                            ? 'bg-violet-50 border-violet-200 text-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.15)] dark:bg-violet-950/30 dark:border-violet-800 dark:text-violet-300'
                            : 'bg-background border-border/60 text-muted-foreground hover:border-violet-300 hover:text-foreground dark:border-border/40'
                        }
          `}
                >
                    <FlaskConical
                        className={`w-4 h-4 transition-all duration-500 ${isExperimental ? 'rotate-[360deg] scale-110 fill-violet-500/30 text-violet-600' : 'group-hover:rotate-12 fill-transparent'}`}
                    />
                    <span className="text-label-sm font-medium">Experimental</span>
                    {isExperimental && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-violet-500 text-white text-[10px] font-bold rounded-full animate-in fade-in zoom-in duration-300 px-1 leading-none shadow-sm">
                            {activeCount}
                        </span>
                    )}
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="z-[100]">
                <p>{isExperimental ? 'Disable experimental design features' : 'Try out new design experiments'}</p>
            </TooltipContent>
        </Tooltip>
    );
};
