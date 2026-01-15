import React from 'react';

// 측정 오버레이 컴포넌트
const MeasureOverlay: React.FC<{ targetRef: React.RefObject<HTMLElement> }> = ({ targetRef }) => {
    const [metrics, setMetrics] = React.useState<DOMRect | null>(null);
    const [styles, setStyles] = React.useState<CSSStyleDeclaration | null>(null);
    const [childMetrics, setChildMetrics] = React.useState<DOMRect[]>([]);

    React.useEffect(() => {
        if (!targetRef.current) return;
        const element = targetRef.current.firstElementChild as HTMLElement;
        if (!element) return;

        const updateMetrics = () => {
            setMetrics(element.getBoundingClientRect());
            setStyles(window.getComputedStyle(element));

            // 자식 요소들의 메트릭 수집
            const children = Array.from(element.children);
            const childRects = children.map(child => child.getBoundingClientRect());
            setChildMetrics(childRects);
        };

        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        // MutationObserver를 사용하여 DOM 변경 감지 가능성 추가 (필요시)

        return () => window.removeEventListener('resize', updateMetrics);
    }, [targetRef]);

    if (!metrics || !styles) return null;

    const pt = parseFloat(styles.paddingTop);
    const pr = parseFloat(styles.paddingRight);
    const pb = parseFloat(styles.paddingBottom);
    const pl = parseFloat(styles.paddingLeft);
    const width = Math.round(metrics.width);
    const height = Math.round(metrics.height);

    // Gap 감지 (Flex/Grid)
    const rowGap = parseFloat(styles.rowGap) || 0;
    const colGap = parseFloat(styles.columnGap) || 0;
    const isFlexOrGrid = ['flex', 'inline-flex', 'grid', 'inline-grid'].includes(styles.display);
    const hasGap = isFlexOrGrid && (rowGap > 0 || colGap > 0);

    // 간격 표시기 렌더링
    const renderGapIndicators = () => {
        if (!hasGap || childMetrics.length < 2) return null;

        const indicators: React.ReactNode[] = [];

        // 간단한 인접 요소 간격 감지
        // 주의: 복잡한 래핑이나 그리드 배치의 경우 완벽하지 않을 수 있음
        for (let i = 0; i < childMetrics.length; i++) {
            for (let j = i + 1; j < childMetrics.length; j++) {
                const rect1 = childMetrics[i];
                const rect2 = childMetrics[j];

                // 부모 기준 상대 좌표로 변환 필요 (Overlay가 absolute이므로)
                // 하지만 여기선 overlay가 inset-0이므로 부모와 동일 좌표계라고 가정?
                // 아니요, metrics는 뷰포트 기준, overlay는 부모 기준.
                // 따라서 metrics.left/top을 빼줘야 함.

                const r1 = {
                    left: rect1.left - metrics.left,
                    top: rect1.top - metrics.top,
                    right: rect1.right - metrics.left,
                    bottom: rect1.bottom - metrics.top
                };
                const r2 = {
                    left: rect2.left - metrics.left,
                    top: rect2.top - metrics.top,
                    right: rect2.right - metrics.left,
                    bottom: rect2.bottom - metrics.top
                };

                // 수평 간격 (Column Gap)
                // rect1의 오른쪽과 rect2의 왼쪽이 가깝고, 세로로 겹치는 경우
                const hDist = r2.left - r1.right;
                const vOverlap = Math.min(r1.bottom, r2.bottom) > Math.max(r1.top, r2.top);

                if (colGap > 0 && Math.abs(hDist - colGap) < 1 && vOverlap) {
                    indicators.push(
                        <div key={`cgap-${i}-${j}`} className="absolute bg-blue-500/20 border-x border-blue-500/30 flex items-center justify-center group/gap"
                            style={{
                                left: r1.right,
                                top: Math.max(r1.top, r2.top),
                                width: hDist,
                                height: Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top)
                            }}
                        >
                            <span className="text-[10px] text-blue-600 font-mono bg-white/90 px-1 rounded shadow-sm opacity-0 group-hover/gap:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {Math.round(hDist)}
                            </span>
                        </div>
                    );
                }

                // 수직 간격 (Row Gap)
                // rect1의 바닥과 rect2의 천장이 가깝고, 가로로 겹치는 경우
                const vDist = r2.top - r1.bottom;
                const hOverlap = Math.min(r1.right, r2.right) > Math.max(r1.left, r2.left);

                if (rowGap > 0 && Math.abs(vDist - rowGap) < 1 && hOverlap) {
                    indicators.push(
                        <div key={`rgap-${i}-${j}`} className="absolute bg-blue-500/20 border-y border-blue-500/30 flex items-center justify-center group/gap"
                            style={{
                                left: Math.max(r1.left, r2.left),
                                top: r1.bottom,
                                width: Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left),
                                height: vDist
                            }}
                        >
                            <span className="text-[10px] text-blue-600 font-mono bg-white/90 px-1 rounded shadow-sm opacity-0 group-hover/gap:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {Math.round(vDist)}
                            </span>
                        </div>
                    );
                }
            }
        }
        return indicators;
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Gap Indicators */}
            {renderGapIndicators()}

            {/* Padding Indicators */}
            <div className="absolute top-0 left-0 right-0 h-[var(--pt)] bg-pink-500/20 border-b border-pink-500/30" style={{ '--pt': `${pt}px` } as React.CSSProperties} />
            <div className="absolute top-0 right-0 bottom-0 w-[var(--pr)] bg-pink-500/20 border-l border-pink-500/30" style={{ '--pr': `${pr}px` } as React.CSSProperties} />
            <div className="absolute bottom-0 left-0 right-0 h-[var(--pb)] bg-pink-500/20 border-t border-pink-500/30" style={{ '--pb': `${pb}px` } as React.CSSProperties} />
            <div className="absolute top-0 left-0 bottom-0 w-[var(--pl)] bg-pink-500/20 border-r border-pink-500/30" style={{ '--pl': `${pl}px` } as React.CSSProperties} />

            {/* Labels */}
            {pt > 0 && <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-pink-600 font-mono bg-white/80 px-1 rounded shadow-sm border border-pink-100">{Math.round(pt)}</span>}
            {pr > 0 && <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-pink-600 font-mono bg-white/80 px-1 rounded shadow-sm border border-pink-100">{Math.round(pr)}</span>}
            {pb > 0 && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-pink-600 font-mono bg-white/80 px-1 rounded shadow-sm border border-pink-100">{Math.round(pb)}</span>}
            {pl > 0 && <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-pink-600 font-mono bg-white/80 px-1 rounded shadow-sm border border-pink-100">{Math.round(pl)}</span>}

            {/* Dimensions (Outside) */}
            <div className="absolute -right-3 top-0 bottom-0 w-px bg-red-400 flex items-center justify-center">
                <span className="bg-red-50 text-red-600 text-[10px] font-mono px-1 rounded border border-red-200 -rotate-90 whitespace-nowrap">{height}</span>
            </div>
            <div className="absolute -top-3 left-0 right-0 h-px bg-red-400 flex items-center justify-center">
                <span className="bg-red-50 text-red-600 text-[10px] font-mono px-1 rounded border border-red-200 whitespace-nowrap">{width}</span>
            </div>
        </div>
    );
};

export default MeasureOverlay;
