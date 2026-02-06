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
            bg-violet-50 border-violet-200 text-violet-600 shadow-none hover:shadow-[0_0_10px_rgba(124,58,237,0.15)] dark:bg-violet-950/30 dark:border-violet-800 dark:text-violet-300
          `}
                >
                    <div className="relative">
                        <FlaskConical
                            className={`w-4 h-4 transition-all duration-500 rotate-0 scale-110 fill-violet-500/30 text-violet-600 group-hover:animate-shake`}
                        />
                        {/* Bubbles */}
                        <div className="absolute -top-1 left-[6px] w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:animate-bubble z-10" />
                        <div className="absolute -top-2 left-[3px] w-1 h-1 bg-violet-500 rounded-full opacity-0 group-hover:animate-bubble [animation-delay:0.2s] z-10" />
                        <div className="absolute -top-1.5 left-[8px] w-1 h-1 bg-violet-500 rounded-full opacity-0 group-hover:animate-bubble [animation-delay:0.4s] z-10" />
                    </div>
                    <span className="text-label-sm font-medium">Experimental</span>
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-violet-500 text-white text-[10px] font-bold rounded-full animate-in fade-in zoom-in duration-300 px-1 leading-none shadow-sm">
                        {activeCount}
                    </span>
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="z-[100]">
                <p>{isExperimental ? '실험적인 디자인 기능을 끕니다' : '새로운 디자인 실험을 체험해보세요'}</p>
            </TooltipContent>
        </Tooltip>
    );
};
