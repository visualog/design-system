import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lightbulb, PanelLeft, PanelRight, PanelBottom, ExternalLink, CirclePlus, MessageSquare, Trash2 } from 'lucide-react';
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
import { useProposals, type Proposal } from '@/hooks/useProposals';
import { getUniqueSelector } from '@/lib/domUtils';

type SheetSide = 'right' | 'left' | 'bottom';

interface ProposalNotificationProps {
    message?: string;
}

const ProposalNotification: React.FC<ProposalNotificationProps> = ({
    message = "개선 제안이 있습니다!"
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { proposals, addProposal, removeProposal } = useProposals();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [sheetSide, setSheetSide] = useState<SheetSide>('right');

    // 요소 선택 모드 상태
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newProposalText, setNewProposalText] = useState('');
    const [capturedSelector, setCapturedSelector] = useState('');

    const proposalCount = proposals.length;

    // 애니메이션: 확대 → 1초 대기 → 축소
    useEffect(() => {
        const expandTimer = setTimeout(() => setIsExpanded(true), 500);
        const collapseTimer = setTimeout(() => {
            setIsExpanded(false);
        }, 2500);

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
            if (target.closest('[data-overlay="true"]')) return;

            const rect = target.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const style = window.getComputedStyle(target);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

            if (target === document.body || target.id === 'root') return;

            setHoveredElement(target);
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-overlay="true"]')) return;

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const selector = getUniqueSelector(target);
            setCapturedSelector(selector);
            setHoveredElement(null);
            setIsSelectionMode(false);
            setIsAddDialogOpen(true);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick, { capture: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick, { capture: true });
        };
    }, [isSelectionMode]);

    const handleProposalClick = (proposal: Proposal) => {
        if (proposal.targetPage !== location.pathname) {
            navigate(proposal.targetPage);
            // 페이지 이동 후 해당 제안을 열도록 상태를 전달하거나 로컬스토리지 활용 가능
            // 여기서는 단순히 이동 후 시트 닫음 (스티커가 보이도록)
            setIsPopoverOpen(false);

            // 약간의 딜레이 후 해당 요소로 스크롤 및 강조
            setTimeout(() => {
                if (proposal.selector) {
                    const element = document.querySelector(proposal.selector);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // 하이라이트 효과 (임시 클래스 추가 등)
                    if (element) {
                        element.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
                        setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-2'), 2000);
                    }
                }
                setSelectedProposal(proposal);
                setIsSheetOpen(true);
            }, 500);
        } else {
            // 같은 페이지면 스크롤
            if (proposal.selector) {
                const element = document.querySelector(proposal.selector);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setSelectedProposal(proposal);
            setIsPopoverOpen(false);
            setIsSheetOpen(true);
        }
    };

    const handlePositionChange = (side: SheetSide) => {
        setSheetSide(side);
    };

    const handleAddProposal = () => {
        if (!newProposalText.trim()) return;

        addProposal({
            id: `proposal-${Date.now()}`,
            title: newProposalText.split('\n')[0].substring(0, 30) + (newProposalText.length > 30 ? '...' : ''),
            content: newProposalText,
            targetPage: window.location.pathname,
            selector: capturedSelector
        });

        setNewProposalText('');
        setIsAddDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            removeProposal(id);
            if (selectedProposal?.id === id) {
                setIsSheetOpen(false);
            }
        }
    };

    // 스티커 렌더링
    // 현재 페이지 URL과 일치하는 제안 필터링 (Infinite loop prevention: Memoize this)
    const currentPageProposals = React.useMemo(() =>
        proposals.filter(p => p.targetPage === location.pathname && p.selector),
        [proposals, location.pathname]
    );

    // 요소 위치 추적을 위한 상태 (윈도우 리사이즈 등 대응)
    const [stickerPositions, setStickerPositions] = useState<{ [key: string]: DOMRect }>({});

    // 스티커 위치 업데이트 (주기적으로 또는 이벤트 시)
    useEffect(() => {
        const updatePositions = () => {
            const newPositions: { [key: string]: DOMRect } = {};
            currentPageProposals.forEach(p => {
                const el = document.querySelector(p.selector!);
                if (el) {
                    newPositions[p.id] = el.getBoundingClientRect();
                }
            });
            setStickerPositions(newPositions);
        };

        updatePositions(); // 초기 실행

        // DOM 변화 감지를 위한 MutationObserver나 ResizeObserver가 이상적이지만,
        // 간단하게 window resize/scroll 이벤트와 인터벌 사용
        window.addEventListener('resize', updatePositions);
        window.addEventListener('scroll', updatePositions);

        // 동적 콘텐츠 로딩 대응을 위해 1초마다 체크
        const interval = setInterval(updatePositions, 1000);

        return () => {
            window.removeEventListener('resize', updatePositions);
            window.removeEventListener('scroll', updatePositions);
            clearInterval(interval);
        };
    }, [currentPageProposals]); // props 변경 시 재실행

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const effectiveSide = isMobile ? 'bottom' : sheetSide;

    return (
        <>
            {/* 스티커 오버레이 */}
            {currentPageProposals.map(proposal => {
                const rect = stickerPositions[proposal.id];
                if (!rect) return null;

                // 화면 밖이면 숨김 (선택적)

                return createPortal(
                    <div
                        key={proposal.id}
                        data-overlay="true"
                        className="fixed z-[50] group cursor-pointer"
                        style={{
                            top: rect.top - 12, // 요소 약간 위쪽
                            left: rect.right - 12, // 요소 오른쪽 모서리 근처
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProposal(proposal);
                            setIsSheetOpen(true);
                        }}
                    >
                        <div className="relative">
                            <div className="bg-yellow-400 text-yellow-900 rounded-full p-1.5 shadow-md border border-yellow-500 hover:scale-110 transition-transform animate-in zoom-in duration-200">
                                <MessageSquare size={16} fill="currentColor" />
                            </div>
                            {/* 호버 시 내용 미리보기 */}
                            <div className="absolute left-full top-0 ml-2 w-48 bg-card border rounded-md shadow-lg p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 invisible group-hover:visible whitespace-normal break-words">
                                <p className="font-semibold mb-1 line-clamp-1">{proposal.title}</p>
                                <p className="text-muted-foreground line-clamp-2">{proposal.content}</p>
                            </div>
                        </div>
                    </div>,
                    document.body
                );
            })}

            {/* 요소 선택 오버레이 */}
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

            {/* 개선 제안 입력 다이얼로그 */}
            {isAddDialogOpen && createPortal(
                <div
                    data-overlay="true"
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
                    onClick={(e) => {
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
                                <button
                                    className="relative flex items-center p-1.5 rounded-md text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                    aria-label="개선 제안 보기"
                                >
                                    <Lightbulb size={16} className="flex-shrink-0" />
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
                                    {proposalCount > 0 && (
                                        <span
                                            className="absolute top-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold text-white bg-red-500 rounded-full"
                                            style={{ transform: 'translate(calc(50% - 4px), calc(-50% + 4px))' }}
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

                            <div className="max-h-[300px] overflow-y-auto">
                                {proposals.map((proposal) => (
                                    <button
                                        key={proposal.id}
                                        onClick={() => handleProposalClick(proposal)}
                                        className="flex items-center gap-2 px-2 py-2 text-sm text-left rounded-md w-full hover:bg-accent transition-colors"
                                    >
                                        <Lightbulb size={14} className="text-blue-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-medium">{proposal.title}</div>
                                            <div className="text-xs text-muted-foreground truncate">{proposal.targetPage}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {proposals.length === 0 && (
                                <div className="py-4 text-center text-xs text-muted-foreground">
                                    등록된 제안이 없습니다.
                                </div>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side={effectiveSide} className="overflow-y-auto">
                    <SheetHeader className="flex flex-row items-center justify-between pr-8">
                        <SheetTitle className="text-lg">개선 제안</SheetTitle>
                        {!isMobile && (
                            <div className="flex items-center gap-1">
                                <button onClick={() => handlePositionChange('left')} className={`p-1.5 rounded-md transition-colors ${sheetSide === 'left' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}><PanelLeft size={16} /></button>
                                <button onClick={() => handlePositionChange('bottom')} className={`p-1.5 rounded-md transition-colors ${sheetSide === 'bottom' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}><PanelBottom size={16} /></button>
                                <button onClick={() => handlePositionChange('right')} className={`p-1.5 rounded-md transition-colors ${sheetSide === 'right' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}><PanelRight size={16} /></button>
                            </div>
                        )}
                    </SheetHeader>

                    {selectedProposal && (
                        <div className="mt-4 prose prose-sm max-w-none">
                            <div className="flex items-start justify-between">
                                <h2 className="text-base font-semibold mb-2">{selectedProposal.title}</h2>
                                <button
                                    onClick={() => handleDelete(selectedProposal.id)}
                                    className="text-muted-foreground hover:text-red-500 p-1"
                                    title="제안 삭제"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="text-xs text-muted-foreground mb-4 font-mono bg-muted/50 p-1 rounded break-all">
                                {selectedProposal.selector || '전역 제안'}
                            </div>

                            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                {selectedProposal.content}
                            </div>

                            {selectedProposal.targetPage && selectedProposal.targetPage !== location.pathname && (
                                <button
                                    onClick={() => {
                                        navigate(selectedProposal.targetPage);
                                        setIsSheetOpen(false);
                                        // 이동 후 하이라이트 로직은 handleProposalClick 참조
                                        setTimeout(() => {
                                            if (selectedProposal.selector) {
                                                const element = document.querySelector(selectedProposal.selector);
                                                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                element?.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
                                                setTimeout(() => element?.classList.remove('ring-4', 'ring-primary', 'ring-offset-2'), 2000);
                                            }
                                        }, 500);
                                    }}
                                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    페이지로 이동
                                </button>
                            )}

                            {selectedProposal.targetPage === location.pathname && selectedProposal.selector && (
                                <button
                                    onClick={() => {
                                        const element = document.querySelector(selectedProposal.selector!);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            element.classList.add('ring-4', 'ring-primary', 'ring-offset-2');
                                            setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-2'), 2000);
                                            setIsSheetOpen(false);
                                        } else {
                                            alert('화면에서 요소를 찾을 수 없습니다.');
                                        }
                                    }}
                                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    요소로 스크롤
                                </button>
                            )}
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};

export default ProposalNotification;
