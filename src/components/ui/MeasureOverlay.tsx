import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// 측정 오버레이 컴포넌트
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
        borderRadius: string;
        gap: string;
    } | null>(null);

    // Static Spec State
    const [staticSpecs, setStaticSpecs] = useState<{
        width: number;
        height: number;
        top: number; // relative to targetRef
        left: number;
        padding: { top: number; right: number; bottom: number; left: number };
        gap: number;
        borderRadius: string; // Container Radius
        childrenRects: (DOMRect & { relTop: number, relLeft: number, borderRadius: string })[];
    } | null>(null);

    // 1. Calculate Static Specs (Deep Scan)
    useEffect(() => {
        const rootContainer = targetRef.current;
        if (!rootContainer) return;

        const updateStaticSpecs = () => {
            // Drill Down Heuristic: Find the "Visual" Container
            let focusEl = rootContainer;

            // Limit depth to avoid infinite loops or going too deep
            for (let i = 0; i < 3; i++) {
                const style = window.getComputedStyle(focusEl);
                const children = Array.from(focusEl.children).filter(c =>
                    c.tagName !== 'SCRIPT' &&
                    c.tagName !== 'STYLE' &&
                    !c.getAttribute('data-measure-ignore')
                );

                // Stop if multiple children (e.g. Tabs List has 2 buttons)
                if (children.length !== 1) break;

                // Stop if current element has visible background or border (it's a container)
                // Exception: if it's the root and just a layout wrapper (check transparency)
                const isTransparent = style.backgroundColor === 'rgba(0, 0, 0, 0)' || style.backgroundColor === 'transparent';
                const hasBorder = style.borderWidth !== '0px' && style.borderStyle !== 'none';

                if (!isTransparent || hasBorder) {
                    // It has visuals, but if it only has 1 child which is ALSO visual, maybe text?
                    // Let's assume if it has ID or Class implying wrapper, we skip?
                    // For now, simple transparent check is good.
                    break;
                }

                // Drill down
                focusEl = children[0] as HTMLElement;
            }

            const style = window.getComputedStyle(focusEl);
            const rect = focusEl.getBoundingClientRect();
            const rootRect = rootContainer.getBoundingClientRect(); // Absolute ref

            // Get children of the FOCUSED element
            const children = Array.from(focusEl.children).filter(c =>
                c.tagName !== 'SCRIPT' &&
                c.tagName !== 'STYLE' &&
                !c.getAttribute('data-measure-ignore')
            );

            const childrenRects = children.map(c => {
                const cRect = c.getBoundingClientRect();
                const cStyle = window.getComputedStyle(c);
                const br = cStyle.borderRadius === '0px' ? '' : cStyle.borderRadius;
                return {
                    x: cRect.x,
                    y: cRect.y,
                    width: cRect.width,
                    height: cRect.height,
                    top: cRect.top,
                    right: cRect.right,
                    bottom: cRect.bottom,
                    left: cRect.left,
                    relTop: cRect.top - rect.top, // Relative to FOCUSED container
                    relLeft: cRect.left - rect.left,
                    borderRadius: br,
                    toJSON: cRect.toJSON
                } as DOMRect & { relTop: number, relLeft: number, borderRadius: string };
            });

            // Parse Gap
            const rowGap = parseFloat(style.rowGap) || 0;
            const colGap = parseFloat(style.columnGap) || 0;
            const gap = Math.max(rowGap, colGap);

            // Parse Radius
            const br = style.borderRadius === '0px' ? '' : style.borderRadius;

            setStaticSpecs({
                width: rect.width,
                height: rect.height,
                top: rect.top - rootRect.top, // Offset from root
                left: rect.left - rootRect.left,
                padding: {
                    top: parseFloat(style.paddingTop),
                    right: parseFloat(style.paddingRight),
                    bottom: parseFloat(style.paddingBottom),
                    left: parseFloat(style.paddingLeft),
                },
                gap,
                borderRadius: br,
                childrenRects
            });
        };

        updateStaticSpecs();
        const observer = new ResizeObserver(updateStaticSpecs);
        observer.observe(rootContainer);
        return () => observer.disconnect();
    }, [targetRef]);

    // 2. Interactive Inspector Logic
    useEffect(() => {
        const container = targetRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!container.contains(target)) {
                setHoveredNode(null);
                return;
            }

            if (target === container) {
                setHoveredNode(null);
                setBoxModel(null);
                return;
            }

            setHoveredNode(target);

            const computedStyle = window.getComputedStyle(target);
            const rect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Extract Border Radius
            const br = computedStyle.borderRadius;
            const borderRadius = br === '0px' ? '' : br;

            // Extract Gap
            const rowGap = computedStyle.rowGap;
            const colGap = computedStyle.columnGap;
            let gap = '';
            if (rowGap !== 'normal' && rowGap !== '0px') gap = rowGap;
            if (colGap !== 'normal' && colGap !== '0px') {
                gap = gap ? `${gap} ${colGap}` : colGap;
            }

            setBoxModel({
                width: rect.width,
                height: rect.height,
                top: rect.top - containerRect.top,
                left: rect.left - containerRect.left,
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
                borderRadius,
                gap,
            });
        };

        const handleMouseLeave = () => {
            setHoveredNode(null);
            setBoxModel(null);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [targetRef]);

    // Render Function
    if (!targetRef.current && !staticSpecs) return null;

    const P_COLOR = "#ec4899"; // Pink-500

    return (
        <>
            {/* Static Specs Overlay */}
            {staticSpecs && (
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40 }} data-measure-ignore="true">
                    {/* Translate the SVG to match the focused element's position relative to root */}
                    <svg
                        className="overflow-visible"
                        style={{
                            position: 'absolute',
                            top: staticSpecs.top,
                            left: staticSpecs.left,
                            width: staticSpecs.width,
                            height: staticSpecs.height
                        }}
                    >
                        {/* External Dimensions (Focused Container) */}
                        {/* Width */}
                        <path d={`M0,-16 L${staticSpecs.width},-16`} stroke={P_COLOR} strokeWidth="1" />
                        <path d={`M0,-20 L0,-12`} stroke={P_COLOR} strokeWidth="1" />
                        <path d={`M${staticSpecs.width},-20 L${staticSpecs.width},-12`} stroke={P_COLOR} strokeWidth="1" />
                        <text x={staticSpecs.width / 2} y="-20" fill={P_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">{Math.round(staticSpecs.width)}</text>

                        {/* Height */}
                        <path d={`M${staticSpecs.width + 16},0 L${staticSpecs.width + 16},${staticSpecs.height}`} stroke={P_COLOR} strokeWidth="1" />
                        <path d={`M${staticSpecs.width + 12},0 L${staticSpecs.width + 20},0`} stroke={P_COLOR} strokeWidth="1" />
                        <path d={`M${staticSpecs.width + 12},${staticSpecs.height} L${staticSpecs.width + 20},${staticSpecs.height}`} stroke={P_COLOR} strokeWidth="1" />
                        <text x={staticSpecs.width + 24} y={staticSpecs.height / 2} fill={P_COLOR} fontSize="10" fontWeight="bold" dominantBaseline="middle">{Math.round(staticSpecs.height)}</text>

                        {/* Container Radius Label (Top Left) */}
                        {staticSpecs.borderRadius && (
                            <>
                                <text x="-4" y="-4" fill={P_COLOR} fontSize="9" fontWeight="bold" textAnchor="end">R{staticSpecs.borderRadius}</text>
                                {/* Arc Indicator (Top Left) */}
                                <path
                                    d={`M0,${parseInt(staticSpecs.borderRadius)} A${parseInt(staticSpecs.borderRadius)},${parseInt(staticSpecs.borderRadius)} 0 0 1 ${parseInt(staticSpecs.borderRadius)},0`}
                                    fill="none"
                                    stroke={P_COLOR}
                                    strokeWidth="2"
                                />
                            </>
                        )}

                        {/* Padding Areas (Green Shading) */}
                        {staticSpecs.padding.top > 0 && (
                            <>
                                <rect x="0" y="0" width={staticSpecs.width} height={staticSpecs.padding.top} fill="#4ade80" fillOpacity="0.15" />
                                <text x={staticSpecs.width / 2} y={staticSpecs.padding.top / 2 + 3} fill="#15803d" fontSize="9" fontWeight="bold" textAnchor="middle">{staticSpecs.padding.top}</text>
                            </>
                        )}
                        {staticSpecs.padding.bottom > 0 && (
                            <>
                                <rect x="0" y={staticSpecs.height - staticSpecs.padding.bottom} width={staticSpecs.width} height={staticSpecs.padding.bottom} fill="#4ade80" fillOpacity="0.15" />
                                <text x={staticSpecs.width / 2} y={staticSpecs.height - staticSpecs.padding.bottom / 2 + 3} fill="#15803d" fontSize="9" fontWeight="bold" textAnchor="middle">{staticSpecs.padding.bottom}</text>
                            </>
                        )}
                        {staticSpecs.padding.left > 0 && (
                            <>
                                <rect x="0" y={staticSpecs.padding.top} width={staticSpecs.padding.left} height={staticSpecs.height - staticSpecs.padding.top - staticSpecs.padding.bottom} fill="#4ade80" fillOpacity="0.15" />
                                <text x={staticSpecs.padding.left / 2} y={staticSpecs.height / 2} fill="#15803d" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{staticSpecs.padding.left}</text>
                            </>
                        )}
                        {staticSpecs.padding.right > 0 && (
                            <>
                                <rect x={staticSpecs.width - staticSpecs.padding.right} y={staticSpecs.padding.top} width={staticSpecs.padding.right} height={staticSpecs.height - staticSpecs.padding.top - staticSpecs.padding.bottom} fill="#4ade80" fillOpacity="0.15" />
                                <text x={staticSpecs.width - staticSpecs.padding.right / 2} y={staticSpecs.height / 2} fill="#15803d" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{staticSpecs.padding.right}</text>
                            </>
                        )}

                        {/* Content Box Boundary (Dashed Purple) */}
                        <rect
                            x={staticSpecs.padding.left}
                            y={staticSpecs.padding.top}
                            width={staticSpecs.width - staticSpecs.padding.left - staticSpecs.padding.right}
                            height={staticSpecs.height - staticSpecs.padding.top - staticSpecs.padding.bottom}
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            opacity="0.4"
                        />

                        {/* Gap Indicators (Pink Shading) */}
                        {staticSpecs.gap > 0 && staticSpecs.childrenRects.length > 1 && (
                            staticSpecs.childrenRects.map((child, i) => {
                                if (i === staticSpecs.childrenRects.length - 1) return null;
                                const nextChild = staticSpecs.childrenRects[i + 1];
                                const isHorizontal = Math.abs(child.relTop - nextChild.relTop) < 10;

                                if (isHorizontal) {
                                    const gapStart = child.relLeft + child.width;
                                    const gapEnd = nextChild.relLeft;
                                    const gapWidth = gapEnd - gapStart;
                                    const gapCenter = gapStart + gapWidth / 2;

                                    // Height of gap area: Match child height or full content height?
                                    // Usually matching child height is cleaner.
                                    const y = child.relTop;
                                    const h = child.height;

                                    if (gapWidth <= 0 || Math.abs(gapWidth - staticSpecs.gap) > 2) return null;

                                    return (
                                        <g key={`gap-${i}`}>
                                            <rect x={gapStart} y={y} width={gapWidth} height={h} fill="#ec4899" fillOpacity="0.15" />
                                            <text x={gapCenter} y={y + h / 2} fill="#be185d" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{Math.round(gapWidth)}</text>
                                        </g>
                                    )
                                }
                                return null;
                            })
                        )}

                        {/* Child Specs (Radius & Size) - User Requested */}
                        {staticSpecs.childrenRects.map((child, i) => (
                            <g key={`child-${i}`}>
                                {/* Border Radius for Child (Top Right) */}
                                {child.borderRadius && (
                                    <>
                                        <text x={child.relLeft + child.width + 2} y={child.relTop} fill={P_COLOR} fontSize="8" fontWeight="bold" alignmentBaseline="hanging">R{child.borderRadius}</text>
                                        {/* Arc Indicator (Top Right) */}
                                        <path
                                            d={`M${child.relLeft + child.width - parseInt(child.borderRadius)},${child.relTop} A${parseInt(child.borderRadius)},${parseInt(child.borderRadius)} 0 0 1 ${child.relLeft + child.width},${child.relTop + parseInt(child.borderRadius)}`}
                                            fill="none"
                                            stroke={P_COLOR}
                                            strokeWidth="2"
                                        />
                                    </>
                                )}

                                {/* Dimension Lines: Only for the first child (as requested) */}
                                {i === 0 && (
                                    <>
                                        {/* Width Line (Below) */}
                                        <path d={`M${child.relLeft},${child.relTop + child.height + 12} L${child.relLeft + child.width},${child.relTop + child.height + 12}`} stroke={P_COLOR} strokeWidth="1" />
                                        <path d={`M${child.relLeft},${child.relTop + child.height + 9} L${child.relLeft},${child.relTop + child.height + 15}`} stroke={P_COLOR} strokeWidth="1" />
                                        <path d={`M${child.relLeft + child.width},${child.relTop + child.height + 9} L${child.relLeft + child.width},${child.relTop + child.height + 15}`} stroke={P_COLOR} strokeWidth="1" />
                                        <text x={child.relLeft + child.width / 2} y={child.relTop + child.height + 22} fill={P_COLOR} fontSize="9" fontWeight="bold" textAnchor="middle">{Math.round(child.width)}</text>

                                        {/* Height Line (Left) */}
                                        <path d={`M${child.relLeft - 12},${child.relTop} L${child.relLeft - 12},${child.relTop + child.height}`} stroke={P_COLOR} strokeWidth="1" />
                                        <path d={`M${child.relLeft - 15},${child.relTop} L${child.relLeft - 9},${child.relTop}`} stroke={P_COLOR} strokeWidth="1" />
                                        <path d={`M${child.relLeft - 15},${child.relTop + child.height} L${child.relLeft - 9},${child.relTop + child.height}`} stroke={P_COLOR} strokeWidth="1" />
                                        <text x={child.relLeft - 18} y={child.relTop + child.height / 2} fill={P_COLOR} fontSize="9" fontWeight="bold" dominantBaseline="middle" textAnchor="end">{Math.round(child.height)}</text>
                                    </>
                                )}
                            </g>
                        ))}

                    </svg>
                </div>
            )}

            {/* Interactive Inspector Overlay (Visible on Hover) */}
            {/* (Unchanged from prev logic, just ensures it renders on top) */}
            {hoveredNode && boxModel && (
                <>
                    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible" data-measure-ignore="true">
                        {/* 1. Margin Area (Orange) */}
                        <div
                            className="absolute bg-orange-500/30"
                            style={{
                                top: boxModel.top - boxModel.margin.top,
                                left: boxModel.left - boxModel.margin.left,
                                width: boxModel.width + boxModel.margin.left + boxModel.margin.right,
                                height: boxModel.height + boxModel.margin.top + boxModel.margin.bottom,
                            }}
                        />
                        {/* Border (Yellow) */}
                        <div
                            className="absolute bg-yellow-500/30"
                            style={{
                                top: boxModel.top,
                                left: boxModel.left,
                                width: boxModel.width,
                                height: boxModel.height,
                            }}
                        />
                        {/* Padding (Green) */}
                        <div
                            className="absolute bg-green-500/30"
                            style={{
                                top: boxModel.top + boxModel.border.top,
                                left: boxModel.left + boxModel.border.left,
                                width: boxModel.width - boxModel.border.left - boxModel.border.right,
                                height: boxModel.height - boxModel.border.top - boxModel.border.bottom,
                            }}
                        />
                        {/* Content (Blue) */}
                        <div
                            className="absolute bg-blue-500/30 flex items-center justify-center border border-blue-400/50"
                            style={{
                                top: boxModel.top + boxModel.border.top + boxModel.padding.top,
                                left: boxModel.left + boxModel.border.left + boxModel.padding.left,
                                width: boxModel.width - boxModel.border.left - boxModel.border.right - boxModel.padding.left - boxModel.padding.right,
                                height: boxModel.height - boxModel.border.top - boxModel.border.bottom - boxModel.padding.top - boxModel.padding.bottom,
                            }}
                        />
                    </div>

                    {/* Tooltip */}
                    {createPortal(
                        <div
                            className={`fixed z-[99999] px-2.5 py-2 bg-neutral-900/95 backdrop-blur-sm text-white text-xs rounded-md shadow-xl border border-white/10 pointer-events-none flex flex-col gap-1.5 ${boxModel.absTop > 130 ? '-translate-y-full' : ''
                                }`}
                            style={{
                                top: boxModel.absTop > 130
                                    ? boxModel.absTop - boxModel.margin.top - 8
                                    : boxModel.absTop + boxModel.height + boxModel.margin.bottom + 8,
                                left: boxModel.absLeft,
                                minWidth: 'max-content'
                            }}
                        >
                            <div className="font-semibold text-violet-300 flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-0.5">
                                <span className="text-[11px] opacity-70">&lt;</span>
                                {hoveredNode.tagName.toLowerCase()}
                                <span className="text-[11px] opacity-70">/&gt;</span>
                                {hoveredNode.id && <span className="text-yellow-300 text-[11px]">#{hoveredNode.id}</span>}
                                {Array.from(hoveredNode.classList).length > 0 &&
                                    <span className="text-blue-300 text-[11px] max-w-[150px] truncate">.{Array.from(hoveredNode.classList)[0]}</span>
                                }
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-gray-300">
                                <span className="text-white font-medium">{Math.round(boxModel.width)} × {Math.round(boxModel.height)}</span>
                                {boxModel.borderRadius && <span className="text-pink-300">R: {boxModel.borderRadius}</span>}
                                {boxModel.padding.top > 0 && <span className="text-green-400">P: {boxModel.padding.top}</span>}
                                {boxModel.margin.top > 0 && <span className="text-orange-400">M: {boxModel.margin.top}</span>}
                                {boxModel.gap && <span className="text-cyan-400 col-span-2">Gap: {boxModel.gap}</span>}
                            </div>
                        </div>,
                        document.body
                    )}
                </>
            )}
        </>
    );
};

export default MeasureOverlay;
