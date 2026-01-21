import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const SiteLayoutPage = () => {
    // Current logical width in pixels (e.g., 240)
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const layouts = [
        { id: 'compact', value: 200, label: 'Compact' },
        { id: 'standard', value: 240, label: 'Standard' },
        { id: 'expanded', value: 280, label: 'Expanded' },
        { id: 'wide', value: 320, label: 'Wide' }
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
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-md tracking-tight">Sidebar Width</h2>
                        <p className="text-body-sm text-muted-foreground">디자인 시스템 권장 너비를 선택합니다.</p>
                    </div>

                    <div className="p-1 bg-muted/30 rounded-xl border border-border/50 flex gap-1">
                        {layouts.map((layout) => {
                            const isActive = sidebarWidth === layout.value;
                            return (
                                <button
                                    key={layout.id}
                                    onClick={() => handleLayoutSelect(layout.value)}
                                    className={cn(
                                        "flex-1 flex flex-col items-center justify-center py-2.5 px-3 rounded-lg transition-all duration-200 outline-none",
                                        isActive
                                            ? "bg-background text-primary shadow-sm ring-1 ring-border"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <span className={cn(
                                        "text-[11px] font-bold uppercase tracking-wider mb-0.5",
                                        isActive ? "text-primary" : "text-muted-foreground/60"
                                    )}>
                                        {layout.label}
                                    </span>
                                    <span className="text-sm font-bold font-mono">
                                        {layout.value}px
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-[11px] text-muted-foreground text-center">
                        기본 권장값은 <span className="font-semibold text-foreground">Standard (240px)</span>입니다.
                    </p>
                </section>

                <Separator />

                {/* Future placeholders */}
                <section className="opacity-50 pointer-events-none flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading-md tracking-tight">Content Width</h2>
                        <p className="text-body-sm text-muted-foreground">메인 콘텐츠 영역의 최대 너비를 제한합니다.</p>
                    </div>
                    <div className="h-10 border border-dashed rounded-xl flex items-center justify-center bg-muted/10">
                        <span className="text-xs font-medium text-muted-foreground italic">Coming Soon</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SiteLayoutPage;
