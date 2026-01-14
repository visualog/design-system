import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, PanelLeft, PanelRight, PanelBottom, ExternalLink } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

// 제안 항목 타입
interface Proposal {
    id: string;
    title: string;
    content: string;
    targetPage?: string;
}

// 제안 목록 (deferred_plans.md에서 파싱)
const proposals: Proposal[] = [
    {
        id: 'primary-group',
        title: 'Primary 그룹 추가',
        content: `## Colors 파운데이션 페이지 업데이트

**상태:** 추후 결정 (Deferred)

### 배경
테마 컬러 섹션에 'Primary' 그룹이 없어 시스템 토큰(\`color_primary\`, \`color_background\` 등)을 확인하기 어려움.

### 제안된 변경 사항

#### 1. 데이터: \`theme_color_mapping.json\`
\`primary\` 그룹을 추가하여 시스템 테마 토큰 노출.

#### 2. 컴포넌트: \`ThemeColorMappingDisplay.tsx\`
UI 필터에 'Primary' 옵션 추가.

#### 3. 설명: \`semantic_descriptions.ts\`
\`[Category]: [Description]\` 형식으로 설명 표준화 유지.`,
        targetPage: '/colors?tab=theme',
    }
];

type SheetSide = 'right' | 'left' | 'bottom';

interface ProposalNotificationProps {
    message?: string;
}

