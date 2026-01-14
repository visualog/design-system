import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, PanelLeft, PanelRight, PanelBottom, ExternalLink, CirclePlus } from 'lucide-react';
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

    // 상태로 관리되는 제안 목록
    const [proposalList, setProposalList] = useState<Proposal[]>(proposals);

    // 요소 선택 모드 상태
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newProposalText, setNewProposalText] = useState('');

    const proposalCount = proposalList.length;

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

    // 요소 선택 모드 로직
    useEffect(() => {
        if (!isSelectionMode) {
            setHoveredElement(null);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // 오버레이 UI 및 다이얼로그 무시
            if (target.closest('[data-overlay="true"]')) return;

            // 보이지 않거나 크기가 없는 요소 무시
            const rect = target.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const style = window.getComputedStyle(target);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

            // 너무 큰 컨테이너(예: body, root)는 선택 방지 (선택적)
            if (target === document.body || target.id === 'root') return;

            setHoveredElement(target);
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-overlay="true"]')) return;

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // 다른 핸들러 실행 방지

            // 선택 완료 처리
            setHoveredElement(null);
            setIsSelectionMode(false);
            setIsAddDialogOpen(true); // 입력 다이얼로그 열기
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick, { capture: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick, { capture: true });
        };
    }, [isSelectionMode]);

    const handleProposalClick = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setIsPopoverOpen(false);
        setIsSheetOpen(true);
    };

    const handlePositionChange = (side: SheetSide) => {
        setSheetSide(side);
    };

    const handleAddProposal = () => {
        if (!newProposalText.trim()) return;

        const newProposal: Proposal = {
            id: `proposal-${Date.now()}`,
            title: newProposalText.split('\n')[0].substring(0, 30) + (newProposalText.length > 30 ? '...' : ''), // 첫 줄을 제목으로
            content: newProposalText, // 전체 내용을 본문으로
            targetPage: window.location.pathname
        };

        setProposalList(prev => [newProposal, ...prev]);
        setNewProposalText('');
        setIsAddDialogOpen(false);

        // 새로 추가된 항목 바로 열기 (옵션)
        setSelectedProposal(newProposal);
        setIsSheetOpen(true);
    };

    // 반응형: 모바일에서는 바텀시트
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const effectiveSide = isMobile ? 'bottom' : sheetSide;



    return (
        <>
            {/* 요소 선택 오버레이 - Portal 사용으로 위치 오차 해결 */}
            {isSelectionMode && hoveredElement && createPortal(
                (() => {
                    const rect = hoveredElement.getBoundingClientRect();
                    return (
                        <div
                            data-overlay="true"
                            className="fixed pointer-events-none border-2 border-primary z-[9999] bg-primary/10 transition-all duration-75 ease-out"
                            style={{
                                top: rect.top,
                                left: rect.left,
                                width: rect.width,
                                height: rect.height,
                            }}
                        >
                            <div className="absolute top-0 left-0 -translate-y-full bg-primary text-primary-foreground text-xs px-2 py-1 rounded-t-sm whitespace-nowrap z-[10000]">
                                요소 선택 중... 클릭하여 개선 제안 추가
                            </div>
                        </div>
                    );
                })(),
                document.body
            )}

            {/* 개선 제안 입력 다이얼로그 - Portal 사용 */}
            {isAddDialogOpen && createPortal(
                <div
                    data-overlay="true"
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
                    onClick={(e) => {
                        // 배경 클릭 시 닫기
                        if (e.target === e.currentTarget) setIsAddDialogOpen(false);
                    }}
                >
                    <div className="bg-background p-6 rounded-lg shadow-lg w-[400px] border relative mx-4 animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-semibold mb-4">개선 제안 추가</h3>
                        <p className="text-sm text-muted-foreground mb-4">선택한 화면에 대한 개선 아이디어를 기록하세요.</p>
                        <textarea
                            className="w-full h-32 p-3 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                            placeholder="예: 이 버튼의 여백을 8px로 줄이는 게 좋겠습니다."
                            value={newProposalText}
                            onChange={(e) => setNewProposalText(e.target.value)}
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsAddDialogOpen(false)}
                                className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleAddProposal}
                                className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                            >
                                추가하기
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

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
                            <div className="flex items-center justify-between px-2 py-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    개선 제안 목록 ({proposalCount})
                                </p>
                                <button
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        setIsSelectionMode(true);
                                    }}
                                    className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                    title="화면에서 선택하여 추가"
                                >
                                    <CirclePlus size={14} />
                                </button>
                            </div>

                            {proposalList.map((proposal) => (
                                <button
                                    key={proposal.id}
                                    onClick={() => handleProposalClick(proposal)}
                                    className="flex items-center gap-2 px-2 py-2 text-sm text-left rounded-md hover:bg-accent transition-colors"
                                >
                                    <Lightbulb size={14} className="text-blue-500 flex-shrink-0" />
                                    <span className="truncate">{proposal.title}</span>
                                </button>
                            ))}

                            {proposalList.length === 0 && (
                                <div className="py-4 text-center text-xs text-muted-foreground">
                                    등록된 제안이 없습니다.
                                </div>
                            )}
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
                                {/* 마크다운 렌더링 (간단한 형태) - 신규 코멘트는 Plain Text일 수 있음 */}
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
                                    // 인라인 코드 처리 및 일반 텍스트
                                    const parts = line.split(/(`[^`]+`)/g);
                                    // 일반 텍스트도 렌더링하도록 수정
                                    return (
                                        <p key={i} className="leading-relaxed mb-1">
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
