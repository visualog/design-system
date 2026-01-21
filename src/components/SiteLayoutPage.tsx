import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

const SiteLayoutPage = () => {
    // Current logical width in pixels (e.g., 240)
    const [sidebarWidth, setSidebarWidth] = useState(240);

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const currentWidth = computedStyle.getPropertyValue('--sidebar-width').trim();

        // Convert "240px" -> 240
        const numericWidth = parseInt(currentWidth, 10);
        if (!isNaN(numericWidth)) {
            setSidebarWidth(numericWidth);
        }
    }, []);

    const updateSidebarWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value, 10);
        setSidebarWidth(newWidth);

        const root = document.documentElement;
        root.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

    const breakpoints = [
        { value: 200, label: 'Compact' },
        { value: 240, label: 'Standard' },
        { value: 280, label: 'Expanded' },
        { value: 320, label: 'Wide' }
    ];

    const handleBreakpointClick = (value: number) => {
        setSidebarWidth(value);
        const root = document.documentElement;
        root.style.setProperty('--sidebar-width', `${value}px`);
    };

    return (
        <div className="flex flex-col gap-16 pb-24">
            <div>
                <div className="flex flex-col gap-3">
                    <h1 className="flex items-center gap-3 text-heading-xl tracking-tight">
                        Layout
                    </h1>
                    <p className="text-body-sm text-muted-foreground">
                        문서 사이트의 전역 레이아웃 설정을 구성합니다.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 max-w-2xl">
                {/* Sidebar Width Section */}
                <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-md tracking-tight">Sidebar Width</h2>
                        <p className="text-body-sm text-muted-foreground">내비게이션 사이드바의 너비를 설정합니다.</p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="relative px-2">
                            {/* Breakpoint Dots & Labels (Above Slider) */}
                            <div className="absolute -top-8 left-0 w-full h-8 pointer-events-none">
                                {breakpoints.map((bp) => {
                                    const percent = ((bp.value - 200) / (320 - 200)) * 100;
                                    const isActive = sidebarWidth === bp.value;
                                    return (
                                        <div
                                            key={bp.value}
                                            className="absolute flex flex-col items-center -translate-x-1/2"
                                            style={{ left: `${percent}%` }}
                                        >
                                            <span className={`text-[10px] mb-1.5 font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/40'}`}>
                                                {bp.label}
                                            </span>
                                            <button
                                                onClick={() => handleBreakpointClick(bp.value)}
                                                className={`w-2.5 h-2.5 rounded-full border-2 bg-background pointer-events-auto transition-all hover:scale-125 z-10 ${isActive ? 'border-primary ring-4 ring-primary/10 scale-110' : 'border-muted-foreground/30 hover:border-primary/50'}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Slider Track */}
                            <div className="relative h-6 flex items-center">
                                <input
                                    type="range"
                                    min="200"
                                    max="320"
                                    step="1"
                                    value={sidebarWidth}
                                    onChange={updateSidebarWidth}
                                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Value Indicator (Below Slider) */}
                            <div className="absolute -bottom-8 left-0 w-full h-8 pointer-events-none">
                                {(() => {
                                    const percent = ((sidebarWidth - 200) / (320 - 200)) * 100;
                                    return (
                                        <div
                                            className="absolute flex flex-col items-center -translate-x-1/2"
                                            style={{ left: `${percent}%` }}
                                        >
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary text-primary-foreground rounded-md shadow-lg scale-90">
                                                <span className="font-mono text-[10px] font-bold">
                                                    {sidebarWidth}px
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        <div className="mt-4 flex items-start gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50 mt-0.5">
                                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                            </svg>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                슬라이딩 트랙 위의 추천 규격(<span className="font-semibold">Dots</span>)을 클릭하거나 드래그하여 최적의 너비를 찾으세요.
                            </p>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Future placeholders */}
                <section className="opacity-50 pointer-events-none">
                    <h2 className="mb-2 text-xl font-semibold tracking-tight">Content Width (Coming Soon)</h2>
                    <p className="text-muted-foreground mb-4">Limit the maximum width of the main content area.</p>
                    <div className="h-2 bg-muted rounded w-full"></div>
                </section>
            </div>
        </div>
    );
};

export default SiteLayoutPage;
