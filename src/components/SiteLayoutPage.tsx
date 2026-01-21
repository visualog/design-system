import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const SiteLayoutPage = () => {
    // Current logical width in pixels (e.g., 240)
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const layouts = [
        { id: 'compact', value: 200, label: 'Compact', desc: '아이콘 중심의 미니멀한 구성' },
        { id: 'standard', value: 240, label: 'Standard', desc: '표준 문서 구조에 최적화된 너비' },
        { id: 'expanded', value: 280, label: 'Expanded', desc: '길 레이블과 깊은 계층 구조용' },
        { id: 'wide', value: 320, label: 'Wide', desc: '대형 모니터 및 정보 집약적 구성' }
    ];

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

    const handleLayoutSelect = (value: number) => {
        setSidebarWidth(value);
        const root = document.documentElement;
        root.style.setProperty('--sidebar-width', `${value}px`);
    };

    return (
        <div className="flex flex-col gap-16 pb-24 font-pretendard">
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
                        <p className="text-body-sm text-muted-foreground">디자인 시스템에서 권장하는 내비게이션 너비를 선택합니다.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {layouts.map((layout) => {
                            const isActive = sidebarWidth === layout.value;
                            return (
                                <button
                                    key={layout.id}
                                    onClick={() => handleLayoutSelect(layout.value)}
                                    className={cn(
                                        "group relative flex flex-col items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 outline-none",
                                        isActive
                                            ? "border-primary bg-primary/[0.03] shadow-lg shadow-primary/5 ring-1 ring-primary"
                                            : "bg-background border-border hover:border-primary/40 hover:bg-muted/30"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col gap-1">
                                            <span className={cn(
                                                "text-label-sm uppercase tracking-wider font-bold",
                                                isActive ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                {layout.label}
                                            </span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-heading-md font-bold text-foreground">{layout.value}</span>
                                                <span className="text-xs font-medium text-muted-foreground">px</span>
                                            </div>
                                        </div>

                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                            isActive ? "border-primary bg-primary shadow-sm" : "border-muted-foreground/30"
                                        )}>
                                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 w-full">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {layout.desc}
                                        </p>

                                        {/* Simplified visual representation */}
                                        <div className="w-full h-12 bg-muted/40 rounded-lg border border-border/50 overflow-hidden relative p-1.5 flex gap-1.5">
                                            <div
                                                className={cn(
                                                    "h-full rounded-md shadow-sm transition-all duration-500",
                                                    isActive ? "bg-primary/20 border border-primary/20" : "bg-muted-foreground/10 border border-border/50"
                                                )}
                                                style={{ width: `${(layout.value / 320) * 30}%` }}
                                            />
                                            <div className="flex-1 h-full rounded-md bg-background/50 border border-border/50" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-start gap-2 p-4 bg-muted/30 rounded-xl border border-border/50">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60 mt-0.5">
                            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                        </svg>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            선택하신 너비는 실시간으로 사이드바에 적용됩니다. <span className="font-semibold text-foreground">Standard (240px)</span>는 일반적인 프로젝트에서 가장 추천하는 너비 규격입니다.
                        </p>
                    </div>
                </section>

                <Separator />

                {/* Future placeholders */}
                <section className="opacity-50 pointer-events-none flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-md tracking-tight">Content Width</h2>
                        <p className="text-body-sm text-muted-foreground">메인 콘텐츠 영역의 최대 너비를 제한합니다.</p>
                    </div>
                    <div className="p-8 border border-dashed rounded-2xl flex items-center justify-center bg-muted/20">
                        <span className="text-sm font-medium text-muted-foreground italic">Coming Soon</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SiteLayoutPage;
