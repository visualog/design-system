import React, { useEffect, useState } from 'react';
import { ArrowLeft, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
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

    return (
        <div className="flex flex-col gap-8 pb-20">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        to="/site-settings"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings (설정으로 돌아가기)
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Layout className="w-8 h-8" />
                    레이아웃 설정 (Layout Config)
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                    사이트의 레이아웃 구조와 치수를 조정합니다.
                </p>
            </div>

            <Separator />

            <div className="grid gap-8 max-w-2xl">
                {/* Sidebar Width Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">사이드바 너비 (Sidebar Width)</h2>
                            <p className="text-muted-foreground">내비게이션 사이드바의 너비를 설정합니다.</p>
                        </div>
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {sidebarWidth}px
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-muted-foreground w-12">200px</span>
                            <input
                                type="range"
                                min="200"
                                max="320"
                                step="4"
                                value={sidebarWidth}
                                onChange={updateSidebarWidth}
                                className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <span className="text-sm font-medium text-muted-foreground w-12 text-right">320px</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            기본 너비는 240px입니다. 슬라이더를 드래그하여 실시간으로 크기를 조정하세요.
                        </p>
                    </div>
                </section>

                <Separator />

                {/* Future placeholders */}
                <section className="opacity-50 pointer-events-none">
                    <h2 className="text-xl font-semibold mb-2">콘텐츠 너비 (Content Width) - 준비 중</h2>
                    <p className="text-muted-foreground mb-4">메인 콘텐츠 영역의 최대 너비를 제한합니다.</p>
                    <div className="h-2 bg-muted rounded w-full"></div>
                </section>
            </div>
        </div>
    );
};

export default SiteLayoutPage;
