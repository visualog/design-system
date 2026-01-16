import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// 측정 오버레이 컴포넌트 (Interactive Inspector Mode)
const MeasureOverlay: React.FC<{ targetRef: React.RefObject<HTMLElement> }> = ({ targetRef }) => {
    const [hoveredNode, setHoveredNode] = useState<HTMLElement | null>(null);
    const [boxModel, setBoxModel] = useState<{
        width: number;
        height: number;
        top: number;
        left: number;
        absTop: number;
        absLeft: number;
        margin: { top: number; right: number; bottom: number; left: number };
        padding: { top: number; right: number; bottom: number; left: number };
        border: { top: number; right: number; bottom: number; left: number };
    } | null>(null);

    useEffect(() => {
        const container = targetRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            // 오버레이가 pointer-events-none이므로 아래 요소가 감지됨
            const target = e.target as HTMLElement;

            // 컨테이너 내부의 요소만 허용
            if (!container.contains(target)) {
                setHoveredNode(null);
                return;
            }

            // 컨테이너 자체(래퍼)는 측정 대상에서 제외 (사용자 피드백 반영)
            if (target === container) {
                setHoveredNode(null);
                setBoxModel(null);
                return;
            }

            // 하이라이트할 요소 설정
            setHoveredNode(target);

            // 박스 모델 계산
            const computedStyle = window.getComputedStyle(target);
            const rect = target.getBoundingClientRect();

            // 컨테이너 기준 상대 좌표 계산 (오버레이 표시용)
            // 오버레이는 container 내부에 absolute inset-0으로 렌더링됨
            const containerRect = container.getBoundingClientRect();

            setBoxModel({
                width: rect.width,
                height: rect.height,
                // 오버레이 렌더링용 상대 좌표
                top: rect.top - containerRect.top,
                left: rect.left - containerRect.left,
                // 툴팁 포탈 렌더링용 절대 좌표 (Fixed positioning uses viewport coordinates)
                absTop: rect.top,
                absLeft: rect.left,
                margin: {
                    top: parseFloat(computedStyle.marginTop),
                    right: parseFloat(computedStyle.marginRight),
                    bottom: parseFloat(computedStyle.marginBottom),
                    left: parseFloat(computedStyle.marginLeft),
                },
                padding: {
                    top: parseFloat(computedStyle.paddingTop),
                    right: parseFloat(computedStyle.paddingRight),
                    bottom: parseFloat(computedStyle.paddingBottom),
                    left: parseFloat(computedStyle.paddingLeft),
                },
                border: {
                    top: parseFloat(computedStyle.borderTopWidth),
                    right: parseFloat(computedStyle.borderRightWidth),
                    bottom: parseFloat(computedStyle.borderBottomWidth),
                    left: parseFloat(computedStyle.borderLeftWidth),
                },
            });
        };

        const handleMouseLeave = () => {
            setHoveredNode(null);
            setBoxModel(null);
        };

        // 이벤트를 컨테이너에 걸어둠 (캡처링 or 버블링 활용)
        // MeasureOverlay 자체는 pointer-events-none이어야 함
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [targetRef]);

    if (!hoveredNode || !boxModel) return null;

    const { top, left, absTop, absLeft, width, height, margin, padding, border } = boxModel;

    // Helper to render box regions
    // Margin (Orange), Border (Yellow), Padding (Green), Content (Blue)
    // Similar to Chrome DevTools

    return (
        <>
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                {/* 1. Margin Area (Orange) - 요소 바깥쪽 */}
                {/* Margin Rect */}
                <div
                    className="absolute bg-orange-500/30"
                    style={{
                        top: top - margin.top,
                        left: left - margin.left,
                        width: width + margin.left + margin.right,
                        height: height + margin.top + margin.bottom,
                    }}
                />

                {/* Border Rect (Yellow) */}
                <div
                    className="absolute bg-yellow-500/30"
                    style={{
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                    }}
                />

                {/* Padding Rect (Green) */}
                <div
                    className="absolute bg-green-500/30"
                    style={{
                        top: top + border.top,
                        left: left + border.left,
                        width: width - border.left - border.right,
                        height: height - border.top - border.bottom,
                    }}
                />

                {/* Content Rect (Blue) */}
                <div
                    className="absolute bg-blue-500/30 flex items-center justify-center border border-blue-400/50"
                    style={{
                        top: top + border.top + padding.top,
                        left: left + border.left + padding.left,
                        width: width - border.left - border.right - padding.left - padding.right,
                        height: height - border.top - border.bottom - padding.top - padding.bottom,
                    }}
                >
                    {/* Dimensions Label (Center of Content) */}
                    {(width > 40 && height > 20) && (
                        <span className="text-[10px] font-mono font-bold text-white drop-shadow-md bg-black/50 px-1 rounded">
                            {Math.round(width)} x {Math.round(height)}
                        </span>
                    )}
                </div>

                {/* Ruler Lines (Optional, extends to infinity) */}
                <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-red-400/50" style={{ left: left }} />
                <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-red-400/50" style={{ left: left + width }} />
                <div className="absolute left-0 right-0 h-px border-t border-dashed border-red-400/50" style={{ top: top }} />
                <div className="absolute left-0 right-0 h-px border-t border-dashed border-red-400/50" style={{ top: top + height }} />

                {/* Value Labels for Padding/Margin (Optional, visible if ample space) */}
                {padding.top > 4 && <span className='absolute text-[8px] text-green-700 font-bold' style={{ top: top + border.top + 2, left: left + width / 2 }}>{padding.top}</span>}
            </div>

            {/* Tooltip (Portal to Body to avoid clipping) */}
            {createPortal(
                <div
                    className="fixed z-[99999] px-2 py-1 bg-black/80 text-white text-xs rounded shadow-lg pointer-events-none flex flex-col gap-0.5"
                    style={{
                        top: (absTop - margin.top - 45 < 0) ? absTop + height + margin.bottom + 10 : absTop - margin.top - 45, // 화면 위로 넘어가면 아래로 표시
                        left: absLeft,
                        minWidth: 'max-content'
                    }}
                >
                    <div className="font-bold text-purple-300">
                        {hoveredNode.tagName.toLowerCase()}
                        {hoveredNode.id && <span className="text-yellow-300">#{hoveredNode.id}</span>}
                        {Array.from(hoveredNode.classList).length > 0 &&
                            <span className="text-blue-300">.{Array.from(hoveredNode.classList)[0]}</span>
                        }
                    </div>
                    <div className="flex gap-2 text-[10px] text-gray-300">
                        <span>{Math.round(width)} x {Math.round(height)}</span>
                        {padding.top > 0 && <span className="text-green-400">P: {padding.top}</span>}
                        {margin.top > 0 && <span className="text-orange-400">M: {margin.top}</span>}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default MeasureOverlay;