const ProposalNotification: React.FC<ProposalNotificationProps> = ({
    message = "개선 제안이 있습니다!"
}) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [sheetSide, setSheetSide] = useState<SheetSide>('right');

    const proposalCount = proposals.length;

    // 애니메이션: 확대 → 1초 대기 → 축소
    useEffect(() => {
        // 페이지 로딩 후 약간의 딜레이 후 텍스트 확대
        const expandTimer = setTimeout(() => setIsExpanded(true), 500);

        // 텍스트가 완전히 확대된 후 1초 대기하고 축소
        const collapseTimer = setTimeout(() => {
            setIsExpanded(false);
        }, 2500); // 500ms 딜레이 + ~1000ms 확대 애니메이션 + 1000ms 대기

        return () => {
            clearTimeout(expandTimer);
            clearTimeout(collapseTimer);
        };
    }, []);

    const handleProposalClick = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setIsPopoverOpen(false);
        setIsSheetOpen(true);
    };

    const handlePositionChange = (side: SheetSide) => {
        setSheetSide(side);
    };

    // 반응형: 모바일에서는 바텀시트
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const effectiveSide = isMobile ? 'bottom' : sheetSide;

    return (
        <>
            <div className="relative flex items-center">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                {/* 통합된 버튼 (아이콘 + 확장 텍스트) */}
                                <button
                                    className="relative flex items-center p-1.5 rounded-md text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                    aria-label="개선 제안 보기"
                                >
                                    {/* 아이콘 */}
                                    <Lightbulb size={16} className="flex-shrink-0" />

                                    {/* 확장되는 텍스트 */}
                                    <span
                                        className="text-xs font-medium whitespace-nowrap overflow-hidden"
                                        style={{
                                            maxWidth: isExpanded ? '200px' : '0px',
                                            marginLeft: isExpanded ? '6px' : '0px',
                                            opacity: isExpanded ? 1 : 0,
                                            transition: isExpanded
                                                ? 'max-width 1200ms cubic-bezier(0.619, 0.074, 0.5, 0.9), margin-left 1200ms cubic-bezier(0.619, 0.074, 0.5, 0.9), opacity 600ms ease-out'
                                                : 'max-width 1200ms cubic-bezier(0.619, 0.074, 0.5, 0.9), margin-left 1200ms cubic-bezier(0.619, 0.074, 0.5, 0.9), opacity 600ms ease-out 600ms',
                                        }}
                                    >
                                        {message}
                                    </span>

                                    {/* 알림 뱃지 (버튼 우상단 꼭지점에 중심 배치) */}
                                    {proposalCount > 0 && (
                                        <span
                                            className="absolute top-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold text-white bg-red-500 rounded-full"
                                            style={{
                                                transform: 'translate(calc(50% - 4px), calc(-50% + 4px))',
                                            }}
                                        >
                                            {proposalCount}
                                        </span>
                                    )}
                                </button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p className="text-xs">개선제안</p>
                        </TooltipContent>
                    </Tooltip>

                    <PopoverContent align="end" className="w-64 p-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                                개선 제안 목록 ({proposalCount})
                            </p>
                            {proposals.map((proposal) => (
                                <button
                                    key={proposal.id}
                                    onClick={() => handleProposalClick(proposal)}
                                    className="flex items-center gap-2 px-2 py-2 text-sm text-left rounded-md hover:bg-accent transition-colors"
                                >
                                    <Lightbulb size={14} className="text-blue-500 flex-shrink-0" />
                                    <span>{proposal.title}</span>
                                </button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* 제안 상세 시트 */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side={effectiveSide} className="overflow-y-auto">
                    <SheetHeader className="flex flex-row items-center justify-between pr-8">
                        <SheetTitle className="text-lg">개선 제안</SheetTitle>
                        {/* 위치 변경 버튼 */}
                        {!isMobile && (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handlePositionChange('left')}
                                    className={`p-1.5 rounded-md transition-colors ${sheetSide === 'left' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                                    title="왼쪽에 표시"
                                >
                                    <PanelLeft size={16} />
                                </button>
                                <button
                                    onClick={() => handlePositionChange('bottom')}
                                    className={`p-1.5 rounded-md transition-colors ${sheetSide === 'bottom' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                                    title="하단에 표시"
                                >
                                    <PanelBottom size={16} />
                                </button>
                                <button
                                    onClick={() => handlePositionChange('right')}
                                    className={`p-1.5 rounded-md transition-colors ${sheetSide === 'right' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                                    title="오른쪽에 표시"
                                >
                                    <PanelRight size={16} />
                                </button>
                            </div>
                        )}
                    </SheetHeader>

                    {selectedProposal && (
                        <div className="mt-4 prose prose-sm max-w-none">
                            <h2 className="text-base font-semibold mb-4">{selectedProposal.title}</h2>
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {/* 마크다운 렌더링 (간단한 형태) */}
                                {selectedProposal.content.split('\n').map((line, i) => {
                                    if (line.startsWith('## ')) {
                                        return <h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.replace('## ', '')}</h3>;
                                    }
                                    if (line.startsWith('### ')) {
                                        return <h4 key={i} className="text-sm font-semibold mt-3 mb-1">{line.replace('### ', '')}</h4>;
                                    }
                                    if (line.startsWith('#### ')) {
                                        return <h5 key={i} className="text-sm font-medium mt-2 mb-1">{line.replace('#### ', '')}</h5>;
                                    }
                                    if (line.startsWith('**') && line.endsWith('**')) {
                                        return <p key={i} className="font-semibold">{line.replace(/\*\*/g, '')}</p>;
                                    }
                                    if (line.trim() === '') {
                                        return <br key={i} />;
                                    }
                                    // 인라인 코드 처리
                                    const parts = line.split(/(`[^`]+`)/g);
                                    return (
                                        <p key={i} className="leading-relaxed">
                                            {parts.map((part, j) => {
                                                if (part.startsWith('`') && part.endsWith('`')) {
                                                    return (
                                                        <code key={j} className="px-1 py-0.5 bg-muted rounded text-xs">
                                                            {part.replace(/`/g, '')}
                                                        </code>
                                                    );
                                                }
                                                return part;
                                            })}
                                        </p>
                                    );
                                })}
                            </div>

                            {/* 해당 페이지로 이동 버튼 */}
                            {selectedProposal.targetPage && (
                                <button
                                    onClick={() => {
                                        navigate(selectedProposal.targetPage!);
                                        setIsSheetOpen(false);
                                    }}
                                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    해당 페이지로 이동
                                </button>
                            )}
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* 뱃지 팝 애니메이션 */}
            <style>{`
                @keyframes badge-pop {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </>
    );
};

export default ProposalNotification;
