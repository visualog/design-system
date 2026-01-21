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
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-heading-md tracking-tight">Sidebar Width</h2>
                            <p className="text-body-sm text-muted-foreground">내비게이션 사이드바의 너비를 설정합니다.</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 border border-primary/10 rounded-md">
                            <span className="font-mono text-xs font-bold text-primary">
                                {sidebarWidth}px
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="relative pt-6">
                            {/* Breakpoint Dots & Labels */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                {breakpoints.map((bp) => {
                                    const percent = ((bp.value - 200) / (320 - 200)) * 100;
                                    const isActive = sidebarWidth === bp.value;
                                    return (
                                        <div
                                            key={bp.value}
                                            className="absolute flex flex-col items-center -translate-x-1/2"
                                            style={{ left: `${percent}%` }}
                                        >
                                            <span className={`text-[10px] mb-2 font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/40'}`}>
                                                {bp.label}
                                            </span>
                                            <button
                                                onClick={() => handleBreakpointClick(bp.value)}
                                                className={`w-2 h-2 rounded-full border-2 bg-background pointer-events-auto transition-all hover:scale-150 z-10 ${isActive ? 'border-primary ring-4 ring-primary/10' : 'border-muted-foreground/30 hover:border-primary/50'}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-4 relative">
                                <span className="text-xs font-bold text-muted-foreground/50 w-8">200</span>
                                <input
                                    type="range"
                                    min="200"
                                    max="320"
                                    step="4"
                                    value={sidebarWidth}
                                    onChange={updateSidebarWidth}
                                    className="flex-1 h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-xs font-bold text-muted-foreground/50 w-8 text-right">320</span>
                            </div>
                        </div>

                        <div className="mt-1 flex items-start gap-2 p-3 bg-muted/40 rounded-lg border border-border/50">
                            <div className="mt-0.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                                </svg>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                기본 너비는 <span className="font-semibold text-foreground">240px</span>입니다. 슬라이딩 트랙 위의 추천 규격(<span className="font-semibold">Dots</span>)을 클릭하여 빠르게 값을 적용할 수 있습니다.
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
